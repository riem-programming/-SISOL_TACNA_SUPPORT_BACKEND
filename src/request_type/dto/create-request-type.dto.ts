import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRequestType {
  @IsString()
  @IsNotEmpty()
  short_name!: string;

  @IsString()
  @IsNotEmpty()
  long_name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
