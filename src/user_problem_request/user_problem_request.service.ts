import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketService } from 'src/ticket/ticket.service';
import { UserProblemRequest } from './user_problem_request.entity';
import { CreateUserProblemRequest } from './dto/create-user-problem-request.dto';
import { UpdateUserProblemRequest } from './dto/update-user-problem-request.dto';

@Injectable()
export class UserProblemRequestService {
  private readonly ticketService: TicketService;

  constructor(
    @InjectRepository(UserProblemRequest)
    private userProblemRequestRepository: Repository<UserProblemRequest>,
    TicketService: TicketService,
  ) {
    this.ticketService = TicketService;
  }

  getAlluserProblemRequest() {
    return this.userProblemRequestRepository.find();
  }

  getuserProblemRequestById(id: number) {
    return this.userProblemRequestRepository.findOneBy({ id });
  }

  async createuserProblemRequest(body: CreateUserProblemRequest) {
    const newTicket = await this.ticketService.createTicket(body);
    if (!newTicket) {
      throw new NotFoundException('Ocurrio un problema al crear el ticket');
    }

    const newuserProblemRequest = this.userProblemRequestRepository.create({
      ticket: newTicket,
      ticket_id: newTicket.id,
      affected_module: body.affected_module,
      problem_description: body.problem_description,
      system_name: body.system_name,
      username: body.username,
    });

    return await this.userProblemRequestRepository.save(newuserProblemRequest);
  }

  async updateuserProblemRequest(body: UpdateUserProblemRequest) {
    const currentuserProblemRequest = await this.getuserProblemRequestById(
      body.id,
    );
    if (!currentuserProblemRequest) return null;

    Object.assign(currentuserProblemRequest, body);
    return await this.userProblemRequestRepository.save(
      currentuserProblemRequest,
    );
  }

  async deleteuserProblemRequest(id: number) {
    const currentuserProblemRequest = await this.getuserProblemRequestById(id);
    if (!currentuserProblemRequest) return null;

    await this.userProblemRequestRepository.delete({
      id: currentuserProblemRequest.id,
    });
    return currentuserProblemRequest;
  }
}
