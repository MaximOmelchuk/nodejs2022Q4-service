import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavEntity } from 'src/favs/entities/fav.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { UserEntity } from 'src/user/entities/user.entity';
export class Store {
  users: UserEntity[] = [];
  tracks: TrackEntity[] = [];
  artist: ArtistEntity[] = [];
  album: AlbumEntity[] = [];
  favs: FavEntity = { albums: [], artists: [], tracks: [] };
}

const store = new Store();
export default store;
