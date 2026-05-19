import { Module } from '@nestjs/common';
import { SupportModeController } from './support_mode.controller';
import { SupportModeService } from './support_mode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportMode } from './support_mode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportMode])],
  controllers: [SupportModeController],
  providers: [SupportModeService],
})
export class SupportModeModule {}
