import { IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ArtistEntity')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  grammy: boolean;
}
