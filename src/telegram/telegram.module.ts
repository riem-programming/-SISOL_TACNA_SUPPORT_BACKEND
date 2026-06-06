import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
