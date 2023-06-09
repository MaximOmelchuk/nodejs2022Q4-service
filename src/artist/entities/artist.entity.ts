import { IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { Entity } from 'typeorm';

@Entity('ArtistEntity')
export class ArtistEntity {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  grammy: boolean;
}
