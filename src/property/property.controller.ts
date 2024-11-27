import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/createPropertyDto.dto';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllProperties() {
    return this.propertyService.getAllProperties();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createProperty(
    @Body() data: CreatePropertyDto,
    @ReqUser() user: ReqUserType,
  ) {
    return this.propertyService.createProperty(user.id, data);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPropertyById(@Param('id') id: string) {
    return this.propertyService.getPropertyById(id);
  }
}
