import { IsString, IsInt } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateTrackDto {
  @IsString()
  name: string;
  @IsString()
  @Optional()
  artistId: string | null;
  @IsString()
  @Optional()
  albumId: string | null;
  @IsInt()
  duration: number;
}
