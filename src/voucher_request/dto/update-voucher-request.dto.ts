import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateVoucherRequest {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  voucher_code!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  speciality!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  motive!: string;
}
