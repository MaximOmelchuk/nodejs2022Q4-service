import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { FavEntity } from 'src/favs/entities/fav.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { FavsService } from 'src/favs/favs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([FavEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, FavsService],
})
export class ArtistModule {}
