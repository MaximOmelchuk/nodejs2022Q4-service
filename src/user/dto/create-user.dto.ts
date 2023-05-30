import { ValidationPipe } from '@nestjs/common';
import { IsAlphanumeric } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
