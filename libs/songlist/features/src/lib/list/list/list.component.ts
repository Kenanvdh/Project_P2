import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListService } from '../list.service';
import { IList } from '@indivproj-p2/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'indivproj-p2-song-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListOfSongsComponent implements OnInit, OnDestroy {
  listId: string | null = null;
  lists: IList[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.subscription = this.listService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.lists = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
