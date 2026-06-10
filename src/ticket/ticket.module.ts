import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { State } from 'src/state/state.entity';
import { Priority } from 'src/priority/priority.entity';
import { RequestType } from 'src/request_type/request_type.entity';
import { User } from 'src/user/user.entity';
import { TicketStateHistoryModule } from 'src/ticket_state_history/ticket_state_history.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, State, Priority, RequestType, User]),
    TicketStateHistoryModule,
    TelegramModule,
    StorageModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
