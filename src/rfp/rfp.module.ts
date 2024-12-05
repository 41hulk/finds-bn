import { Module } from '@nestjs/common';
import { RfpService } from './rfp.service';
import { RfpController } from './rfp.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RfpService, PrismaService],
  controllers: [RfpController],
})
export class RfpModule {}
