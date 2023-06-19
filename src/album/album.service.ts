import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { FavsService } from 'src/favs/favs.service';
import { TrackEntity } from 'src/track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(FavsService)
    private favService: FavsService,
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
    const found = await this.albumRepository.findOneBy({ id });
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
    await this.findOne(id);
    this.albumRepository.delete({ id });

    await this.favService.removeAlbum(id);

    const tracks = await this.trackRepository.findBy({ albumId: Equal(id) });
    await this.trackRepository.save(
      tracks.map((track) => ({ ...track, albumId: null })),
    );
  }
  async removeAll() {
    this.albumRepository.clear();
  }
}
