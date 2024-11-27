import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { LoggingService } from 'src/lib/logging/logging.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePropertyDto } from './dto/createPropertyDto.dto';
import { UpdatePropertyDto } from './dto/updatePropertyDto.dto';

@Injectable()
export class PropertyService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {}

  async createProperty(userId: string, data: CreatePropertyDto) {
    const { images, name, description, pricePerNight, address } = data;
    try {
      if (!userId) {
        throw new PreconditionFailedException('Missing user id');
      }
      const res = await this.prisma.property.create({
        data: {
          images,
          name,
          description,
          pricePerNight,
          address,
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
      const res = await this.prisma.property.findMany();
      this.logger.log(`All properties fetched`);
      return res;
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
