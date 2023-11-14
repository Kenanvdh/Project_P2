import { Module } from "@nestjs/common";
import { SongController } from "./song.controller"; 
import { SongService } from "../song.service";

import { UserController } from "../user/user.controller";
import { UserService } from "../user.service";

@Module({
    controllers: [SongController, UserController],
    providers: [SongService, UserService],
    exports: [SongService, UserService],
})
export class BackendFeaturesSongModule {}