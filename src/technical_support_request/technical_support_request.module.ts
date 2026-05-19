import { Module } from '@nestjs/common';
import { TechnicalSupportRequestController } from './technical_support_request.controller';
import { TechnicalSupportRequestService } from './technical_support_request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalSupportRequest } from './technical_support_request.entity';
import { SupportMode } from 'src/support_mode/support_mode.entity';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TechnicalSupportRequest, SupportMode]),
    TicketModule,
  ],
  controllers: [TechnicalSupportRequestController],
  providers: [TechnicalSupportRequestService],
})
export class TechnicalSupportRequestModule {}
