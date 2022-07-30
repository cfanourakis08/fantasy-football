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

  calculateBestChoice(currentPick: number, round: number): void {
    this.getPlayersByPosition(currentPick);
    this.calcVORByPosition(round);
  }

  private getPlayersByPosition(currentPick: number): void {
    let index = this.getTeamIndex();
    let nextDraftPick = this.getMyNextPick(currentPick, index);
    let eligiblePlayers = this.getPlayersByAdp(nextDraftPick + this.teamCount);
    this.filterPlayersByPosition(eligiblePlayers)
  }

  private calcVORByPosition(round: number): void {
    this.sortPositions(round);
    this.calculateVOR();
  }

  private getTeamIndex(): number {
    return this.draftBoard.teamDetails.findIndex(team => {
      team.name.toLowerCase() == this.teamName;
    })
  }

  private getMyNextPick(currentPick: number, index: number): number {
    let currentIndex = this.draftBoard.teamDetails[index].picks.findIndex(pick => {
      return pick == currentPick
    });

    if (currentIndex + 1 >= this.draftBoard.teamDetails[index].picks.length) {
      return this.draftBoard.draftBoard.length;
    }

    return this.draftBoard.teamDetails[index].picks[currentIndex + 1]
  }

  private getPlayersByAdp(adp: number): Array<Player> {
    return this.draft.availablePlayerDataList.filter(player => {
      return player.adp < adp
    })
  }

  private filterPlayersByPosition(players: Array<Player>): void {
    this.qbList = players.filter(player => {
      return player.position.toLowerCase() == 'qb';
    });
    this.rbList = players.filter(player => {
      return player.position.toLowerCase() == 'rb';
    });
    this.wrList = players.filter(player => {
      return player.position.toLowerCase() == 'wr';
    });
    this.teList = players.filter(player => {
      return player.position.toLowerCase() == 'te';
    });
    this.dstList = players.filter(player => {
      return player.position.toLowerCase() == 'dst';
    });
    this.kList = players.filter(player => {
      return player.position.toLowerCase() == 'k';
    });
  }

  private sortPositions(round: number) {
    type sorterFunction = (a: any, b: any) => number
    let sorter: sorterFunction
    if (round <= 7) {
      sorter = this.starterSort
    }
    else {
      sorter = this.benchSort
    }

    this.qbList.sort(sorter);
    this.rbList.sort(sorter);
    this.wrList.sort(sorter);
    this.teList.sort(sorter);
    this.dstList.sort(this.starterSort);
    this.kList.sort(this.starterSort);
  }

  adpSort(a: any, b: any) {
    if ( a.vor < b.vor ){
      return 1;
    }
    if ( a.vor > b.vor ){
      return -1;
    }
    return 0;
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

  private calculateVOR() {
    if (this.qbList.length > 0) {
      this.qbList[0].vor = this.findVORRate(Number(this.qbList[0].vor), Number(this.qbList[this.qbList.length - 1].vor));
    }
    if (this.rbList.length > 0) {
      this.rbList[0].vor = this.findVORRate(Number(this.rbList[0].vor), Number(this.rbList[this.rbList.length - 1].vor));
    }
    if (this.wrList.length > 0) {
      this.wrList[0].vor = this.findVORRate(Number(this.wrList[0].vor), Number(this.wrList[this.wrList.length - 1].vor));
    }
    if (this.teList.length > 0) {
      this.teList[0].vor = this.findVORRate(Number(this.teList[0].vor), Number(this.teList[this.teList.length - 1].vor));
    }
    if (this.dstList.length > 0) {
      this.dstList[0].vor = this.findVORRate(Number(this.dstList[0].vor), Number(this.dstList[this.dstList.length - 1].vor));
    }
    if (this.kList.length > 0) {
      this.kList[0].vor = this.findVORRate(Number(this.kList[0].vor), Number(this.kList[this.kList.length - 1].vor));
    }
  }

  private findVORRate(bestVOR: number, worstVOR: number): number {
    return bestVOR / worstVOR;
  }

}
