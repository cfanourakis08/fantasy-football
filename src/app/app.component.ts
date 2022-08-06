import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AvailablePlayersComponent } from './draft/available-players/available-players.component';
import { DraftBoardComponent } from './draft/draft-board/draft-board.component';
import { Player } from './models/player.model';
import { Team } from './models/team.model';
import { DraftBoardService } from './services/draft-board.service';
import { DraftLogicService } from './services/draft-logic.service';
import { ExcelService } from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private excelService: ExcelService,
              private draft: DraftLogicService,
              private draftBoard: DraftBoardService,
              private route: Router) { }

  async ngOnInit() {
    if (localStorage.getItem('currentPick')) {
      this.pullFromLocalStorage();
      this.createPositionList();
      this.route.navigate(['draft']);
    }
    else {
      this.draft.availablePlayerDataList = await this.excelService.getFileContents();
      this.draft.availablePlayerDataList.sort(this.draft.adpSort);
      this.createPositionList();
      this.route.navigate(['pre-draft']);
    }
  }

  private pullFromLocalStorage() {
    let availablePlayersList = localStorage.getItem('availablePlayers');
    if (availablePlayersList) {
      this.draft.availablePlayerDataList = JSON.parse(availablePlayersList);
      this.draft.availablePlayerDataList.sort(this.draft.adpSort);
    }

    let localDraftBoard = localStorage.getItem('draftBoard');
    if (localDraftBoard) {
      this.draftBoard.draftBoard = JSON.parse(localDraftBoard);
    }

    let teamDetails = localStorage.getItem('teamDetails');
    if (teamDetails) {
      let a = teamDetails.slice(0, -1);
      let b = `[${a}]`
      console.log(JSON.parse(b));
      this.draftBoard.teamDetails = JSON.parse(b) as Array<Team>;
    }
  }

  private createPositionList() {
    this.createQbList();
    this.createRbList();
    this.createWrList();
    this.createTeList();
    this.createDstList();
    this.createKList();
  }

  private createQbList() {
    this.draft.qbPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'QB';
    })
  }

  private createRbList() {
    this.draft.rbPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'RB';
    })
  }

  private createWrList() {
    this.draft.wrPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'WR';
    })
  }

  private createTeList() {
    this.draft.tePlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'TE';
    })
  }

  private createDstList() {
    this.draft.dstPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'DST';
    });

    this.draft.dstPlayerDataList.forEach(row => {
      row.adp = 141;
    })
  }

  private createKList() {
    this.draft.kPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'K';
    })

    this.draft.kPlayerDataList.forEach(row => {
      if (row.adp.toString() == 'NaN') {
        row.adp = 141;
      }
    })
  }

  private starterSort(a: any, b: any) {
    if ( a.starterValue < b.starterValue ){
      return 1;
    }
    if ( a.starterValue > b.starterValue ){
      return -1;
    }
    return 0;
  }

  private benchSort(a: any, b: any) {
    if ( a.benchValue < b.benchValue ){
      return 1;
    }
    if ( a.benchValue > b.benchValue ){
      return -1;
    }
    return 0;
  }
}
