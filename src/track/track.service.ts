import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import store, { Store } from 'src/store/store';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  private store: Store = store;

  create(createTrackDto: CreateTrackDto) {
    const track: TrackEntity = {
      id: crypto.randomUUID(),
      ...createTrackDto,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    };
    this.store.tracks.push(track);
    return track;
  }

  findAll() {
    return store.tracks;
  }

  findOne(id: string) {
    const track = this.store.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const idx: number = this.store.tracks.findIndex((track) => track.id === id);

    if (idx < 0) throw new NotFoundException();
    const updated: TrackEntity = {
      ...this.store.tracks[idx],
      ...updateTrackDto,
    };
    this.store.tracks[idx] = updated;
    return updated;
  }

  remove(id: string) {
    const idx: number = this.store.tracks.findIndex((item) => item.id === id);
    if (idx < 0) throw new NotFoundException();
    this.store.tracks.splice(idx, 1);

    this.store.favs.tracks = this.store.favs.tracks.filter(
      (favId) => favId !== id,
    );
  }
}
