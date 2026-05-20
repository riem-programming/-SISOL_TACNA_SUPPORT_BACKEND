import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from './priority.entity';
import { CreatePriority } from './dto/create-priority.dto';
import { UpdatePriority } from './dto/update-priority.dto';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
  ) {}

  getAllPriority() {
    return this.priorityRepository.find();
  }

  getPriorityById(id: number) {
    return this.priorityRepository.findOneBy({ id });
  }

  async createPriority(body: CreatePriority) {
    const existingCode = await this.priorityRepository.findOneBy({
      code: body.code,
    });
    if (existingCode) {
      throw new NotFoundException('Ya existe el código');
    }

    const newPriority = this.priorityRepository.create(body);
    return this.priorityRepository.save(newPriority);
  }

  async updatePriority(body: UpdatePriority) {
    const currentPriority = await this.getPriorityById(body.id);
    if (!currentPriority) return null;

    if (body.code && body.code !== currentPriority.code) {
      const existingCode = await this.priorityRepository.findOneBy({
        code: body.code,
      });
      if (existingCode) {
        throw new NotFoundException('Ya existe el código');
      }
    }

    Object.assign(currentPriority, body);
    return await this.priorityRepository.save(currentPriority);
  }

  async deletePriority(id: number) {
    const currentPriority = await this.getPriorityById(id);
    if (!currentPriority) return null;

    await this.priorityRepository.delete({ id: currentPriority.id });
    return currentPriority;
  }
}
