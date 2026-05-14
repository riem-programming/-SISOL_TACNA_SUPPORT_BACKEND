import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './state.entity';
import { Repository } from 'typeorm';
import { CreateState } from './dto/create-state.dto';
import { UpdateState } from './dto/update-state.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
  ) {}

  getAllState() {
    return this.stateRepository.find();
  }

  getStateById(id: number) {
    return this.stateRepository.findOneBy({ id });
  }

  createState(body: CreateState) {
    const newState = this.stateRepository.create(body);
    return this.stateRepository.save(newState);
  }

  async updateState(body: UpdateState) {
    const currentState = await this.getStateById(body.id);
    if (!currentState) return null;

    Object.assign(currentState, body);
    return await this.stateRepository.save(currentState);
  }

  async deleteState(id: number) {
    const currentState = await this.getStateById(id);
    if (!currentState) return null;

    await this.stateRepository.delete({ id: currentState.id });
    return currentState;
  }
}
