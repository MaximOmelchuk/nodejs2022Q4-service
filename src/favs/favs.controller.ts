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
  async addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTracktoFav(id);
  }

  @Post('album/:id')
  async addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbumToFav(id);
  }

  @Post('artist/:id')
  async addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addArtistToFav(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.removeTrack(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.removeAlbum(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.removeArtist(id);
  }

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @HttpCode(204)
  @Delete()
  async removeAll() {
    return await this.favsService.removeAll();
  }
}
