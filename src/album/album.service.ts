import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import store, { Store } from 'src/store/store';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private store: Store = store;

  create(createAlbumDto: CreateAlbumDto) {
    const created: AlbumEntity = {
      id: crypto.randomUUID(),
      ...createAlbumDto,
    };
    this.store.album.push(created);
    return created;
  }

  findAll() {
    return this.store.album;
  }

  findOne(id: string) {
    const found = this.store.album.find((item) => item.id === id);
    if (!found) throw new NotFoundException();
    return found;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const idx: number = this.store.album.findIndex((item) => item.id === id);

    if (idx < 0) throw new NotFoundException();
    const updated: AlbumEntity = {
      ...this.store.album[idx],
      ...updateAlbumDto,
    };
    this.store.album[idx] = updated;
    return updated;
  }

  remove(id: string) {
    const idx: number = this.store.album.findIndex((item) => item.id === id);
    if (idx < 0) throw new NotFoundException();
    this.store.album.splice(idx, 1);
  }
}
