import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import copyObjKeyToNull from 'src/utils/copyObjKeyToNull';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const created: ArtistEntity = {
      id: uuid.v4(),
      ...createArtistDto,
    };
    return await this.artistRepository.save(created);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const found = await this.artistRepository.findOneBy({ id });
    if (!found) throw new NotFoundException();
    return found;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist: ArtistEntity = await this.findOne(id);
    const updated: ArtistEntity = {
      ...artist,
      ...updateArtistDto,
    };
    return await this.artistRepository.save(updated);
  }

  async remove(id: string) {
    const artist: ArtistEntity = await this.findOne(id);
    await this.artistRepository.delete({ id });

    // this.store.favs.artists = this.store.favs.artists.filter(
    //   (favId) => favId !== id,
    // );

    // this.store.tracks = this.store.tracks.map((track) => {
    //   if (track.artistId === id) {
    //     return copyObjKeyToNull(track, 'artistId');
    //   }
    //   return track;
    // });

    // this.store.album = this.store.album.map((album) => {
    //   if (album.artistId === id) {
    //     return copyObjKeyToNull(album, 'artistId');
    //   }
    //   return album;
    // });
  }
}
