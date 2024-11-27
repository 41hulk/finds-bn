import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class UpdateUsernameDto extends Dto<UpdateUsernameDto> {
  @ApiProperty()
  @IsString()
  username: string;
}
