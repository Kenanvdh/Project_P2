import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterLink } from '@angular/router';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { UserDetail } from './user/user-detail/user-detail.component';
import { ListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/user.service';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { FormsModule } from '@angular/forms';
import { SongService } from './song/song.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, RouterLink, FormsModule],
  declarations: [
    AboutComponent,
    SongListComponent,
    SongDetailComponent,
    UserDetail,
    ListComponent,
    UserEditComponent,
    UserDeleteComponent,
  ],
  providers: [UserService, SongService],
  exports: [UserDetail, ListComponent, AboutComponent, SongListComponent, SongDetailComponent, UserEditComponent, UserDeleteComponent],
})
export class FeaturesModule {}
