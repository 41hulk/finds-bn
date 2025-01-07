import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class ProfileDto extends Dto<ProfileDto> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  profileUrl: string;

  @ApiProperty()
  @IsString()
  nationality: string;

  @ApiProperty()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsString()
  twitter: string;

  @ApiProperty()
  @IsString()
  linkedin: string;

  @ApiProperty()
  properties: string;

  @ApiProperty()
  bookings: string;

  @ApiProperty()
  favorite: string;
}
