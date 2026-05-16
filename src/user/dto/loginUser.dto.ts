import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUser {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
