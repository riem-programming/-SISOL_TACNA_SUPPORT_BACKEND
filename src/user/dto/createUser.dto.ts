import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsString()
  email!: string;
}
