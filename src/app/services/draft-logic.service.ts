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
  qbStarterMax = 1;
  rbStarterMax = 3;
  wrStarterMax = 3;
  teStarterMax = 1;
  flexStarterMax = 5;
  dstStarterMax = 1;
  kStarterMax = 1;
  qbBenchMax = 2;
  rbBenchMax = 6;
  wrBenchMax = 6;
  teBenchMax = 2;
  flexBenchMax = 10;

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
    this.bestPlayer = this.findBestPlayer(round);
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
      this.calculateStarterVOR(round);
    }
    else {
      this.calculateBenchVOR(round);
    }
  }

  private findBestPlayer(round: number): Player | undefined {
    if (round <= 7) {
      return this.findBestStarter().sort(this.adpSort)[0];
    }
    
    return this.findBestBencher().sort(this.adpSort)[0];
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

  adpSort(a: any, b: any) {
    if ( a.vor < b.vor ){
      return 1;
    }
    if ( a.vor > b.vor ){
      return -1;
    }
    return 0;
  }

  // TODO - Need to refine this to handle for top at position not meeting the team correlation criteria.
  private calculateStarterVOR(round: number) {
    if (this.qbList.length > 0) {
      this.qbList = this.findVORRate(round, this.qbList);
    }
    if (this.rbList.length > 0) {
      this.rbList = this.findVORRate(round, this.rbList);
    }
    if (this.wrList.length > 0) {
      this.wrList = this.findVORRate(round, this.wrList);
    }
    if (this.teList.length > 0) {
      this.teList = this.findVORRate(round, this.teList);
    }
    if (this.dstList.length > 0) {
      this.dstList = this.findVORRate(round, this.dstList);
    }
    if (this.kList.length > 0) {
      this.kList = this.findVORRate(round, this.kList);
    }
  }

  private calculateBenchVOR(round: number) {
    if (this.qbList.length > 0) {
      this.qbList = this.findVORRate(round, this.qbList);
    }
    if (this.rbList.length > 0) {
      this.rbList = this.findVORRate(round, this.rbList);
    }
    if (this.wrList.length > 0) {
      this.wrList = this.findVORRate(round, this.wrList);
    }
    if (this.teList.length > 0) {
      this.teList = this.findVORRate(round, this.teList);
    }
    if (this.dstList.length > 0) {
      this.dstList = this.findVORRate(1, this.dstList);
    }
    if (this.kList.length > 0) {
      this.kList = this.findVORRate(1, this.kList);
    }
  }

  private findVORRate(round: number, playerList: Array<Player>): Array<Player> {
    
    playerList.forEach(player => {
      if (round <= 7) {
        const baseline = playerList[playerList.length -1].starterValue;
        return player.vor = player.starterValue / baseline;
      }
      else {
        const baseline = playerList[playerList.length -1].benchValue;
        return player.vor = player.benchValue / baseline;
      }
      
    });

    return playerList;
  }

  private findBestStarter(): Array<Player | undefined> {
    let index = this.getTeamIndex();

    const currentQb = this.draftBoard.teamDetails[index].qbList?.length ?? 0;
    const currentRb = this.draftBoard.teamDetails[index].rbList?.length ?? 0;
    const currentWr = this.draftBoard.teamDetails[index].wrList?.length ?? 0;
    const currentTe = this.draftBoard.teamDetails[index].teList?.length ?? 0;
    const currentFlex = currentRb + currentWr

    let positionArray: Array<Player | undefined> = [];
    let obj = {
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

    if (obj.qb.size < this.qbStarterMax) positionArray.push(this.teamCorrelationHandler(this.qbList));
    if (obj.rb.size < this.rbStarterMax && obj.flex.size < this.flexStarterMax) positionArray.push(this.teamCorrelationHandler(this.rbList));
    if (obj.wr.size < this.wrStarterMax && obj.flex.size < this.flexStarterMax) positionArray.push(this.teamCorrelationHandler(this.wrList));
    if (obj.te.size < this.teStarterMax) positionArray.push(this.teamCorrelationHandler(this.teList));

    return positionArray
  }

  private teamCorrelationHandler(players: Array<Player>): Player | undefined {
    let index = this.getTeamIndex();
    const usedTeams = this.draftBoard.teamDetails[index].teams;
    if (!usedTeams) {
      return players[0];
    }
    console.log(usedTeams);

    for (let i = 0; i < players.length; i++) {
      if (!usedTeams.includes(players[i].team.toLowerCase())) {
        return players[i];
      }
    }

    return undefined;
  }

  private findBestBencher(): Array<Player> {
    let index = this.getTeamIndex();

    const currentQb = this.draftBoard.teamDetails[index].qbList?.length ?? 0;
    const currentRb = this.draftBoard.teamDetails[index].rbList?.length ?? 0;
    const currentWr = this.draftBoard.teamDetails[index].wrList?.length ?? 0;
    const currentTe = this.draftBoard.teamDetails[index].teList?.length ?? 0;
    const currentFlex = currentRb + currentWr
    const currentDst = this.draftBoard.teamDetails[index].dstList?.length ?? 0;
    const currentK = this.draftBoard.teamDetails[index].kList?.length ?? 0;

    let positionArray: Array<Player> = [];
    let obj = {
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
      },
      dst: {
        size: currentDst,
        players: this.dstList
      },
      k: {
        size: currentK,
        players: this.kList
      }
    }

    if (obj.qb.size < this.qbBenchMax) positionArray.push(this.qbList[0]);
    if (obj.rb.size < this.rbBenchMax && obj.flex.size < this.flexBenchMax) positionArray.push(this.rbList[0]);
    if (obj.wr.size < this.wrBenchMax && obj.flex.size < this.flexBenchMax) positionArray.push(this.wrList[0]);
    if (obj.te.size < this.teBenchMax) positionArray.push(this.teList[0]);
    if (obj.dst.size < this.dstStarterMax) positionArray.push(this.dstList[0]);
    if (obj.k.size < this.kStarterMax) positionArray.push(this.kList[0]);

    return positionArray
  }

}
