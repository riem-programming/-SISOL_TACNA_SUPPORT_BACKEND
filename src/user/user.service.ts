import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUser } from './dto/updateUser.dto';
import { CreateUser } from './dto/createUser.dto';
import { UpdateUserPassword } from './dto/updateUserPassword.dto';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private defaultPassword: string;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    protected configService: ConfigService,
  ) {
    this.defaultPassword = configService.getOrThrow('USER_DEFAULT_PASSWORD');
  }

  getAllUser() {
    return this.userRepository.find();
  }

  getUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(body: CreateUser) {
    const existingUser = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (existingUser) {
      throw new NotFoundException('El nombre de usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = this.userRepository.create({
      ...body,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(body: UpdateUser) {
    const currentUser = await this.getUserById(body.id);
    if (!currentUser) return null;

    if (body.username && currentUser.username !== body.username) {
      const existingUser = await this.userRepository.findOneBy({
        username: body.username,
      });
      if (existingUser) {
        throw new NotFoundException('El nombre de usuario ya existe');
      }
    }

    Object.assign(currentUser, body);
    return await this.userRepository.save(currentUser);
  }

  async deleteUser(id: number) {
    const currentUser = await this.getUserById(id);
    if (!currentUser) return null;

    await this.userRepository.delete({ id: currentUser.id });
    return currentUser;
  }

  async updateUserPassword(id: number, body: UpdateUserPassword) {
    const currentUser = await this.getUserById(id);
    if (!currentUser) return null;

    const isValidPassword = await bcrypt.compare(
      body.current_password,
      currentUser.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }

    const hashedNewPassword = await bcrypt.hash(body.new_password, 10);
    currentUser.password = hashedNewPassword;
    currentUser.must_change_password = false;
    return await this.userRepository.save(currentUser);
  }

  async login(body: LoginUser) {
    const user = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async resetPassword(id: number) {
    const currentUser = await this.getUserById(id);
    if (!currentUser) return null;
    currentUser.password = await bcrypt.hash(this.defaultPassword, 10);
    currentUser.must_change_password = true;
    return await this.userRepository.save(currentUser);
  }
}
