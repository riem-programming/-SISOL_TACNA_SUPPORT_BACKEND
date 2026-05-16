import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTicket {
  @IsNumber()
  @IsNotEmpty()
  state_id!: number;

  @IsNumber()
  @IsNotEmpty()
  request_type_id!: number;

  @IsNumber()
  @IsNotEmpty()
  priority_id!: number;

  @IsNumber()
  @IsNotEmpty()
  user_id!: number;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
