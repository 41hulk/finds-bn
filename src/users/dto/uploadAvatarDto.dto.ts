import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AvatarDto extends Dto<AvatarDto> {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsNotEmpty()
  avatar: Express.Multer.File;
}
