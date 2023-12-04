import { Component } from '@angular/core';
import { IList } from '@indivproj-p2/shared/api';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'indivproj-p2-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['../../song/song-list/song-list.component.css'],
})
export class ListDetailComponent {  
  listId: string | null = null;
  lists: IList | null = null;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    console.log('ListDetail.ngOnInit()');

    this.route.paramMap.subscribe((params) => {
      this.listId = params.get('id');

      this.listService.read(this.listId).subscribe((observable) => this.lists = observable);
    });
  }}
