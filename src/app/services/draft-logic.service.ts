import { Injectable } from '@angular/core';
import { BestChoicesComponent } from '../draft/best-choices/best-choices.component';
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
  qbMax = 1;
  rbMax = 2;
  wrMax = 1;
  teMax = 1;
  flexMax = 5;
  dstMax = 1;
  kMax = 1;

  bestPlayer: Player | undefined = {} as Player;
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
    localStorage.setItem('availablePlayers', JSON.stringify(this.availablePlayerDataList))

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

    localStorage.setItem('qbList', JSON.stringify(this.qbPlayerDataList));
    localStorage.setItem('rbList', JSON.stringify(this.rbPlayerDataList));
    localStorage.setItem('wrList', JSON.stringify(this.wrPlayerDataList));
    localStorage.setItem('teList', JSON.stringify(this.tePlayerDataList));
    localStorage.setItem('dstList', JSON.stringify(this.dstPlayerDataList));
    localStorage.setItem('kList', JSON.stringify(this.kPlayerDataList));
  }

  private splicePlayer(removedPlayer: Player, positionList: Array<Player>): void {
    const index = positionList.findIndex(player => {
      return player.id == removedPlayer.id;
    });
    positionList.splice(index, 1);
  }

  calculateBestChoice(currentPick: number, round: number): void {
    this.getPlayersByPosition(currentPick);
    this.calcVORByPosition(round, currentPick);
    this.bestPlayer = this.findBestPlayer(round);
  }

  private getPlayersByPosition(currentPick: number): void {
    let index = this.getTeamIndex();
    let nextDraftPick = this.getMyNextPick(currentPick, index);
    this.teamCount = this.draftBoard.teamDetails.length;
    let eligiblePlayers = this.getPlayersByAdp(nextDraftPick, this.teamCount, currentPick);
    this.filterPlayersByPosition(eligiblePlayers)
  }

  private calcVORByPosition(round: number, currentPick: number): void {
    this.sortPositions(round);
    this.calculateVOR(round, currentPick);
  }

  private findBestPlayer(round: number): Player | undefined {
    if (round <= 7 || this.teamTotalPlayers()) {
      return this.findBestStarter(round).sort(this.vorSort)[0];
    }

    return this.findBestBencher().sort(this.vorSort)[0];
  }

  private teamTotalPlayers(): boolean {
    let teamIndex = this.getTeamIndex();
    let totalPicks = this.draftBoard.draftBoard.length / this.draftBoard.teamDetails.length;
    let remainingPicks = this.draftBoard.teamDetails[teamIndex].picks.length;
    return totalPicks - remainingPicks == 7;
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
    if (currentIndex >= this.draftBoard.teamDetails[index].picks.length) {
      return this.availablePlayerDataList.length;
    }

    return this.draftBoard.teamDetails[index].picks[currentIndex]
  }

  private getPlayersByAdp(nextAdp: number, teamCount: number, currentPick: number): Array<Player> {
    let filteredList = this.availablePlayerDataList.filter(player => {
      return player.adp < nextAdp;
    })

    if (filteredList.length < (nextAdp - currentPick)) {
      return this.availablePlayerDataList.sort(this.adpSort).slice(0, nextAdp - currentPick);
    }

    return filteredList;
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
    if (a.starterValue < b.starterValue) {
      return 1;
    }
    if (a.starterValue > b.starterValue) {
      return -1;
    }
    return 0;
  }

  private benchSort(a: any, b: any) {
    if (a.benchValue < b.benchValue) {
      return 1;
    }
    if (a.benchValue > b.benchValue) {
      return -1;
    }
    return 0;
  }

  vorSort(a: any, b: any) {
    if (a.vor < b.vor) {
      return 1;
    }
    if (a.vor > b.vor) {
      return -1;
    }
    return 0;
  }

  adpSort(a: any, b: any) {
    if ( a.adp > b.adp ){
      return 1;
    }
    if ( a.adp < b.adp ){
      return -1;
    }
    return 0;
  }

  private calculateVOR(round: number, currentPick: number): void {
    let teamIndex = this.getTeamIndex();
    let team = this.draftBoard.teamDetails[teamIndex];
    if (this.qbList.length > 0) {
      this.qbList = this.findVORRate(currentPick, round, this.qbList, team.qbList?.length ?? 0);
    }
    if (this.rbList.length > 0) {
      this.rbList = this.findVORRate(currentPick, round, this.rbList, team.rbList?.length ?? 0);
    }
    if (this.wrList.length > 0) {
      this.wrList = this.findVORRate(currentPick, round, this.wrList, team.wrList?.length ?? 0);
    }
    if (this.teList.length > 0) {
      this.teList = this.findVORRate(currentPick, round, this.teList, team.teList?.length ?? 0);
    }
    if (this.dstList.length > 0) {
      this.dstList = this.findVORRate(currentPick, round, this.dstList, team.dstList?.length ?? 0);
    }
    if (this.kList.length > 0) {
      this.kList = this.findVORRate(currentPick, round, this.kList, team.kList?.length ?? 0);
    }
  }

  private findVORRate(currentPick: number, round: number, playerList: Array<Player>, teamPositionSize: number = 0): Array<Player> {
    let index = this.getTeamIndex();
    let nextDraftPick = this.getMyNextPick(currentPick, index);
    const listIndex = Math.min(playerList.length - 1, nextDraftPick - currentPick + 2)
    playerList.forEach(player => {
      if (round <= 7 || teamPositionSize == 0) {

        const baseline = playerList[listIndex].starterValue;
        return player.vor = player.starterValue / baseline;
      }
      else {
        const baseline = playerList[listIndex].benchValue;
        return player.vor = player.benchValue / baseline;
      }

    });

    return playerList;
  }

  private buildPositionObject(): any {
    let index = this.getTeamIndex();

    const currentQb = this.draftBoard.teamDetails[index].qbList?.length ?? 0;
    const currentRb = this.draftBoard.teamDetails[index].rbList?.length ?? 0;
    const currentWr = this.draftBoard.teamDetails[index].wrList?.length ?? 0;
    const currentTe = this.draftBoard.teamDetails[index].teList?.length ?? 0;
    const currentFlex = currentRb + currentWr

    return {
      qb: {
        size: currentQb,
        players: this.qbList
      },
      rb: {
        size: currentRb,
        players: this.rbList
      },
      wr: {
        size: currentWr,
        players: this.wrList
      },
      te: {
        size: currentTe,
        players: this.teList
      },
      flex: {
        size: currentFlex
      }
    }
  }

  private findBestStarter(round: number): Array<Player | undefined> {
    let obj = this.buildPositionObject()
    let positionArray: Array<Player | undefined> = [];

    if (obj.rb.size < this.rbMax && obj.flex.size < this.flexMax) positionArray.push(this.teamCorrelationHandler(this.rbList));
    if (obj.wr.size < this.wrMax && obj.flex.size < this.flexMax) positionArray.push(this.teamCorrelationHandler(this.wrList));
    if (round > 3) {
      this.wrMax = 3;
      this.rbMax = 3;
      if (obj.qb.size < this.qbMax) positionArray.push(this.teamCorrelationHandler(this.qbList));
      if (obj.te.size < this.teMax) positionArray.push(this.teamCorrelationHandler(this.teList));
    }

    return positionArray
  }

  private teamCorrelationHandler(players: Array<Player>): Player | undefined {
    let index = this.getTeamIndex();
    const usedTeams = this.draftBoard.teamDetails[index].teams;
    if (!usedTeams) {
      return players[0];
    }

    for (let i = 0; i < players.length; i++) {
      if (!usedTeams.includes(players[i].team.toLowerCase())) {
        return players[i];
      }
    }

    return undefined;
  }

  private findBestBencher(): Array<Player | undefined> {
    let obj = this.buildPositionObject()
    let positionArray: Array<Player | undefined> = [];

    this.setBenchMaxes();

    if ((obj.qb?.size ?? 0) < this.qbMax) positionArray.push(this.qbList[0]);
    if ((obj.rb?.size ?? 0) < this.rbMax && (obj.flex?.size ?? 0) < this.flexMax) positionArray.push(this.rbList[0]);
    if ((obj.wr?.size ?? 0) < this.wrMax && (obj.flex?.size ?? 0) < this.flexMax) positionArray.push(this.wrList[0]);
    if ((obj.te?.size ?? 0) < this.teMax) positionArray.push(this.teList[0]);
    if ((obj.dst?.size ?? 0) < this.dstMax) positionArray.push(this.teamCorrelationHandler(this.dstList));
    if ((obj.k?.size ?? 0) < this.kMax) positionArray.push(this.teamCorrelationHandler(this.kList));

    return positionArray
  }

  private setBenchMaxes(): void {
    this.qbMax = 2;
    this.rbMax = 6;
    this.wrMax = 6;
    this.teMax = 2;
    this.dstMax = 1;
    this.kMax = 1;
    this.flexMax = 10;
  }

}
