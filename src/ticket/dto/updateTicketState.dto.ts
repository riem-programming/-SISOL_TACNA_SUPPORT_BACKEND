import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTicketState {
  @IsNumber()
  @IsNotEmpty()
  state_id!: number;
}
