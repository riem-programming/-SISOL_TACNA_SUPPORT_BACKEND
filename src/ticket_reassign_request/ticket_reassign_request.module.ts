import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketReassignRequest } from './ticket_reassign_request.entity';
import { TicketReassignRequestService } from './ticket_reassign_request.service';
import { TicketReassignRequestController } from './ticket_reassign_request.controller';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketReassignRequest]), TicketModule],
  controllers: [TicketReassignRequestController],
  providers: [TicketReassignRequestService],
})
export class TicketReassignRequestModule {}
