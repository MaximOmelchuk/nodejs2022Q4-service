import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Entity } from 'typeorm';

@Entity('FavEntity')
export class FavEntity {
  artists: string[];
  albums: string[];
  tracks: string[];
}

@Entity('FavResp')
export class FavResp {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
