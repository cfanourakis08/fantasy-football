import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { DraftBoardService } from './draft-board.service';

@Injectable({
  providedIn: 'root'
})
export class DraftLogicService {
  availablePlayerDataList: Array<Player> = [];
  qbPlayerDataList: Array<Player> = [];
  rbPlayerDataList: Array<Player> = [];
  wrPlayerDataList: Array<Player> = [];
  tePlayerDataList: Array<Player> = [];
  dstPlayerDataList: Array<Player> = [];
  kPlayerDataList: Array<Player> = [];

  private teamName = 'Fani Packers'
  private teamCount = 0;
  qbList: Array<Player> = [];
  rbList: Array<Player> = [];
  wrList: Array<Player> = [];
  teList: Array<Player> = [];
  dstList: Array<Player> = [];
  kList: Array<Player> = [];
  
  constructor(private draftBoard: DraftBoardService) { }

  removePlayer(removedPlayer: Player): void {
    const playerIndex = this.availablePlayerDataList.findIndex(player => {
      return player.id == removedPlayer.id;
    });
    this.availablePlayerDataList.splice(playerIndex, 1);

    this.removePlayerFromPositionList(removedPlayer);
  }

  private removePlayerFromPositionList(removedPlayer: Player): void {
    switch (removedPlayer.position.toLowerCase()) {
      case 'qb':
        this.splicePlayer(removedPlayer, this.qbPlayerDataList);
        break;
      case 'rb':
        this.splicePlayer(removedPlayer, this.rbPlayerDataList);
        break;
      case 'wr':
        this.splicePlayer(removedPlayer, this.wrPlayerDataList);
        break;
      case 'te':
        this.splicePlayer(removedPlayer, this.tePlayerDataList);
        break;
      case 'dst':
        this.splicePlayer(removedPlayer, this.dstPlayerDataList);
        break;
      case 'k':
        this.splicePlayer(removedPlayer, this.kPlayerDataList);
        break;
    }
  }

  private splicePlayer(removedPlayer: Player, positionList: Array<Player>): void {
    const index = positionList.findIndex(player => {
      return player.id == removedPlayer.id;
    });
    positionList.splice(index, 1);
  }

  calculateBestChoice(currentPick: number, round: number): void {
    this.getPlayersByPosition(currentPick);
    this.calcVORByPosition(round);
    // Position with the highest percentage will be drafted.

    // Ex) I'm 1st pick. Next pick will be 20th. 10 team draft. Grab all players with ADP values <= 29
  }

  private getPlayersByPosition(currentPick: number): void {
    let index = this.getTeamIndex();
    let nextDraftPick = this.getMyNextPick(currentPick, index);
    this.teamCount = this.draftBoard.teamDetails.length;
    let eligiblePlayers = this.getPlayersByAdp(nextDraftPick + this.teamCount);
    this.filterPlayersByPosition(eligiblePlayers)
  }

  private calcVORByPosition(round: number): void {
    this.sortPositions(round);
    if (round <= 7) {
      this.calculateStarterVOR();
    }
    else {
      this.calculateBenchVOR();
    }
  }

  private getTeamIndex(): number {
    return this.draftBoard.teamDetails.findIndex(team => {
      return team.name.toLowerCase() == this.teamName.toLowerCase();
    })
  }

  private getMyNextPick(currentPick: number, index: number): number {
    let currentIndex = this.draftBoard.teamDetails[index].picks.findIndex(pick => {
      return pick == currentPick
    });

    if (currentIndex != -1) {
      this.draftBoard.teamDetails[index].picks.splice(0, 1);
    }
    else {
      currentIndex = 0;
    }

    if (currentIndex > this.draftBoard.teamDetails[index].picks.length) {
      return this.draftBoard.draftBoard.length + 1;
    }

    return this.draftBoard.teamDetails[index].picks[currentIndex]
  }

  private getPlayersByAdp(adp: number): Array<Player> {
    return this.availablePlayerDataList.filter(player => {
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

  private calculateStarterVOR() {
    if (this.qbList.length > 0) {
      this.qbList[0].vor = this.findVORRate(Number(this.qbList[0].starterValue), Number(this.qbList[this.qbList.length - 1].starterValue));
    }
    if (this.rbList.length > 0) {
      this.rbList[0].vor = this.findVORRate(Number(this.rbList[0].starterValue), Number(this.rbList[this.rbList.length - 1].starterValue));
    }
    if (this.wrList.length > 0) {
      this.wrList[0].vor = this.findVORRate(Number(this.wrList[0].starterValue), Number(this.wrList[this.wrList.length - 1].starterValue));
    }
    if (this.teList.length > 0) {
      this.teList[0].vor = this.findVORRate(Number(this.teList[0].starterValue), Number(this.teList[this.teList.length - 1].starterValue));
    }
    if (this.dstList.length > 0) {
      this.dstList[0].vor = this.findVORRate(Number(this.dstList[0].starterValue), Number(this.dstList[this.dstList.length - 1].starterValue));
    }
    if (this.kList.length > 0) {
      this.kList[0].vor = this.findVORRate(Number(this.kList[0].starterValue), Number(this.kList[this.kList.length - 1].starterValue));
    }
  }

  private calculateBenchVOR() {
    if (this.qbList.length > 0) {
      this.qbList[0].vor = this.findVORRate(Number(this.qbList[0].benchValue), Number(this.qbList[this.qbList.length - 1].benchValue));
    }
    if (this.rbList.length > 0) {
      this.rbList[0].vor = this.findVORRate(Number(this.rbList[0].benchValue), Number(this.rbList[this.rbList.length - 1].benchValue));
    }
    if (this.wrList.length > 0) {
      this.wrList[0].vor = this.findVORRate(Number(this.wrList[0].benchValue), Number(this.wrList[this.wrList.length - 1].benchValue));
    }
    if (this.teList.length > 0) {
      this.teList[0].vor = this.findVORRate(Number(this.teList[0].benchValue), Number(this.teList[this.teList.length - 1].benchValue));
    }
    if (this.dstList.length > 0) {
      this.dstList[0].vor = this.findVORRate(Number(this.dstList[0].starterValue), Number(this.dstList[this.dstList.length - 1].starterValue));
    }
    if (this.kList.length > 0) {
      this.kList[0].vor = this.findVORRate(Number(this.kList[0].starterValue), Number(this.kList[this.kList.length - 1].starterValue));
    }
  }

  private findVORRate(bestVOR: number, worstVOR: number): number {
    return bestVOR / worstVOR;
  }

}
