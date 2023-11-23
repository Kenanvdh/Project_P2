import { Controller, Get } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { IArtist } from '@indivproj-p2/shared/api';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('')
  get(): IArtist[] {
    return this.artistService.get();
  }
}
