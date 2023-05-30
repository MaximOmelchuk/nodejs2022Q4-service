import { IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
