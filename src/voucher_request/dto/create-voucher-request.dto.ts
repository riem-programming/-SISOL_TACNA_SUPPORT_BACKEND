import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTicket } from 'src/ticket/dto/createTicket.dto';

export class CreateVoucherRequest extends CreateTicket {
  @IsNumber()
  @IsNotEmpty()
  voucher_action_type_id!: number;

  @IsString()
  @IsNotEmpty()
  voucher_code!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  speciality!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  motive!: string;
}
