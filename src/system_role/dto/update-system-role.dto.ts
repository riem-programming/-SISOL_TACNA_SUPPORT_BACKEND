import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSystemRole {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  long_name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  short_name!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
