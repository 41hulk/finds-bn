import { Injectable, LoggerService } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RfpService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async getAllRfp() {}
}
