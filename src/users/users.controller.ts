import {
  Controller,
  Get,
  Param,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AvatarDto } from './dto/uploadAvatarDto.dto';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getUsers() {
    return await this.usersService.getAllUser();
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put('username/:username')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUsername(
    @Param('username') username: string,
    @ReqUser() user: ReqUserType,
  ) {
    return await this.usersService.updateUsername(username, user.id);
  }

  @Put('avatar')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload profile',
    type: AvatarDto,
  })
  async updateAvatar(
    @UploadedFiles() avatar: Express.Multer.File[],
    @ReqUser() user: ReqUserType,
  ) {
    if (!avatar || avatar.length === 0) {
      throw new Error('No file uploaded');
    }
    return await this.usersService.updateAvatar(avatar[0], user.id);
  }
}
