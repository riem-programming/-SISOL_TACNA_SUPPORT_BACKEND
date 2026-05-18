import { Module } from '@nestjs/common';
import { SystemRoleController } from './system_role.controller';
import { SystemRoleService } from './system_role.service';
import { SystemRole } from './system_role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SystemRole])],
  controllers: [SystemRoleController],
  providers: [SystemRoleService],
})
export class SystemRoleModule {}
