import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTechnicalSupportRequest {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  support_mode_id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  speciality!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  office_number!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  problem_description!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contact_phone!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  anydesk_code!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  preferred_support_date!: string;
}
