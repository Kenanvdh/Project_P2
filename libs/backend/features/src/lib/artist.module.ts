import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { Artist, ArtistSchema } from './artist/artist.schema';
import { SongModule } from './song.module';
import { Song } from './song/song.schema';
import { List } from './list/list.schema';
import { ListModule } from './list.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema,}, { name: Song.name, schema: SongModule}, { name: List.name, schema: ListModule}]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
