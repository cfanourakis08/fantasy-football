import { Injectable } from '@angular/core';
import { DraftPick } from '../models/draftboard.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class DraftBoardService {
  private _draftBoard: Array<DraftPick> = [];
  private _teamDetails: Array<Team> = [];

  constructor() { }

  draftPlayer(draftPick: DraftPick) {
    let pickIndex = draftPick.pick - 1;
    this._draftBoard[pickIndex] = draftPick;
  }

  createDraftBoard(userList: Array<Team>, roundCount: number) {
    this._draftBoard = Array(userList.length * roundCount);
    this._teamDetails = userList;
    userList.forEach(user => {
      user.picks.forEach(pick => {
        let pickIndex = pick - 1;
        this._draftBoard[pickIndex] = this.extractTeamInfo(user, pick);
      })
    });
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
  
  get teamDetails(): Array<Team> {
    return this._teamDetails;
  }
}
