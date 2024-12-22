import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/createPropertyDto.dto';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiConsumes('multipart/form-data')
  async createProperty(
    @Body() data: CreatePropertyDto,
    @UploadedFiles() files: Express.Multer.File[],
    @ReqUser() user: ReqUserType,
  ) {
    return this.propertyService.createProperty(user.id, data, files);
  }

  @Get('myproperty')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getMyProperty(@ReqUser() user: ReqUserType) {
    return this.propertyService.getMyProperty(user.id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPropertyById(@Param('id') id: string) {
    return this.propertyService.getPropertyById(id);
  }
}
