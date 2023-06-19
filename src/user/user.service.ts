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
import * as uuid from 'uuid';

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
      id: uuid.v4() as string,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    const createdUser = this.userRepository.create(user);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((item) => item.toResponse());
  }

  async findOne(id: string) {
    const user: UserEntity = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user.toResponse();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: UserEntity = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    user.password = updateUserDto?.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();
    await this.userRepository.save(user);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const user: UserEntity = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    this.userRepository.delete({ id });
  }
  async removeAll() {
    this.userRepository.clear();
  }
}
