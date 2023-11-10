import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { SongService } from './song/song.service';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [SongListComponent, SongDetailComponent, AboutComponent],
  providers: [SongService],
  exports: [SongListComponent, SongDetailComponent, AboutComponent],
})
export class FeaturesModule {}
