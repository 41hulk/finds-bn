import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [UploadService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  controllers: [UploadController],
})
export class UploadModule {}
