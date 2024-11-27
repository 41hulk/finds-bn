import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';

@Controller('users')
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
}
