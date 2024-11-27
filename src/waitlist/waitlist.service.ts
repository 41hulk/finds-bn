import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WaitlistDto } from './dto/waitlist.dto';

@Injectable()
export class WaitlistService {
  constructor(private prisma: PrismaService) {}

  async create(data: WaitlistDto) {
    try {
      const res = await this.prisma.waitlister.create({
        data: {
          email: data.email,
          instagram: data.instagram,
          location: data.location,
        },
      });

      return res;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllWaitlist() {
    try {
      const res = this.prisma.waitlister.findMany({
        where: { deleted_at: null },
      });

      return res;
    } catch (e) {
      throw new Error(e);
    }
  }
}
