import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAdminTicketCommentDto {
  @IsNumber()
  ticket_id!: number;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
