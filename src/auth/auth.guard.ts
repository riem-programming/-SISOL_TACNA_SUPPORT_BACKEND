import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const adminKey = request.headers['x-admin-key'] as string | undefined;
    if (adminKey && process.env.ADMIN_KEY && adminKey === process.env.ADMIN_KEY) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Primero intenta el header (todos los demás endpoints)
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) return token;

    // Fallback al query param (solo para SSE que no soporta headers)
    const queryToken = request.query['token'];
    if (typeof queryToken === 'string') return queryToken;

    return undefined;
  }
}
