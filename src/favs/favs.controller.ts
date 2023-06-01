import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

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
  findAll() {
    return this.favsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
  //   return this.favsService.update(+id, updateFavDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.favsService.remove(+id);
  // }
}
