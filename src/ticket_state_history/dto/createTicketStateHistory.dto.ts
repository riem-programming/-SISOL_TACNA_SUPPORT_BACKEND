import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketStateHistory {
  @IsNumber()
  @IsNotEmpty()
  state_id!: number;

  @IsNumber()
  @IsNotEmpty()
  ticket_id!: number;
}
