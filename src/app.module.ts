import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggingModule } from './lib/logging/logging.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [AuthModule, UsersModule, LoggingModule, PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
