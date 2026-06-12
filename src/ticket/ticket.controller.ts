import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  Sse,
  UnauthorizedException,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicket } from './dto/createTicket.dto';
import { UpdateTicket } from './dto/updateTicket.dto';
import { UpdateTicketState } from './dto/updateTicketState.dto';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';

@Controller('ticket')
export class TicketController {
  private readonly ticketService: TicketService;

  constructor(TicketService: TicketService) {
    this.ticketService = TicketService;
  }

  private notFoundMessage = 'No existe el ticket';

  @Sse('events')
  ticketEvents(
    @Query('userId') userId: string,
    @Query('token') _token: string,
  ): Observable<MessageEvent> {
    return this.ticketService.getEventStream(userId);
  }

  @Public()
  @Sse('admin/events')
  adminEvents(@Query('key') key: string): Observable<MessageEvent> {
    if (!key || key !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    return this.ticketService.getAdminEventStream();
  }

  @Get('/')
  async getAllTicket(@Request() req) {
    const userId = req.user.sub;
    return await this.ticketService.getAllTicket(userId);
  }

  @Get('/admin/all')
  async getAllTicketsAdmin(@Headers('x-admin-key') adminKey: string) {
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    return await this.ticketService.getAllTicketsAdmin();
  }

  @Delete('/admin/clean/:code')
  async deleteTicketsByStateCode(
    @Headers('x-admin-key') adminKey: string,
    @Param('code') code: string,
  ) {
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    return await this.ticketService.deleteTicketsByStateCode(code);
  }

  @Get('/admin/:id')
  async getTicketByIdAdmin(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
  ) {
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    const ticket = await this.ticketService.getTicketByIdForAdmin(Number(id));
    if (!ticket) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return ticket;
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
  async updateTicket(@Body() body: UpdateTicket, @Request() req) {
    const updateTicket = await this.ticketService.updateTicket(body, req.user.sub);
    if (!updateTicket) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updateTicket;
  }

  @Patch('/:id/state')
  async updateTicketState(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: number,
    @Body() body: UpdateTicketState,
  ) {
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
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
  async deleteTicket(@Param('id') id: number, @Request() req) {
    const deleteTicket = await this.ticketService.deleteTicket(id, req.user.sub);
    if (!deleteTicket) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deleteTicket;
  }
}
