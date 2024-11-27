import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggingModule } from './lib/logging/logging.module';
import { PropertyModule } from './property/property.module';
import { UploadModule } from './upload/upload.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from './booking/booking.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { RfpModule } from './rfp/rfp.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggingModule,
    PropertyModule,
    UploadModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    BookingModule,
    WaitlistModule,
    RfpModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }, AppService],
})
export class AppModule {}
