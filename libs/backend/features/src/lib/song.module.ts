import { Module } from '@nestjs/common';
import { SongController } from './song/song.controller';
import { SongService } from './song.service';
import { UserController } from './user/user.controller';

@Module({
  controllers: [SongController, UserController],
  providers: [SongService],
  exports: [SongService],
})
export class SongModule {}
