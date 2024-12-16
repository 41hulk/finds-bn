import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { LoggingService } from 'src/lib/logging/logging.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePropertyDto } from './dto/createPropertyDto.dto';
import { UpdatePropertyDto } from './dto/updatePropertyDto.dto';
import { UploadService } from 'src/upload/upload.service';
import { PropertyDto } from './dto/propertyDto.dto';
import { OwnerDto } from './dto/ownerDto.dto';

@Injectable()
export class PropertyService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
    private uploadService: UploadService,
  ) {}

  async createProperty(
    userId: string,
    data: CreatePropertyDto,
    files: Express.Multer.File[],
  ) {
    const { name, description, pricePerNight, address, desiredRenter } = data;
    try {
      if (!userId) {
        throw new PreconditionFailedException('Missing user id');
      }

      const imageUrls = await this.uploadService.upload(files, userId);

      const res = await this.prisma.property.create({
        data: {
          images: imageUrls,
          name,
          description,
          pricePerNight,
          address,
          desiredRenter,
          user: { connect: { id: userId } },
        },
      });

      this.logger.log(`Property created: ${res}`);

      return res;
    } catch (e) {
      this.logger.error(`Error creating property`, e);
      throw new Error(e);
    }
  }

  async updateProperty(
    userId: string,
    propertyId: string,
    data: UpdatePropertyDto,
  ) {
    try {
      if (!userId) {
        throw new PreconditionFailedException('Missing user id');
      }
      const res = await this.prisma.property.update({
        where: { id: propertyId },
        data,
      });

      this.logger.log(`Property updated: ${res.id}`);

      return res;
    } catch (e) {
      this.logger.error(`Error updating property`, e);
      throw new Error(e);
    }
  }

  async getAllProperties() {
    try {
      const res = await this.prisma.property.findMany({
        where: { deleted_at: null },
        include: { user: true },
        orderBy: { created_at: 'desc' },
      });
      this.logger.log(`All properties fetched`);
      return res.map((property) => {
        return new PropertyDto({
          id: property.id,
          images: property.images,
          name: property.name,
          description: property.description,
          pricePerNight: property.pricePerNight,
          address: property.address,
          user: new OwnerDto({
            id: property.user.id,
            avatar: property.user.avatar,
            username: property.user.username,
          }),
        });
      });
    } catch (e) {
      this.logger.error(`Error fetching properties`, e);
      throw new Error(e);
    }
  }

  async getPropertyById(propertyId: string) {
    try {
      const res = await this.prisma.property.findUnique({
        where: { id: propertyId },
      });
      this.logger.log(`Property fetched: ${res.id}`);
      return res;
    } catch (e) {
      this.logger.error(`Error fetching property`, e);
      throw new Error(e);
    }
  }
}
