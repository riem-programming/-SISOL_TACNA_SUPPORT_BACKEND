import { Module } from '@nestjs/common';
import { UserProblemRequestController } from './user_problem_request.controller';
import { UserProblemRequestService } from './user_problem_request.service';
import { TicketModule } from 'src/ticket/ticket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProblemRequest } from './user_problem_request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProblemRequest]), TicketModule],
  controllers: [UserProblemRequestController],
  providers: [UserProblemRequestService],
})
export class UserProblemRequestModule {}
