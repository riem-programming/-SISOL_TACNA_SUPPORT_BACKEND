import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicket } from './dto/createTicket.dto';
import { UpdateTicket } from './dto/updateTicket.dto';
import { State } from 'src/state/state.entity';
import { Priority } from 'src/priority/priority.entity';
import { RequestType } from 'src/request_type/request_type.entity';
import { generateTicketCode } from './helper/generateTicketCode.helper';
import { User } from 'src/user/user.entity';
import { TicketStateHistoryService } from 'src/ticket_state_history/ticket_state_history.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { Observable, Subject } from 'rxjs';
import { MessageEvent } from '@nestjs/common';

@Injectable()
export class TicketService {
  private readonly ticketStateHistory: TicketStateHistoryService;
  private subjects = new Map<string, Set<Subject<MessageEvent>>>();
  private adminSubjects = new Set<Subject<MessageEvent>>();

  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
    @InjectRepository(RequestType)
    private requestTypeRepository: Repository<RequestType>,
    @InjectRepository(User) private userRepository: Repository<User>,
    TicketStateHistory: TicketStateHistoryService,
    private readonly telegram: TelegramService,
  ) {
    this.ticketStateHistory = TicketStateHistory;
  }

  async getAllTicket(userId: number) {
    const existingUser = await this.userRepository.findOneBy({ id: userId });
    if (!existingUser) {
      throw new NotFoundException('No existe el usuario');
    }
    return this.ticketRepository.find({
      where: { user_id: userId, is_active: true },
      relations: [
        'createUserRequest',
        'voucherRequest',
        'technicalSupportRequest',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async getAllTicketsAdmin() {
    const tickets = await this.ticketRepository.find({
      where: { is_active: true },
      relations: [
        'createUserRequest',
        'voucherRequest',
        'technicalSupportRequest',
        'state',
        'priority',
        'request_type',
        'user',
      ],
      order: { createdAt: 'DESC' },
    });
    return tickets.map((ticket) => ({
      ...ticket,
      user: ticket.user
        ? { id: ticket.user.id, username: ticket.user.username, email: ticket.user.email }
        : null,
    }));
  }

  getTicketById(id: number) {
    return this.ticketRepository.findOneBy({ id });
  }

  async createTicket(body: CreateTicket, supportMode?: string) {
    const state = await this.stateRepository.findOneBy({ id: body.state_id });
    if (!state) {
      throw new NotFoundException('Estado no encontrado');
    }

    const priority = await this.priorityRepository.findOneBy({
      id: body.priority_id,
    });
    if (!priority) {
      throw new NotFoundException('Prioridad no existe');
    }

    const requestType = await this.requestTypeRepository.findOneBy({
      id: body.request_type_id,
    });
    if (!requestType) {
      throw new NotFoundException('Tipo de solicitud no existe');
    }

    const user = await this.userRepository.findOneBy({ id: body.user_id });
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }

    const code = await this.generateUniqueTicketCode();

    const newTicket = this.ticketRepository.create({
      code,
      state,
      priority,
      user,
      request_type: requestType,
      is_active: body.is_active ?? true,
    });

    const savedTicket = await this.ticketRepository.save(newTicket);
    this.telegram.notificarTicketNuevo(
      savedTicket.id,
      requestType.long_name,
      user.username,
      priority.short_name,
      supportMode,
    );

    await this.ticketStateHistory.createTicketStateHistory({
      ticket_id: savedTicket.id,
      state_id: state.id,
    });

    return savedTicket;
  }

  async updateTicket(body: UpdateTicket, userId: number) {
    const currentTicket = await this.getTicketById(body.id);
    if (!currentTicket) return null;
    if (currentTicket.user_id !== userId) throw new ForbiddenException('No tienes permiso para modificar este ticket');

    if (body.state_id !== undefined) {
      const state = await this.stateRepository.findOneBy({ id: body.state_id });
      if (!state) {
        throw new NotFoundException('Estado no encontrado');
      }

      if (state.id !== currentTicket.state_id) {
        this.ticketStateHistory.createTicketStateHistory({
          state_id: state.id,
          ticket_id: currentTicket.id,
        });
      }

      currentTicket.state = state;
    }

    if (body.priority_id !== undefined) {
      const priority = await this.priorityRepository.findOneBy({
        id: body.priority_id,
      });
      if (!priority) {
        throw new NotFoundException('Prioridad no existe');
      }

      currentTicket.priority = priority;
    }

    if (body.request_type_id !== undefined) {
      const requestType = await this.requestTypeRepository.findOneBy({
        id: body.request_type_id,
      });
      if (!requestType) {
        throw new NotFoundException('Tipo de solicitud no existe');
      }

      currentTicket.request_type = requestType;
    }

    if (body.user_id !== undefined) {
      const user = await this.userRepository.findOneBy({
        id: body.user_id,
      });
      if (!user) {
        throw new NotFoundException('Usuario no existe ');
      }
      currentTicket.user = user;
    }

    const { state_id, priority_id, request_type_id, ...ticketData } = body;
    Object.assign(currentTicket, ticketData);
    return await this.ticketRepository.save(currentTicket);
  }

  async updateTicketState(id: number, stateId: number) {
    const currentTicket = await this.getTicketById(id);
    if (!currentTicket) return null;

    const state = await this.stateRepository.findOneBy({
      id: stateId,
    });

    if (!state) {
      throw new NotFoundException('Estado no encontrado');
    }

    if (currentTicket.state_id !== state.id) {
      this.ticketStateHistory.createTicketStateHistory({
        ticket_id: currentTicket.id,
        state_id: state.id,
      });

      // ✅ Usar el método emitirCambioEstado con el user_id del ticket
      this.emitirCambioEstado(
        String(currentTicket.user_id), // key del mapa = userId
        currentTicket.id, // para que Angular sepa qué ticket cambió
        stateId,
      );
    }

    currentTicket.state = state;

    return await this.ticketRepository.save(currentTicket);
  }

  async deleteTicket(id: number, userId: number) {
    const currentTicket = await this.getTicketById(id);
    if (!currentTicket) return null;
    if (currentTicket.user_id !== userId) throw new ForbiddenException('No tienes permiso para eliminar este ticket');

    await this.ticketRepository.delete({ id: currentTicket.id });
    return currentTicket;
  }

  async deleteTicketsByStateCode(code: string): Promise<{ deleted: number }> {
    const state = await this.stateRepository.findOneBy({ code });
    if (!state) return { deleted: 0 };

    const result = await this.ticketRepository.delete({
      state_id: state.id,
      is_active: true,
    });
    return { deleted: result.affected ?? 0 };
  }

  private async generateUniqueTicketCode(): Promise<string> {
    let code: string;
    let exists: Ticket | null;

    do {
      code = generateTicketCode();
      exists = await this.ticketRepository.findOneBy({ code: code });
    } while (exists);

    return code;
  }

  getEventStream(userId: string): Observable<MessageEvent> {
    const subject = new Subject<MessageEvent>();

    // Agrega al Set existente o crea uno nuevo
    if (!this.subjects.has(userId)) {
      this.subjects.set(userId, new Set());
    }
    this.subjects.get(userId)!.add(subject);

    console.log(
      `Usuario ${userId} conectado — conexiones activas: ${this.subjects.get(userId)!.size}`,
    );

    return new Observable<MessageEvent>((observer) => {
      const sub = subject.subscribe(observer);
      return () => {
        sub.unsubscribe();
        // Elimina solo este subject, no todos los del usuario
        const set = this.subjects.get(userId);
        if (set) {
          set.delete(subject);
          if (set.size === 0) this.subjects.delete(userId);
        }
      };
    });
  }

  getAdminEventStream(): Observable<MessageEvent> {
    const subject = new Subject<MessageEvent>();
    this.adminSubjects.add(subject);
    return new Observable<MessageEvent>((observer) => {
      const sub = subject.subscribe(observer);
      return () => {
        sub.unsubscribe();
        this.adminSubjects.delete(subject);
      };
    });
  }

  async getTicketByIdForAdmin(id: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: [
        'createUserRequest',
        'voucherRequest',
        'technicalSupportRequest',
        'state',
        'priority',
        'request_type',
        'user',
      ],
    });
    if (!ticket) return null;
    return {
      ...ticket,
      user: ticket.user
        ? { id: ticket.user.id, username: ticket.user.username, email: ticket.user.email }
        : null,
    };
  }

  emitAdminNewTicket(ticket: unknown): void {
    for (const subject of this.adminSubjects) {
      subject.next({ data: { type: 'new_ticket', ticket } });
    }
  }

  protected emitirCambioEstado(
    userId: string,
    ticketId: number,
    stateId: number,
  ): void {
    const set = this.subjects.get(userId);
    if (!set) return;

    // Emite a TODOS los dispositivos del usuario
    for (const subject of set) {
      subject.next({ data: { ticket_id: ticketId, state_id: stateId } });
    }
  }
}
