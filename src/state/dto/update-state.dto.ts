import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateState {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;

  @IsOptional()
  @IsBoolean()
  is_terminal!: boolean;

  @IsOptional()
  @IsNumber()
  flow_order!: number | null;
}
