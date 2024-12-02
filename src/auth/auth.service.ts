import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { LoggingService } from 'src/lib/logging/logging.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private logger: LoggingService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return await result;
    }
    return await null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      username: user.username,
    };
    this.logger.log('User logged in', { email: user.email });
    return {
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      access_token: await this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    pass: string,
    username: string,
    nationality: string,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(pass, 10);
      const existingUser = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        throw new ConflictException('user already exists');
      }
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          username: username,
          nationality: nationality,
        },
      });

      if (user.id) {
        this.logger.log('User registered', { username: user.username });
        return this.login(user);
      }

      return await user;
    } catch (error) {
      this.logger.error('Error registering user', error);
      throw error;
    }
  }

  async getAll() {
    this.logger.log('Getting all users');
    return await this.prisma.user.findMany({
      orderBy: { created_at: 'desc' },
    });
  }
}
