import { CreateUserDto } from './../../user/dto/create-user.dto';
import { IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateArtistDto extends PartialType(CreateUserDto) {}
