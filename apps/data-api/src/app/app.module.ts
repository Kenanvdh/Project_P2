import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NeoModule } from '@indivproj-p2/backend/features';
import {
  BackendFeaturesSongModule,
  SongModule,
  ArtistModule,
  ListModule,
} from '@indivproj-p2/backend/features';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '@indivproj-p2/shared/util-env';

@Module({
  imports: [
    BackendFeaturesSongModule,
    SongModule,
    ArtistModule,
    ListModule,
    MongooseModule.forRoot(environment.mongoUrl, {
      dbName: 'Songlist',
      connectionFactory: (connection) => {
        return connection;
      },
      connectionErrorFactory: (error) => {
        return error;
      },
    }),
    NeoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
