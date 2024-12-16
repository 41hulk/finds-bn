import { ApiProperty } from '@nestjs/swagger';
import { Dto } from 'src/lib/dto/Dto';

export class OwnerDto extends Dto<OwnerDto> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  profileUrl: string;

  @ApiProperty()
  username: string;
}
