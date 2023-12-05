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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongService } from './song/song.service';
import { SongEditComponent } from './song/song-edit/song-edit.component';
import { SongDeleteComponent } from './song/song-delete/song-delete.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './auth/auth.service';
import { ArtistInfoComponent } from './artist/artist-info/artist-info.component';
import { ArtistService } from './artist/artist.service';
import { ListEditComponent } from './list/list-edit/list-edit.component';
import { ListDetailComponent } from './list/list-detail/list-detail.component';
import { ListDeleteComponent } from './list/list-delete/list-delete.component';
import { ListService } from './list/list.service';
import { ListOfSongsComponent } from './list/list/list.component';
import { ArtistDeleteComponent } from './artist/artist-delete/artist-delete.component';
import { ArtistEditComponent } from './artist/artist-edit/artist-edit.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AboutComponent,
    SongListComponent,
    SongDetailComponent,
    UserDetail,
    ListComponent,
    UserEditComponent,
    UserDeleteComponent,
    SongEditComponent,
    SongDeleteComponent,
    LoginComponent,
    RegisterComponent,
    ArtistInfoComponent,
    ListComponent,
    ListOfSongsComponent,
    ListEditComponent,
    ListDetailComponent,
    ListDeleteComponent,
    ArtistDeleteComponent,
    ArtistDeleteComponent,
    ArtistEditComponent,
  ],
  providers: [
    UserService,
    SongService,
    AuthService,
    ArtistService,
    ListService,
  ],
  exports: [
    UserDetail,
    ListComponent,
    AboutComponent,
    SongListComponent,
    SongDetailComponent,
    UserEditComponent,
    UserDeleteComponent,
    ArtistInfoComponent,
    ListOfSongsComponent,
    ListEditComponent,
    ListDetailComponent,
    ListDeleteComponent,
  ],
})
export class FeaturesModule {}
