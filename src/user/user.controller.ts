import { UserResponseEntity } from './entities/userResponse.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): UserResponseEntity {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): UserResponseEntity[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): UserResponseEntity {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): UserResponseEntity {
    const user = this.userService.update(id, updateUserDto);
    return user;
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
