import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCreateUserRequest {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_names!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_names!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  document_type_id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  document_number!: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  contract_type_id!: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  system_role_id!: number;
}
