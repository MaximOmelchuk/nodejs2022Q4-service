import { OmitType } from '@nestjs/mapped-types';
import { UserEntity } from './user.entity';
import { Entity } from 'typeorm';

@Entity('UserResponseEntity')
export class UserResponseEntity extends OmitType(UserEntity, [
  'password',
  'toResponse',
] as const) {}
