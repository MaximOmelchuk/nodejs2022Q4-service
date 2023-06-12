import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './user/entities/user.entity';
import { TrackEntity } from './track/entities/track.entity';
import { AlbumEntity } from './album/entities/album.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { FavEntity } from './favs/entities/fav.entity';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: true,
  entities: [UserEntity, TrackEntity, AlbumEntity], // ArtistEntity, FavEntity
} as DataSourceOptions;
