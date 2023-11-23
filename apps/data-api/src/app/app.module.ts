import { Module } from '@nestjs/common';
import { BackendFeaturesSongModule, SongModule, ArtistModule } from '@indivproj-p2/backend/features';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [BackendFeaturesSongModule, SongModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
