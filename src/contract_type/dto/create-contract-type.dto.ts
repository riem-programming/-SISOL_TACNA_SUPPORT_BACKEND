import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContractType {
  @IsString()
  @IsNotEmpty()
  long_name!: string;

  @IsString()
  @IsNotEmpty()
  short_name!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
