import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTracktoFav(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbumToFav(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addArtistToFav(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeTrack(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeArtist(id);
  }

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }
}
