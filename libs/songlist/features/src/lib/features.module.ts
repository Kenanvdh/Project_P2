import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SongListComponent, SongDetailComponent],
})
export class FeaturesModule {}
