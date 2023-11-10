import { Module } from '@nestjs/common';
import { BackendFeaturesSongModule } from '@indivproj-p2/backend/features';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BackendFeaturesSongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
