import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class WaitListDto extends Dto<WaitListDto> {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsString()
  location: string;
}
