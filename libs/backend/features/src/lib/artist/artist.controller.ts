import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { IArtist } from '@indivproj-p2/shared/api';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll(): Promise<IArtist[]> {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<IArtist | null> {
    return this.artistService.getById(id);
  }

  @Post()
  create(@Body() artist: IArtist): Promise<IArtist> {
    return this.artistService.create(artist);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() artist: IArtist
  ): Promise<IArtist | null> {
    return this.artistService.update(id, artist);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.artistService.delete(id);
  }
}
