import { IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class UpdatePropertyDto extends Dto<UpdatePropertyDto> {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  pricePerNight: string;
}
