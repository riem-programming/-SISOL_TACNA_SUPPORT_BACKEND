import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserPassword {
  @IsString()
  @IsNotEmpty()
  current_password!: string;

  @IsString()
  @IsNotEmpty()
  new_password!: string;
}
