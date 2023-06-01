import { OmitType } from '@nestjs/mapped-types';
import { UserEntity } from './user.entity';

export class UserResponseEntity extends OmitType(UserEntity, [
  'password',
] as const) {}
