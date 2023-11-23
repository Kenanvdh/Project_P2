import { NgModule } from '@angular/core';
import { RouterModule, RouterLink, Routes } from '@angular/router';
import { SongListComponent } from 'libs/songlist/features/src/lib/song/song-list/song-list.component';
import { SongDetailComponent } from 'libs/songlist/features/src/lib/song/song-detail/song-detail.component';
import { ListComponent } from 'libs/songlist/features/src/lib/user/user-list/user-list.component';
import { UserDetail } from 'libs/songlist/features/src/lib/user/user-detail/user-detail.component';
import { UserEditComponent } from 'libs/songlist/features/src/lib/user/user-edit/user-edit.component';
import { UserDeleteComponent } from 'libs/songlist/features/src/lib/user/user-delete/user-delete.component';
import { AboutComponent } from 'libs/songlist/features/src/lib/about/about.component';
import { SongEditComponent } from 'libs/songlist/features/src/lib/song/song-edit/song-edit.component';
import { SongDeleteComponent } from 'libs/songlist/features/src/lib/song/song-delete/song-delete.component';
import { LoginComponent } from 'libs/songlist/features/src/lib/auth/login/login.component';
import { RegisterComponent } from 'libs/songlist/features/src/lib/auth/register/register.component';
import { ArtistInfoComponent } from 'libs/songlist/features/src/lib/artist/artist-info/artist-info.component';

export const routes: Routes = [
  { path: 'songlist', pathMatch: 'full', component: SongListComponent },
  { path: 'song/create', pathMatch: 'full', component: SongEditComponent },
  { path: 'songlist/:id', pathMatch: 'full', component: SongDetailComponent },
  {
    path: 'song/:id/artist',
    pathMatch: 'full',
    component: ArtistInfoComponent,
  },
  { path: 'song/:id/edit', pathMatch: 'full', component: SongEditComponent },
  {
    path: 'song/:id/delete',
    pathMatch: 'full',
    component: SongDeleteComponent,
  },

  { path: 'about', pathMatch: 'full', component: AboutComponent },

  { path: 'users', pathMatch: 'full', component: ListComponent },
  { path: 'user/create', pathMatch: 'full', component: UserEditComponent },
  { path: 'users/:id', pathMatch: 'full', component: UserDetail },
  { path: 'users/:id/edit', pathMatch: 'full', component: UserEditComponent },
  {
    path: 'users/:id/delete',
    pathMatch: 'full',
    component: UserDeleteComponent,
  },

  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },

  { path: '**', redirectTo: 'songlist' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLink],
  exports: [RouterModule],
})
export class appRoutes {}
