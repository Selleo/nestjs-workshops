import { BadRequestException, Injectable } from '@nestjs/common';
import {
  UserCreateDto,
  UserUpdateDto,
  UserUpdatePasswordDto,
} from './user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: UserCreateDto): Promise<UserEntity> {
    const { password, ...userAttrs } = userDto;

    const user = await this.userRepository.create(userAttrs);
    user.password = password;

    return user.save();
  }

  async update(user: UserEntity, userDto: UserUpdateDto): Promise<UserEntity> {
    await this.userRepository.update({ id: user.id }, { ...userDto });

    return this.userRepository.findOne(user.id);
  }

  async updatePassword(
    user: UserEntity,
    { password }: UserUpdatePasswordDto,
  ): Promise<UserEntity> {
    user.password = password;

    return user.save();
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
