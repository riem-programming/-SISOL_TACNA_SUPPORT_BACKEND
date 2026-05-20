import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateContractType {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code!: string;

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
