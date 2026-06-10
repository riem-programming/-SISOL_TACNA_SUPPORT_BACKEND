import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTicketCommentDto {
  @IsNumber()
  ticket_id!: number;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsNumber()
  @IsOptional()
  user_id?: number;
}
