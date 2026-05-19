import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTicket } from 'src/ticket/dto/createTicket.dto';

export class CreateUserProblemRequest extends CreateTicket {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  problem_description!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  system_name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  affected_module!: string;
}
