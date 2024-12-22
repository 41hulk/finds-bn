import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/lib/logging/logging.service';
import { PrismaService } from 'src/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
    private uploadService: UploadService,
  ) {}

  async getAllUser() {
    try {
      const res = this.prisma.user.findMany({
        where: { deleted_at: null },
      });
      this.logger.log('ALL USER Fetch', res);

      return res;
    } catch (e) {
      this.logger.error('FAIL GET ALL USER', e);
    }
  }

  async getUserById(userId: string) {
    try {
      if (!userId) {
        throw new Error('Missing user id');
      }
      const res = await this.prisma.user.findUnique({
        where: {
          id: userId,
          deleted_at: null,
        },
      });

      this.logger.log('GET USER', res);
    } catch (error) {
      this.logger.error('FAIL TO GET USER', error.message);
      return error.message;
    }
  }

  async updateUsername(username: string, userId: string) {
    try {
      if (!userId) {
        throw new Error('Missing user id');
      }
      const res = await this.prisma.user.update({
        where: { id: userId },
        data: { username: username },
      });

      this.logger.log('UPDATE USER', res);
    } catch (error) {
      this.logger.error('FAIL TO UPDATE USER', error.message);
      return error.message;
    }
  }

  async updateAvatar(avatar: Express.Multer.File, userId: string) {
    try {
      if (!userId) {
        throw new Error('Missing user id');
      }
      const image = await this.uploadService.upload([avatar], userId);
      const urls = image[0];
      const res = await this.prisma.user.update({
        where: { id: userId },
        data: { avatar: urls },
      });

      this.logger.log('UPDATED AVATAR', res);
      return res;
    } catch (error) {
      this.logger.error('FAIL TO UPDATE USER AVATAR', error.message);
      return error.message;
    }
  }
}
