import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class TicketService {
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
  ) {}

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

  getTicketById(id: number) {
    return this.ticketRepository.findOneBy({ id });
  }

  async createTicket(body: CreateTicket) {
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

    return await this.ticketRepository.save(newTicket);
  }

  async updateTicket(body: UpdateTicket) {
    const currentTicket = await this.getTicketById(body.id);
    if (!currentTicket) return null;

    if (body.state_id !== undefined) {
      const state = await this.stateRepository.findOneBy({ id: body.state_id });
      if (!state) {
        throw new NotFoundException('Estado no encontrado');
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

    currentTicket.state = state;

    return await this.ticketRepository.save(currentTicket);
  }

  async deleteTicket(id: number) {
    const currentTicket = await this.getTicketById(id);
    if (!currentTicket) return null;

    await this.ticketRepository.delete({ id: currentTicket.id });
    return currentTicket;
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
}
