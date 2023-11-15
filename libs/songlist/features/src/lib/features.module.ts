import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SongListComponent } from './song/song-list/song-list.component';
//import { SongDetailComponent } from './song/song-detail/song-detail.component';
//import { SongService } from './song/song.service';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserDetail } from './user/user-detail/user-detail.component'
import { ListComponent } from './user/user-list/user-list.component'
import { UserService } from './user/user.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [
    AboutComponent,
    UserDetail,
    ListComponent,
  ],
  providers: [UserService],
  exports: [
    UserDetail,
    ListComponent,
    AboutComponent,
  ],
})
export class FeaturesModule {}
