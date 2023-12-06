import {
  Controller,
  Delete,
  Put,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { SongService } from './song.service';
import { ISong } from '@indivproj-p2/shared/api';
import { CreateSongDto, UpdateSongDto } from '@indivproj-p2/backend/dto';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Get('')
  getAll(): Promise<ISong[]> {
    return this.songService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ISong | null> {
    return this.songService.getOne(id);
  }

  @Post('')
  create(@Body() song: CreateSongDto): Promise<ISong> {
    console.log(`Creating song`);
    return this.songService.create(song);
  }

  @Put(':id')
  edit(
    @Param('id') id: string,
    @Body() song: UpdateSongDto
  ): Promise<ISong | null> {
    return this.songService.update(id, song);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.songService.deleteSong(id);
  }
}
