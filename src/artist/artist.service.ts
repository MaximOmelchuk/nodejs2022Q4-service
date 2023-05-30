import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import store, { Store } from 'src/store/store';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private store: Store = store;

  create(createArtistDto: CreateArtistDto) {
    const created: ArtistEntity = {
      id: crypto.randomUUID(),
      ...createArtistDto,
    };
    this.store.artist.push(created);
    return created;
  }

  findAll() {
    return this.store.artist;
  }

  findOne(id: string) {
    const found = this.store.artist.find((item) => item.id === id);
    if (!found) throw new NotFoundException();
    return found;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const idx: number = this.store.artist.findIndex((item) => item.id === id);

    if (idx < 0) throw new NotFoundException();
    const updated: ArtistEntity = {
      ...this.store.artist[idx],
      ...updateArtistDto,
    };
    this.store.artist[idx] = updated;
    return updated;
  }

  remove(id: string) {
    const idx: number = this.store.artist.findIndex((item) => item.id === id);
    if (idx < 0) throw new NotFoundException();
    this.store.artist.splice(idx, 1);
  }
}
