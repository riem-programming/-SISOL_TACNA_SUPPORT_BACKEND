import { Module } from '@nestjs/common';
import { RequestTypeController } from './request_type.controller';
import { RequestTypeService } from './request_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestType } from './request_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestType])],
  controllers: [RequestTypeController],
  providers: [RequestTypeService],
})
export class RequestTypeModule {}
