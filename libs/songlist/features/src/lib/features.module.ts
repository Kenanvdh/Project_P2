import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { SongService } from './song/song.service';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserDetail } from './user/user-detail/user-detail.component'
import { UserListComponent } from './user/user-list/user-list.component'

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [
    SongListComponent,
    SongDetailComponent,
    AboutComponent,
    UserDetail,
    UserListComponent,
  ],
  providers: [SongService],
  exports: [
    SongListComponent,
    SongDetailComponent,
    UserDetail,
    UserListComponent,
    AboutComponent,
  ],
})
export class FeaturesModule {}
