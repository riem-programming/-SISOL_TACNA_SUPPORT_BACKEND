import { Module } from '@nestjs/common';
import { TicketStateHistoryService } from './ticket_state_history.service';
import { TicketStateHistoryController } from './ticket_state_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketStateHistory } from './ticket_state_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketStateHistory])],
  providers: [TicketStateHistoryService],
  controllers: [TicketStateHistoryController],
  exports: [TicketStateHistoryService],
})
export class TicketStateHistoryModule {}
