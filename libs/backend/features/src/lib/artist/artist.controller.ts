import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { IArtist } from '@indivproj-p2/shared/api';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll(): IArtist[]{
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): IArtist  {
    console.log('Received artist ID:', id);

    const artist = this.artistService.getById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return artist;
  }
}

