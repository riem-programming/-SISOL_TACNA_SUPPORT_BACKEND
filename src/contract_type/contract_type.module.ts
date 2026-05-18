import { Module } from '@nestjs/common';
import { ContractTypeController } from './contract_type.controller';
import { ContractTypeService } from './contract_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractType } from './contract_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractType])],
  controllers: [ContractTypeController],
  providers: [ContractTypeService],
})
export class ContractTypeModule {}
