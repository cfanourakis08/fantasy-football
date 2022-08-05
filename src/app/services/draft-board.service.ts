import { Injectable } from '@angular/core';
import { DraftPick } from '../models/draftboard.model';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class DraftBoardService {
  private _draftBoard: Array<DraftPick> = [];
  teamDetails: Array<Team> = [];

  constructor() { }

  draftPlayer(draftPick: DraftPick) {
    let pickIndex = draftPick.pick - 1;
    this._draftBoard[pickIndex] = draftPick;
  }

  createDraftBoard(userList: Array<Team>, roundCount: number) {
    this._draftBoard = Array(userList.length * roundCount);
    this.teamDetails = userList;
    userList.forEach(user => {
      user.picks.forEach(pick => {
        let pickIndex = pick - 1;
        this._draftBoard[pickIndex] = this.extractTeamInfo(user, pick);
      })
    });
  }

  updateDraftBoard(i: number, player: Player, userName: string): void {
    this._draftBoard[i].playerId = player.id.toString();
    this._draftBoard[i].playerName = player.name;
    this._draftBoard[i].playerTeam = player.team;
    this._draftBoard[i].position = player.position;
    this._draftBoard[i].teamName = userName;

    localStorage.setItem('draftBoard', JSON.stringify(this._draftBoard));
  }

  private extractTeamInfo(user: Team, pick: number): DraftPick {
    return {
      pick,
      teamName: user.name
    }
  }

  get draftBoard(): Array<DraftPick> {
    return this._draftBoard;
  }

  set draftBoard(value: any) {
    this._draftBoard = value;
  }
}
