import { Module } from '@nestjs/common';
import { TicketStateHistoryService } from './ticket_state_history.service';
import { TicketStateHistoryController } from './ticket_state_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketStateHistory } from './ticket_state_history.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { PushNotificationModule } from 'src/push_notification/push-notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketStateHistory, Ticket]), PushNotificationModule],
  providers: [TicketStateHistoryService],
  controllers: [TicketStateHistoryController],
  exports: [TicketStateHistoryService],
})
export class TicketStateHistoryModule {}
