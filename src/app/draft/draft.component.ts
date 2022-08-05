import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model';
import { DraftBoardService } from '../services/draft-board.service';
import { DraftLogicService } from '../services/draft-logic.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  private _currentPick: number = 1;
  private _currentTeam: string = this.draftBoardService.draftBoard[0].teamName;
  showDraftBoard: boolean = true;
  showAvailablePlayers: boolean = false;
  showMyBestChoices: boolean = false;
  showQb: boolean = false;
  showRb: boolean = false;
  showWr: boolean = false;
  showTe: boolean = false;
  showDst: boolean = false;
  showK: boolean = false;
  showModal: boolean = false;

  form = new FormGroup({
    playerName: new FormControl()
  })

  constructor(public draftBoardService: DraftBoardService,
              private fb: FormBuilder,
              public draft: DraftLogicService) { 
                this.form = this.fb.group({
                  playerName: ['']
                })
              }

  ngOnInit(): void {
    this.pullFromLocalStorage();
    const round = Math.ceil(this.currentPick / this.draftBoardService.teamDetails.length)
    this.draft.calculateBestChoice(this.currentPick, round);
  }

  private pullFromLocalStorage() {
    let localCurrentPick = localStorage.getItem('currentPick');
    if (localCurrentPick) {
      this.currentPick = Number(localCurrentPick);
    }

    let localCurrentTeam = localStorage.getItem('currentTeam');
    if (localCurrentTeam) {
      this.currentTeam = localCurrentTeam;
    }
  }

  getRound(): number {
    return Math.ceil(this.currentPick / this.draftBoardService.teamDetails.length)
  }

  selectPlayer(): void {
    const player = this.getPlayerObject();
    this.addPlayer(player);
    this.draftBoardService.updateDraftBoard(this.currentPick - 1, player, this.currentTeam);
    this.draft.removePlayer(player);
    this.updatePickHeader()
    const round = Math.ceil(this.currentPick / this.draftBoardService.teamDetails.length);
    this.draft.calculateBestChoice(this.currentPick, round)
    this.resetPlayerSelect();
  }

  private getPlayerObject(): Player {
    const playerIndex = this.draft.availablePlayerDataList.findIndex(player => {
      return player.name == this.playerName
    });

    return this.draft.availablePlayerDataList[playerIndex];
  }

  private addPlayer(player: Player): void {
    let teamIndex = this.draftBoardService.teamDetails.findIndex(team => {
      return team.name == this.currentTeam
    });
    this.addByPosition(teamIndex, player);
  }

  private addByPosition(i: number, player: Player): void {
    if (this.draftBoardService.teamDetails[i].teams) {
      this.draftBoardService.teamDetails[i].teams?.push(player.team.toLowerCase());
    }
    else {
      this.draftBoardService.teamDetails[i].teams = [player.team.toLowerCase()];
    }
    switch(player.position.toLowerCase()) {
      case 'qb':
        if (this.draftBoardService.teamDetails[i].qbList) {
          this.draftBoardService.teamDetails[i].qbList?.push(player);
        }
        else {
          this.draftBoardService.teamDetails[i].qbList = [player];
        }
        break;
      case 'rb':
        if (this.draftBoardService.teamDetails[i].rbList) {
          this.draftBoardService.teamDetails[i].rbList?.push(player);
        }
        else {
          this.draftBoardService.teamDetails[i].rbList = [player];
        }
        break;
      case 'wr':
        if (this.draftBoardService.teamDetails[i].wrList) {
          this.draftBoardService.teamDetails[i].wrList?.push(player);
        }
        else {
          this.draftBoardService.teamDetails[i].wrList = [player];
        }
        break;
      case 'te':
        if (this.draftBoardService.teamDetails[i].teList) {
          this.draftBoardService.teamDetails[i].teList?.push(player);
        }
        else {
          this.draftBoardService.teamDetails[i].teList = [player];
        }
        break;
      case 'dst':
        if (this.draftBoardService.teamDetails[i].dstList) {
          this.draftBoardService.teamDetails[i].dstList?.push(player);
        }
        else {
          this.draftBoardService.teamDetails[i].dstList = [player];
        }
        break;
      case 'k':
        if (this.draftBoardService.teamDetails[i].kList) {
          this.draftBoardService.teamDetails[i].kList?.push(player);
        }
        else {
          this.draftBoardService.teamDetails[i].kList = [player];
        }
        break;
    }
    this.localStorageTeamDetails();
  }

  private localStorageTeamDetails(): void {
    let teamDetailsString = '';
    this.draftBoardService.teamDetails.forEach(team => {
      teamDetailsString += `${JSON.stringify(team)},`
    });
    teamDetailsString.slice(0, -1);
    localStorage.setItem('teamDetails', teamDetailsString);
  }

  private updatePickHeader(): void {
    this.currentTeam = this.getCurrentTeam(this.currentPick);
    this.incrementPick();
  }

  private resetPlayerSelect(): void {
    const element = document.getElementById('player') as HTMLInputElement;
    element.value = '';
  }

  navigateTab(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    const classList = element.classList;

    if (classList.contains('active')) {
      return;
    }
    else {
      this.findActiveTab();
      element.classList.add('active');
      this.changeActiveTab(id);
    }
  }

  private findActiveTab(): void {
    const elements = document.getElementsByClassName('active');
    elements[0]?.classList.remove('active');
  }

  private changeActiveTab(id: string): void {
    this.showDraftBoard = false;
    this.showAvailablePlayers = false;
    this.showMyBestChoices = false;
    this.showQb = false;
    this.showRb = false;
    this.showWr = false;
    this.showTe = false;
    this.showDst = false;
    this.showK = false;
    switch (id) {
      case 'draft-board':
        this.showDraftBoard = true;
        break;
      case 'remaining-players':
        this.showAvailablePlayers = true;
        break;
      case 'best-choices':
        this.showMyBestChoices = true;
        break;
      case 'qb':
        this.showQb = true;
        break;
      case 'rb':
        this.showRb = true;
        break;
      case 'wr':
        this.showWr = true;
        break;
      case 'te':
        this.showTe = true;
        break;
      case 'dst':
        this.showDst = true;
        break;
      case 'k':
        this.showK = true;
        break;
    }
  }

  private incrementPick(): void {
    this.currentPick += 1;
  }

  private getCurrentTeam(index: number): string {
    return this.draftBoardService.draftBoard[index].teamName;
  }

  get playerName() {
    return this.form.controls['playerName'].value
  }

  get currentPick() {
    return this._currentPick;
  }

  set currentPick(value: number) {
    this._currentPick = value;
    localStorage.setItem('currentPick', value.toString());
  }

  get currentTeam() {
    return this._currentTeam;
  }

  set currentTeam(value: string) {
    this._currentTeam = value;
    localStorage.setItem('currentTeam', value);
  }
}
