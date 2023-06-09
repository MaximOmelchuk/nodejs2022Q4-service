import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import store, { Store } from 'src/store/store';
import omitKeyFromObj from 'src/utils/omitKeyFromObj';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const date = Date.now();
    const user = {
      ...createUserDto,
      id: crypto.randomUUID() as string,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    // return omitKeyFromObj(user, 'password');
    const createdUser = this.userRepository.create(user);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  // findOne(id: string) {
  //   const user: UserEntity = this.store.users.find((user) => user.id === id);
  //   if (!user) throw new NotFoundException();
  //   return omitKeyFromObj(user, 'password');
  // }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const user: UserEntity = this.store.users.find((user) => user.id === id);
  //   if (!user) throw new NotFoundException();
  //   if (user.password !== updateUserDto.oldPassword) {
  //     throw new ForbiddenException();
  //   }
  //   user.password = updateUserDto?.newPassword;
  //   user.version = user.version + 1;
  //   user.updatedAt = Date.now();
  //   return omitKeyFromObj(user, 'password');
  // }

  // remove(id: string) {
  //   const idx: number = this.store.users.findIndex((user) => user.id === id);
  //   if (idx < 0) throw new NotFoundException();
  //   this.store.users.splice(idx, 1);
  // }
}
