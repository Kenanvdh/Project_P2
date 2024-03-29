import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { Artist, ArtistSchema } from './artist/artist.schema';
import { SongModule } from './song.module';
import { Song } from './song/song.schema';
import { List } from './list/list.schema';
import { ListModule } from './list.module';
import { NeoService } from './neo/neo.service';
import { ConfigModule } from '@nestjs/config';
import { NeoModule } from './neo.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema,}, { name: Song.name, schema: SongModule}, { name: List.name, schema: ListModule}]),
    ConfigModule,
    NeoModule
  ],
  controllers: [ArtistController],
  providers: [ArtistService, NeoService],
  exports: [ArtistService],
})
export class ArtistModule {}
