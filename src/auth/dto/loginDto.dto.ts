import { IsString } from 'class-validator';
import { Dto } from '../../lib/dto/Dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends Dto<LoginDto> {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
