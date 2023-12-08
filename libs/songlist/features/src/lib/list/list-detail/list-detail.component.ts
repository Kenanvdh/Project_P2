import { Component } from '@angular/core';
import { IList } from '@indivproj-p2/shared/api';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'indivproj-p2-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['../../song/song-list/song-list.component.css'],
})
export class ListDetailComponent {
  listId: string | null = null;
  list = {} as IList;
  showButton: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.listService.read(this.listId).subscribe((list) => {
      this.list = list;
      this.showButton = this.isCurrentCreator() || this.isAdministrator();
    });
  }
  
  isCurrentCreator(): boolean {
    const creatorId = this.list?.creatorId;
    return this.authService.currentUser$.value?.id === creatorId;
  }

  isAdministrator(): boolean {
    return this.authService.currentUser$.value?.role === 'admin';
  }
}
