import { CreateUserDto } from './../../user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateArtistDto extends PartialType(CreateUserDto) {}
