import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTicket } from 'src/ticket/dto/createTicket.dto';

export class CreateTechnicalSupportRequest extends CreateTicket {
  @IsNumber()
  @IsNotEmpty()
  support_mode_id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  speciality!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  office_number!: string;

  @IsString()
  @IsNotEmpty()
  problem_description!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contact_phone!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  anydesk_code!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  preferred_support_date!: string;
}
