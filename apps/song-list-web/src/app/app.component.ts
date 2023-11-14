import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FeaturesModule } from '@indivproj-p2/songlist/features';
import { UiModule } from '@indivproj-p2/ui';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FeaturesModule, UiModule],
  selector: 'indivproj-p2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'song-list-web';
}
