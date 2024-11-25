import { IsArray, IsNumber, IsString } from 'class-validator';
import { Dto } from '../../lib/dto/Dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto extends Dto<CreatePropertyDto> {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  pricePerNight: number;

  @ApiProperty()
  @IsString()
  address: string;
}
