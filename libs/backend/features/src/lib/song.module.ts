import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongController } from './song/song.controller';
import { SongService } from './song/song.service';
import { Song, SongSchema } from './song/song.schema';
import { ListSchema, List } from './list/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema },  {name: List.name, schema: ListSchema}])
  ],
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService],
})
export class SongModule {}
