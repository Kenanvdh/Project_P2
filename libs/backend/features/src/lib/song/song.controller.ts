import { Controller, Delete, Put, Get, Param, Post, Body } from '@nestjs/common';
import { SongService } from './song.service';
import { ISong } from '@indivproj-p2/shared/api';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Get('')
  getAll(): ISong[] {
    return this.songService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ISong {
    return this.songService.getOne(id);
  }

  @Post('')
  create(@Body() song: ISong): ISong {
    return this.songService.create(song);
  }

  @Put('/:id')
  edit(@Param('id') id: string, @Body() song: ISong): ISong {
    return this.songService.update(song);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.songService.deleteSong(id);
  }
}
