import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(FavsService)
    private favService: FavsService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track: TrackEntity = {
      id: uuid.v4(),
      ...createTrackDto,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    };
    await this.trackRepository.save(track);
    return track;
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException();
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track: TrackEntity = await this.trackRepository.findOneBy({ id });

    if (!track) throw new NotFoundException();
    const updated: TrackEntity = {
      ...track,
      ...updateTrackDto,
    };
    await this.trackRepository.save(updated);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const track: TrackEntity = await this.findOne(id);
    this.trackRepository.delete({ id });

    await this.favService.removeTrack(id);
  }
  async removeAll() {
    this.trackRepository.clear();
  }
}
