import { CreateUserDto } from './../../user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsInt } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateTrackDto extends PartialType(CreateUserDto) {}
