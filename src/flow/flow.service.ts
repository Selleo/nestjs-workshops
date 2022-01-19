import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowEntity } from './flow.entity';
import { Repository } from 'typeorm';
import { FlowCreateDto, FlowUpdateDto } from './flow.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(FlowEntity)
    private flowRepository: Repository<FlowEntity>,
  ) {}

  async create(flowDto: FlowCreateDto, user: UserEntity): Promise<FlowEntity> {
    const flow = this.flowRepository.create({ ...flowDto, user });

    return flow.save();
  }

  async update(
    id: number,
    flowDto: FlowUpdateDto,
    user: UserEntity,
  ): Promise<FlowEntity> {
    await this.flowRepository.update({ id, user }, { ...flowDto });

    return this.flowRepository.findOne({ id, user });
  }

  async delete(id: number, user: UserEntity): Promise<FlowEntity> {
    const flow = await this.flowRepository.findOne({ id, user });

    await flow.remove();
    flow.id = id;

    return flow;
  }

  async findForUser(user: UserEntity): Promise<FlowEntity> {
    return this.flowRepository.findOne({ user });
  }

  async findAllForUser(user: UserEntity): Promise<FlowEntity[]> {
    return this.flowRepository.find({ user });
  }
}