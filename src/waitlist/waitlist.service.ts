import { Injectable, LoggerService } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WaitListDto } from './dto/waitlistSignup.dto';

@Injectable()
export class WaitlistService {
  constructor(
    private readonly prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async getAllWaitlist() {
    try {
      const res = this.prisma.waitlister.findMany({
        where: { deleted_at: null },
      });
      this.logger.log('ALL WAITLIST Fetch', res);
      return res;
    } catch (e) {
      this.logger.error('FAIL GET ALL WAITLIST', e);
      return e;
    }
  }

  async createWaitlist(data: WaitListDto) {
    try {
      const { email, instagram, location } = data;
      const res = await this.prisma.waitlister.create({
        data: {
          email,
          instagram,
          location,
        },
      });
      this.logger.log(`WAITLIS CREATED: ${res}`);
      return new WaitListDto({ ...res });
    } catch (error) {
      this.logger.error('FAIL CREATE WAITLIST', error.message);
      return error;
    }
  }
}
