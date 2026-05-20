import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportMode } from './support_mode.entity';
import { CreateSupportMode } from './dto/create-support-mode.dto';
import { UpdateSupportMode } from './dto/update-support-mode.dto';

@Injectable()
export class SupportModeService {
  constructor(
    @InjectRepository(SupportMode)
    private supportModeRepository: Repository<SupportMode>,
  ) {}

  getAllsupportMode() {
    return this.supportModeRepository.find();
  }

  getsupportModeById(id: number) {
    return this.supportModeRepository.findOneBy({ id });
  }

  async createsupportMode(body: CreateSupportMode) {
    const existingCode = await this.supportModeRepository.findOneBy({
      code: body.code,
    });
    if (existingCode) {
      throw new NotFoundException('Ya existe el código');
    }

    const newsupportMode = this.supportModeRepository.create(body);
    return this.supportModeRepository.save(newsupportMode);
  }

  async updatesupportMode(body: UpdateSupportMode) {
    const currentsupportMode = await this.getsupportModeById(body.id);
    if (!currentsupportMode) return null;

    if (body.code && body.code !== currentsupportMode.code) {
      const existingCode = await this.supportModeRepository.findOneBy({
        code: body.code,
      });
      if (existingCode) {
        throw new NotFoundException('Ya existe el código');
      }
    }

    Object.assign(currentsupportMode, body);
    return await this.supportModeRepository.save(currentsupportMode);
  }

  async deletesupportMode(id: number) {
    const currentsupportMode = await this.getsupportModeById(id);
    if (!currentsupportMode) return null;

    await this.supportModeRepository.delete({ id: currentsupportMode.id });
    return currentsupportMode;
  }
}
