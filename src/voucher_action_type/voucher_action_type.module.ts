import { Module } from '@nestjs/common';
import { VoucherActionTypeService } from './voucher_action_type.service';
import { VoucherActionTypeController } from './voucher_action_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherActionType } from './voucher_action_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherActionType])],
  providers: [VoucherActionTypeService],
  controllers: [VoucherActionTypeController],
})
export class VoucherActionTypeModule {}
