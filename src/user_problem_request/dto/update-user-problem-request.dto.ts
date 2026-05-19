import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserProblemRequest {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsOptional()
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
