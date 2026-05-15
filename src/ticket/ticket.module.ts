import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { State } from 'src/state/state.entity';
import { Priority } from 'src/priority/priority.entity';
import { RequestType } from 'src/request_type/request_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, State, Priority, RequestType])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
