import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/auth/public.decorator';
import * as crypto from 'crypto';

@Controller('admin')
export class AdminController {
  @Throttle({ default: { ttl: 300000, limit: 10 } })
  @Public()
  @Post('verify')
  verifyKey(@Body() body: { key: string }): { valid: boolean } {
    const adminKey = process.env.ADMIN_KEY;
    if (!adminKey) return { valid: false };

    const actual = Buffer.from(adminKey);
    const provided = Buffer.from(body.key ?? '');

    if (provided.byteLength !== actual.byteLength) {
      crypto.timingSafeEqual(actual, actual);
      return { valid: false };
    }

    return { valid: crypto.timingSafeEqual(provided, actual) };
  }
}
