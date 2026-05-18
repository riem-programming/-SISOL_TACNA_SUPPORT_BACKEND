import { Module } from '@nestjs/common';
import { CreateUserRequestController } from './create_user_request.controller';
import { CreateUserRequestService } from './create_user_request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserRequest } from './create-user-request.entity';
import { TicketModule } from 'src/ticket/ticket.module';
import { DocumentType } from 'src/document_type/document_type.entity';
import { ContractType } from 'src/contract_type/contract_type.entity';
import { SystemRole } from 'src/system_role/system_role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreateUserRequest,
      DocumentType,
      ContractType,
      SystemRole,
    ]),
    TicketModule,
  ],
  controllers: [CreateUserRequestController],
  providers: [CreateUserRequestService],
})
export class CreateUserRequestModule {}
