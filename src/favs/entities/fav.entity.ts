import { IsString } from 'class-validator';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FavEntity')
export class FavEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column('text', { array: true })
  artists: string[];

  @Column('text', { array: true })
  albums: string[];

  @Column('text', { array: true })
  tracks: string[];
}

@Entity('FavResp')
export class FavResp {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
