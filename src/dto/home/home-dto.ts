import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class GameficationDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  docs: number;
}

export class MaxDocsDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  maxDocs: number;
}

export class InputDto {
  @ApiProperty()
  @IsString()
  email: string;
}

export class InputDocsDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}

export class MaxDocsDto {
  @ApiProperty()
  @IsNumber()
  max: number;
}
