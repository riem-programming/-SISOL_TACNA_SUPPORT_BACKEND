import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateState {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;

  @IsBoolean()
  is_terminal!: boolean;

  @IsOptional()
  @IsNumber()
  flow_order!: number | null;
}
