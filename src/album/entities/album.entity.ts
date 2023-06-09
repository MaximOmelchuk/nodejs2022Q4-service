import { Entity } from 'typeorm';

@Entity('AlbumEntity')
export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
