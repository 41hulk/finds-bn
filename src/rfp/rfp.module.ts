import { Module } from '@nestjs/common';
import { RfpService } from './rfp.service';
import { RfpController } from './rfp.controller';

@Module({
  providers: [RfpService],
  controllers: [RfpController]
})
export class RfpModule {}
