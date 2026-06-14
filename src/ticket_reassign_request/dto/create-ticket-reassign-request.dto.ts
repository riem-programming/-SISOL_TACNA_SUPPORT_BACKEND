import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateTicket } from 'src/ticket/dto/createTicket.dto';

export class CreateTicketReassignRequest extends CreateTicket {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  ticket_numbers!: string[];

  @IsString()
  @IsNotEmpty()
  new_responsible!: string;
}
