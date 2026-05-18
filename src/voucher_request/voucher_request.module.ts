import { Module } from '@nestjs/common';
import { VoucherRequestController } from './voucher_request.controller';
import { VoucherRequestService } from './voucher_request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherRequest } from './voucher_request.entity';
import { VoucherActionType } from 'src/voucher_action_type/voucher_action_type.entity';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoucherRequest, VoucherActionType]),
    TicketModule,
  ],
  controllers: [VoucherRequestController],
  providers: [VoucherRequestService],
})
export class VoucherRequestModule {}
