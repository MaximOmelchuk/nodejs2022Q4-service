import { CreateUserDto } from './../../user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTrackDto extends PartialType(CreateUserDto) {}
