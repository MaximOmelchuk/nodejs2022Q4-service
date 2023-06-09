import { Entity } from 'typeorm';

@Entity('TrackEntity')
export class TrackEntity {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
