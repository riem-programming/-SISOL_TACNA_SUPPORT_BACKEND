import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createsystemRole(body: CreateSystemRole) {
    const existingCode = await this.systemRoleRepository.findOneBy({
      code: body.code,
    });
    if (existingCode) {
      throw new NotFoundException('Ya existe el código');
    }

    const newsystemRole = this.systemRoleRepository.create(body);
    return this.systemRoleRepository.save(newsystemRole);
  }

  async updatesystemRole(body: UpdateSystemRole) {
    const currentsystemRole = await this.getsystemRoleById(body.id);
    if (!currentsystemRole) return null;

    if (body.code && body.code !== currentsystemRole.code) {
      const existingCode = await this.systemRoleRepository.findOneBy({
        code: body.code,
      });
      if (existingCode) {
        throw new NotFoundException('Ya existe el código');
      }
    }

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
