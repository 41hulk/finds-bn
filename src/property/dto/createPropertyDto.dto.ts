import { IsString } from 'class-validator';
import { Dto } from '../../lib/dto/Dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto extends Dto<CreatePropertyDto> {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: any[];

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  pricePerNight: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  desiredRenter: string;
}
