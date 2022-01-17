import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user.type';

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
    user.role = UserRole.USER;

    return user.save();
  }
}
