import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BackendFeaturesSongModule,
  SongModule,
  ArtistModule,
} from '@indivproj-p2/backend/features';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '@indivproj-p2/shared/util-env';

@Module({
  imports: [
    BackendFeaturesSongModule,
    SongModule,
    ArtistModule,
    MongooseModule.forRoot(environment.mongoUrl, {
      dbName: 'Songlist',
      connectionFactory: (connection) => {
        return connection;
      },
      connectionErrorFactory: (error) => {
        return error;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
