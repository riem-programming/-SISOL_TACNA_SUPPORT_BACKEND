import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicket } from './dto/createTicket.dto';
import { UpdateTicket } from './dto/updateTicket.dto';
import { UpdateTicketState } from './dto/updateTicketState.dto';

@Controller('ticket')
export class TicketController {
  private readonly ticketService: TicketService;

  constructor(TicketService: TicketService) {
    this.ticketService = TicketService;
  }

  private notFoundMessage = 'No existe el ticket';

  @Get('/')
  async getAllTicket() {
    return await this.ticketService.getAllTicket();
  }

  @Get('/:id')
  async getTicketById(@Param('id') id: string) {
    const currentTicket = await this.ticketService.getTicketById(Number(id));
    if (!currentTicket) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currentTicket;
  }

  @Post('/')
  async createTicket(@Body() body: CreateTicket) {
    return await this.ticketService.createTicket(body);
  }

  @Put('/')
  async updateTicket(@Body() body: UpdateTicket) {
    const updateTicket = await this.ticketService.updateTicket(body);
    if (!updateTicket) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updateTicket;
  }

  @Patch('/:id/state')
  async updateTicketState(
    @Param('id') id: number,
    @Body() body: UpdateTicketState,
  ) {
    const updatedTicket = await this.ticketService.updateTicketState(
      Number(id),
      body.state_id,
    );
    if (!updatedTicket) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updatedTicket;
  }

  @Delete('/:id')
  async deleteTicket(@Param('id') id: number) {
    const deleteTicket = await this.ticketService.deleteTicket(id);
    if (!deleteTicket) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deleteTicket;
  }
}
