import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggingService } from 'src/lib/logging/logging.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  providers: [UsersService, PrismaService, LoggingService, UploadService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
