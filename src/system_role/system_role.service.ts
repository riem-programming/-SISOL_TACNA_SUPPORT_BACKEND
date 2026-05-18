import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemRole } from './system_role.entity';
import { CreateSystemRole } from './dto/create-system-role.dto';
import { UpdateSystemRole } from './dto/update-system-role.dto';

@Injectable()
export class SystemRoleService {
  constructor(
    @InjectRepository(SystemRole)
    private systemRoleRepository: Repository<SystemRole>,
  ) {}

  getAllsystemRole() {
    return this.systemRoleRepository.find();
  }

  getsystemRoleById(id: number) {
    return this.systemRoleRepository.findOneBy({ id });
  }

  createsystemRole(body: CreateSystemRole) {
    const newsystemRole = this.systemRoleRepository.create(body);
    return this.systemRoleRepository.save(newsystemRole);
  }

  async updatesystemRole(body: UpdateSystemRole) {
    const currentsystemRole = await this.getsystemRoleById(body.id);
    if (!currentsystemRole) return null;

    Object.assign(currentsystemRole, body);
    return await this.systemRoleRepository.save(currentsystemRole);
  }

  async deletesystemRole(id: number) {
    const currentsystemRole = await this.getsystemRoleById(id);
    if (!currentsystemRole) return null;

    await this.systemRoleRepository.delete({ id: currentsystemRole.id });
    return currentsystemRole;
  }
}
