import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { FeaturesModule } from '@indivproj-p2/songlist/features';
import { UiModule } from '@indivproj-p2/ui';
import { HttpClientModule } from '@angular/common/http'; 
import { SongService } from 'libs/songlist/features/src/lib/song/song.service';
import { UserService } from 'libs/songlist/features/src/lib/user/user.service';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, FeaturesModule, UiModule, HttpClientModule ],
  selector: 'indivproj-p2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SongService, UserService]
})
export class AppComponent {
  title = 'song-list-web';
  imagePath?: string;
  constructor() {
    this.imagePath = 'assets/Erd.png';
  }
}
