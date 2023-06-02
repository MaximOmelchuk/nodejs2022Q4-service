import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import store, { Store } from 'src/store/store';
import { FavResp } from './entities/fav.entity';

@Injectable()
export class FavsService {
  private store: Store = store;

  findAll() {
    const allArtists = store.artist;
    const allAlbums = store.album;
    const allTracks = store.tracks;
    const { artists, albums, tracks } = store.favs;

    const result: FavResp = { artists: [], albums: [], tracks: [] };

    result.artists = artists.map((artistId) =>
      allArtists.find((item) => item.id === artistId),
    );
    result.albums = albums.map((artistId) =>
      allAlbums.find((item) => item.id === artistId),
    );
    result.tracks = tracks.map((artistId) =>
      allTracks.find((item) => item.id === artistId),
    );

    return result;
  }

  addTracktoFav(id: string) {
    const isExist = this.store.tracks.find((item) => item.id === id);
    if (!isExist) throw new HttpException('Not exist', 422);
    this.store.favs.tracks.push(id);
    return 'Entity added to favourites';
  }
  addAlbumToFav(id: string) {
    const isExist = this.store.album.find((item) => item.id === id);
    if (!isExist) throw new HttpException('Not exist', 422);
    this.store.favs.albums.push(id);
    return 'Entity added to favourites';
  }
  addArtistToFav(id: string) {
    const isExist = this.store.artist.find((item) => item.id === id);
    if (!isExist) throw new HttpException('Not exist', 422);
    this.store.favs.artists.push(id);
  }

  removeTrack(id: string) {
    const idx: number = this.store.favs.tracks.findIndex((item) => item === id);
    if (idx < 0) throw new NotFoundException();
    this.store.favs.tracks.splice(idx, 1);
  }
  removeArtist(id: string) {
    const idx: number = this.store.favs.artists.findIndex(
      (item) => item === id,
    );
    if (idx < 0) throw new NotFoundException();
    this.store.favs.artists.splice(idx, 1);
  }
  removeAlbum(id: string) {
    const idx: number = this.store.favs.albums.findIndex((item) => item === id);
    if (idx < 0) throw new NotFoundException();
    this.store.favs.albums.splice(idx, 1);
  }
}
