import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTicket {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  state_id!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  request_type_id!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  priority_id!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
