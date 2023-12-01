import { Controller, Get, Param } from '@nestjs/common';
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
}
