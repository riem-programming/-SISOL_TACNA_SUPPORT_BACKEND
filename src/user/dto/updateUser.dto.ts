import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUser {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsOptional()
  @IsString()
  email!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
