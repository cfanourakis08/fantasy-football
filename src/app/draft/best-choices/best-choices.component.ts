import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { DraftBoardService } from 'src/app/services/draft-board.service';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-best-choices',
  templateUrl: './best-choices.component.html',
  styleUrls: ['./best-choices.component.css']
})
export class BestChoicesComponent implements OnInit {
  private teamName = 'Fani Packers'
  private teamCount = 0;
  qbList: Array<Player> = [];
  rbList: Array<Player> = [];
  wrList: Array<Player> = [];
  teList: Array<Player> = [];
  dstList: Array<Player> = [];
  kList: Array<Player> = [];

  constructor(private draftBoard: DraftBoardService,
              public draft: DraftLogicService) { }

  ngOnInit(): void {
    this.teamCount = this.draftBoard.teamDetails.length;
  }

}
