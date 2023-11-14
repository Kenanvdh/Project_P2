import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { FeaturesModule } from '@indivproj-p2/songlist/features';
import { UiModule } from '@indivproj-p2/ui';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, FeaturesModule, UiModule ],
  selector: 'indivproj-p2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'song-list-web';
}
