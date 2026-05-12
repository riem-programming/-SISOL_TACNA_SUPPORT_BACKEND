import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDocumentType {
  @IsString()
  @IsNotEmpty()
  long_name!: string;

  @IsString()
  @IsNotEmpty()
  short_name!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  character_count!: number;

  @IsString()
  @IsNotEmpty()
  code!: string;
}
