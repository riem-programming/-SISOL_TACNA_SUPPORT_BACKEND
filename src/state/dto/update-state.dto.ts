import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateState {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
