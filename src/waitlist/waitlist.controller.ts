import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WaitlistService } from './waitlist.service';
import { WaitlistDto } from './dto/waitlist.dto';

@Controller('waitlist')
@ApiTags('Waitlist')
export class WaitlistController {
  constructor(private waitlistService: WaitlistService) {}

  @Post('create')
  async joinWaitlist(@Body() data: WaitlistDto) {
    return this.waitlistService.create(data);
  }

  @Get('all')
  async getAllWaitlist() {
    return this.waitlistService.getAllWaitlist();
  }
}
