import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupportMode {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
