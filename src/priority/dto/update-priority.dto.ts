import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePriority {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  short_name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  long_name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  emoji!: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  value!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
