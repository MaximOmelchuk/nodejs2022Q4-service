import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(FavsService)
    private favService: FavsService,
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
    await this.findOne(id);
    this.artistRepository.delete({ id });

    await this.favService.removeArtist(id);

    const tracks = await this.trackRepository.findBy({ artistId: Equal(id) });
    await this.trackRepository.save(
      tracks.map((track) => ({ ...track, artistId: null })),
    );

    const albums = await this.albumRepository.findBy({ artistId: Equal(id) });
    await this.trackRepository.save(
      albums.map((track) => ({ ...track, artistId: null })),
    );
  }
}
