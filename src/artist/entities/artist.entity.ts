import { IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class ArtistEntity {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  grammy: boolean;
}
