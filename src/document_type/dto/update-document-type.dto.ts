import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateDocumentType {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsOptional()
  @IsString()
  long_name!: string;

  @IsOptional()
  @IsString()
  short_name!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  character_count!: number;

  @IsOptional()
  @IsString()
  code!: string;

  @IsOptional()
  @IsBoolean()
  is_active!: boolean;
}
