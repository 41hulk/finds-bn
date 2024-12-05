import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class WaitlistDto extends Dto<WaitlistDto> {
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
