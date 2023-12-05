import { NgModule } from '@angular/core';
import { RouterModule, RouterLink, Routes } from '@angular/router';
import {
  ArtistDeleteComponent,
  ArtistEditComponent,
  SongListComponent,
} from '@indivproj-p2/songlist/features';
import { SongDetailComponent } from '@indivproj-p2/songlist/features';
import { ListComponent } from '@indivproj-p2/songlist/features';
import { UserDetail } from '@indivproj-p2/songlist/features';
import { UserEditComponent } from '@indivproj-p2/songlist/features';
import { UserDeleteComponent } from '@indivproj-p2/songlist/features';
import { AboutComponent } from '@indivproj-p2/songlist/features';
import { SongEditComponent } from '@indivproj-p2/songlist/features';
import { SongDeleteComponent } from '@indivproj-p2/songlist/features';
import { LoginComponent } from '@indivproj-p2/songlist/features';
import { RegisterComponent } from '@indivproj-p2/songlist/features';
import { ArtistInfoComponent } from '@indivproj-p2/songlist/features';
import { ListOfSongsComponent } from '@indivproj-p2/songlist/features';
import { ListDetailComponent } from '@indivproj-p2/songlist/features';
import { ListEditComponent } from '@indivproj-p2/songlist/features';
import { ListDeleteComponent } from '@indivproj-p2/songlist/features';

export const routes: Routes = [
  { path: 'list', pathMatch: 'full', component: ListOfSongsComponent },
  { path: 'list/create', pathMatch: 'full', component: ListEditComponent },
  { path: 'list/:id', pathMatch: 'full', component: ListDetailComponent },
  { path: 'list/add', pathMatch: 'full', component: ListEditComponent },
  { path: 'list/:id/edit', pathMatch: 'full', component: ListEditComponent },
  {
    path: 'list/:id/delete',
    pathMatch: 'full',
    component: ListDeleteComponent,
  },

  { path: 'songlist', pathMatch: 'full', component: SongListComponent },
  { path: 'song/create', pathMatch: 'full', component: SongEditComponent },
  { path: 'songlist/:id', pathMatch: 'full', component: SongDetailComponent },
  { path: 'song/:id/edit', pathMatch: 'full', component: SongEditComponent },
  {
    path: 'song/:id/delete',
    pathMatch: 'full',
    component: SongDeleteComponent,
  },

  { path: 'artists', pathMatch: 'full', component: ArtistInfoComponent },
  { path: 'artists/:id', pathMatch: 'full', component: ArtistInfoComponent },
  { path: 'artist/create', pathMatch: 'full', component: ArtistEditComponent },
  {
    path: 'artists/:id/edit',
    pathMatch: 'full',
    component: ArtistEditComponent,
  },
  {
    path: 'artists/:id/delete',
    pathMatch: 'full',
    component: ArtistDeleteComponent,
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

  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLink],
  exports: [RouterModule],
})
export class appRoutes {}
