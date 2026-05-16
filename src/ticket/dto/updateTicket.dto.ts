import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTicket {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  state_id!: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  request_type_id!: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  priority_id!: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
