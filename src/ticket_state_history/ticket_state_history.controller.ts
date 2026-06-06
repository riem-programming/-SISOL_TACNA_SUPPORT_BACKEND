import { Controller, Get, Param } from '@nestjs/common';
import { TicketStateHistoryService } from './ticket_state_history.service';

@Controller('ticket-state-history')
export class TicketStateHistoryController {
  private readonly ticketStateHistory: TicketStateHistoryService;

  constructor(TicketStateHistory: TicketStateHistoryService) {
    this.ticketStateHistory = TicketStateHistory;
  }

  @Get('/:id')
  async getHistoryByTicketId(@Param('id') id: string) {
    return await this.ticketStateHistory.getHistoryByTicketId(Number(id));
  }
}
