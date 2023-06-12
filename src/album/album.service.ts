import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import copyObjKeyToNull from 'src/utils/copyObjKeyToNull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>, // @InjectRepository(TrackEntity) // private trackRepository: Repository<TrackEntity>,    // TODO FAVS
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const created: AlbumEntity = {
      id: uuid.v4(),
      ...createAlbumDto,
    };
    return await this.albumRepository.save(created);
  }

  findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const found = this.albumRepository.findOneBy({ id });
    if (!found) throw new NotFoundException();
    return found;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    const updated: AlbumEntity = {
      ...album,
      ...updateAlbumDto,
    };
    await this.albumRepository.save(updated);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    this.albumRepository.delete({ id });

    // this.store.favs.albums = this.store.favs.albums.filter(
    //   (favId) => favId !== id,
    // );

    // this.store.tracks = this.store.tracks.map((track) => {
    //   if (track.albumId === id) {
    //     return copyObjKeyToNull(track, 'albumId');
    //   }
    //   return track;
    // });
  }
}
