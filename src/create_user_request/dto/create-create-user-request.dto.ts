import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateTicket } from 'src/ticket/dto/createTicket.dto';

export class CreateCreateUserRequest extends CreateTicket {
  @IsString()
  @IsNotEmpty()
  first_names!: string;

  @IsString()
  @IsNotEmpty()
  last_names!: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsNumber()
  @IsNotEmpty()
  document_type_id!: number;

  @IsString()
  @IsNotEmpty()
  document_number!: string;

  @IsNumber()
  @IsNotEmpty()
  contract_type_id!: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  system_role_ids!: number[];
}
