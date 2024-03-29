import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongController } from './song/song.controller';
import { SongService } from './song/song.service';
import { Song, SongSchema } from './song/song.schema';
import { ListSchema, List } from './list/list.schema';
import { NeoService } from './neo/neo.service';
import { ConfigModule } from '@nestjs/config';
import { NeoModule } from './neo.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema },
      { name: List.name, schema: ListSchema },
    ]),
    ConfigModule,
    NeoModule
  ],
  controllers: [SongController],
  providers: [SongService, NeoService],
  exports: [SongService],
})
export class SongModule {}
