import { Injectable } from '@angular/core';
import { DraftPick } from '../models/draftboard.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class DraftBoardService {
  draftBoard: Array<DraftPick> = [];

  constructor() { }

  draftPlayer(draftPick: DraftPick) {
    let pickIndex = draftPick.pick - 1;
    this.draftBoard[pickIndex] = draftPick;
  }

  createDraftBoard(userList: Array<Team>, roundCount: number) {
    this.draftBoard = Array(userList.length * roundCount);
    userList.forEach(user => {
      user.picks.forEach(pick => {
        let pickIndex = pick - 1;
        this.draftBoard[pickIndex] = this.extractTeamInfo(user, pick);
      })
    });

    console.log(this.draftBoard);
  }

  private extractTeamInfo(user: Team, pick: number): DraftPick {
    return {
      pick,
      teamName: user.name
    }
  }
}
