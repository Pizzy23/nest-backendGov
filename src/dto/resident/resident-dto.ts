import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

@Injectable()
export class FamilyDTO {
  @ApiProperty()
  @IsString()
  headOfTheFamily: string;

  @ApiProperty()
  @IsString()
  unicCad: string;

  @ApiProperty()
  @IsNumber()
  latitude: number;
  
  @ApiProperty()
  @IsNumber()
  longitude: number;
}
