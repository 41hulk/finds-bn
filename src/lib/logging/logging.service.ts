import { Injectable, LoggerService } from '@nestjs/common';
import { transports, format, createLogger } from 'winston';

@Injectable()
export class LoggingService implements LoggerService {
  private logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
  });

  log(message: string, data?: any) {
    this.logger.info(message, data);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
