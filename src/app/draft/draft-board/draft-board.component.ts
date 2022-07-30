import { Component, OnInit } from '@angular/core';
import { DraftPick } from 'src/app/models/draftboard.model';
import { Player } from 'src/app/models/player.model';
import { DraftBoardService } from 'src/app/services/draft-board.service';

@Component({
  selector: 'app-draft-board',
  templateUrl: './draft-board.component.html',
  styleUrls: ['./draft-board.component.css']
})
export class DraftBoardComponent implements OnInit {
  draftBoard: Array<DraftPick> = [];
  
  constructor(private service: DraftBoardService) { }

  ngOnInit(): void {
    this.draftBoard = this.service.draftBoard;
  }

}
