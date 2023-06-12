import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { FavEntity, FavResp } from './entities/fav.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavEntity)
    private favRepository: Repository<FavEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getFavsArr() {
    const favs = (await this.favRepository.find())[0];
    if (!favs) {
      return this.favRepository.create({
        id: uuid.v4(),
        artists: [],
        albums: [],
        tracks: [],
      });
    }
    return favs;
  }

  async findAll() {
    const result: FavResp = { artists: [], albums: [], tracks: [] };
    const { artists, albums, tracks } = await this.getFavsArr();

    result.artists = await this.artistRepository.findBy({ id: In(artists) });
    result.albums = await this.albumRepository.findBy({ id: In(albums) });
    result.tracks = await this.trackRepository.findBy({ id: In(tracks) });

    return result;
  }

  async addTracktoFav(id: string) {
    const isExist = await this.trackRepository.findOneBy({ id });
    if (!isExist) throw new HttpException('Not exist', 422);
    const fav = await this.getFavsArr();

    if (!fav.tracks.includes(id)) {
      await this.favRepository.save({
        ...fav,
        tracks: [...fav.tracks, id],
      });
      return 'Entity added to favourites';
    }
    return 'Allready added to favourites';
  }

  async addAlbumToFav(id: string) {
    const isExist = await this.albumRepository.findOneBy({ id });
    if (!isExist) throw new HttpException('Not exist', 422);
    const fav = await this.getFavsArr();

    if (!fav.albums.includes(id)) {
      await this.favRepository.save({
        ...fav,
        albums: [...fav.albums, id],
      });
      return 'Entity added to favourites';
    }
    return 'Allready added to favourites';
  }

  async addArtistToFav(id: string) {
    const isExist = await this.artistRepository.findOneBy({ id });
    if (!isExist) throw new HttpException('Not exist', 422);
    const fav = await this.getFavsArr();

    if (!fav.artists.includes(id)) {
      await this.artistRepository.save({
        ...fav,
        artists: [...fav.artists, id],
      });
      return 'Entity added to favourites';
    }
    return 'Allready added to favourites';
  }

  async removeTrack(id: string) {
    const isExist = await this.trackRepository.findOneBy({ id });
    if (!isExist) throw new NotFoundException();
    const fav = await this.getFavsArr();

    if (fav.tracks.includes(id)) {
      const decreased = fav.tracks.filter((item) => item !== id);
      await this.favRepository.save({
        ...fav,
        tracks: decreased,
      });
    }
  }

  async removeArtist(id: string) {
    const isExist = await this.artistRepository.findOneBy({ id });
    if (!isExist) throw new NotFoundException();
    const fav = await this.getFavsArr();

    if (fav.artists.includes(id)) {
      const decreased = fav.artists.filter((item) => item !== id);
      await this.favRepository.save({
        ...fav,
        albums: decreased,
      });
    }
  }

  async removeAlbum(id: string) {
    const isExist = await this.albumRepository.findOneBy({ id });
    if (!isExist) throw new NotFoundException();
    const fav = await this.getFavsArr();

    if (fav.albums.includes(id)) {
      const decreased = fav.albums.filter((item) => item !== id);
      await this.favRepository.save({
        ...fav,
        albums: decreased,
      });
    }
  }
}
