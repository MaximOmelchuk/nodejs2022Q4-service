import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { FavsService } from 'src/favs/favs.service';
import { FavEntity } from 'src/favs/entities/fav.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([FavEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FavsService],
})
export class TrackModule {}
