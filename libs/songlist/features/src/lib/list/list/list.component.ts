import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListService } from '../list.service';
import { AuthService } from '../../auth/auth.service';
import { IList } from '@indivproj-p2/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'indivproj-p2-song-list',
  templateUrl: './list.component.html',
  styleUrls: [
    '../../user/user-list/user-list.component.css',
    './list.component.css',
  ],
})
export class ListOfSongsComponent implements OnInit, OnDestroy {
  listId: string | null = null;
  lists: IList[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private listService: ListService, private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.listService.list().subscribe((results) => {
      if (results !== null) { // Check if results is not null
        console.log(`All lists: ${results}`);
        this.authService.currentUser$.subscribe(user => {
          if (user) {
            console.log(`Logged in user: ${user.id}`);
            // Filter lists based on creatorId
            this.lists = results.filter(list => list.creatorId === user.id);
          } else {
            console.log('No user logged in');
            this.lists = [];
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
