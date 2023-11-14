import { Controller } from '@nestjs/common';
import { SongService } from '../song.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { ISong } from '@indivproj-p2/shared/api';
import { CreateSongDto } from '@indivproj-p2/backend/dto';

@Controller('song')
export class SongController {
    constructor(private songService: SongService) {}

    @Get('')
    getAll(): ISong[] {
        return this.songService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number): ISong {
        return this.songService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateSongDto): ISong {
        return this.songService.create(data);
    }
}
