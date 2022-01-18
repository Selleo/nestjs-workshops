import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './user.dto';
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
    const { password, passwordConfirmation, ...userAttrs } = userDto;

    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        'user.passwordConfirmationDoNotMatch',
        'Password and password confirmation do not match',
      );
    }

    const user = await this.userRepository.create(userAttrs);
    user.password = password;

    return user.save();
  }

  async update(user: UserEntity, userDto: UserUpdateDto): Promise<UserEntity> {
    await this.userRepository.update({ id: user.id }, { ...userDto });

    return this.userRepository.findOne(user.id);
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
