import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggingService } from 'src/lib/logging/logging.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  providers: [PropertyService, PrismaService, LoggingService, UploadService],
  controllers: [PropertyController],
})
export class PropertyModule {}
