import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { TicketCommentService } from './ticket-comment.service';
import { CreateTicketCommentDto } from './dto/create-ticket-comment.dto';
import { CreateAdminTicketCommentDto } from './dto/create-admin-ticket-comment.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('ticket-comment')
export class TicketCommentController {
  constructor(private readonly ticketCommentService: TicketCommentService) {}

  @Public()
  @Get('admin/:ticketId')
  getAdminComments(
    @Headers('x-admin-key') adminKey: string,
    @Param('ticketId') ticketId: string,
  ) {
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    return this.ticketCommentService.getCommentsByTicketId(Number(ticketId));
  }

  @Get(':ticketId')
  getComments(@Param('ticketId') ticketId: string) {
    return this.ticketCommentService.getCommentsByTicketId(Number(ticketId));
  }

  @Post()
  createUserComment(@Body() body: CreateTicketCommentDto, @Request() req) {
    return this.ticketCommentService.createUserComment({
      ...body,
      user_id: req.user.sub,
    });
  }

  @Patch(':ticketId/read')
  markUserRead(@Param('ticketId') ticketId: string) {
    return this.ticketCommentService.markUserRead(Number(ticketId));
  }

  @Public()
  @Patch('admin/:ticketId/read')
  markAdminRead(
    @Headers('x-admin-key') adminKey: string,
    @Param('ticketId') ticketId: string,
  ) {
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    return this.ticketCommentService.markAdminRead(Number(ticketId));
  }

  @Public()
  @Post('admin')
  createAdminComment(
    @Headers('x-admin-key') adminKey: string,
    @Body() body: CreateAdminTicketCommentDto,
  ) {
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
    return this.ticketCommentService.createAdminComment(body);
  }
}
