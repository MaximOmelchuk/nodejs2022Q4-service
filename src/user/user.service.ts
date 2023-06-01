import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import store, { Store } from 'src/store/store';
import omitKeyFromObj from 'src/utils/omitKeyFromObj';

@Injectable()
export class UserService {
  private store: Store = store;

  create(createUserDto: CreateUserDto) {
    const date = Date.now();
    const user: UserEntity = {
      ...createUserDto,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.store.users.push(user);
    return omitKeyFromObj(user, 'password');
  }

  findAll() {
    return this.store.users.map((item) => {
      return omitKeyFromObj(item, 'password');
    });
  }

  findOne(id: string) {
    const user: UserEntity = this.store.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return omitKeyFromObj(user, 'password');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user: UserEntity = this.store.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    user.password = updateUserDto?.newPassword;
    return omitKeyFromObj(user, 'password');
  }

  remove(id: string) {
    const idx: number = this.store.users.findIndex((user) => user.id === id);
    if (idx < 0) throw new NotFoundException();
    this.store.users.splice(idx, 1);
  }
}
