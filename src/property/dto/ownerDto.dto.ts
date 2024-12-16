import { ApiProperty } from '@nestjs/swagger';
import { Dto } from 'src/lib/dto/Dto';

export class OwnerDto extends Dto<OwnerDto> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  username: string;
}
