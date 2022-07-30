import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Player } from '../models/player.model';
import { DraftBoardService } from '../services/draft-board.service';
import { DraftLogicService } from '../services/draft-logic.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  currentPick: number = 1;
  currentTeam: string = this.draftBoardService.draftBoard[0].teamName;
  showDraftBoard: boolean = true;
  showAvailablePlayers: boolean = false;
  showMyBestChoices: boolean = false;
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
    const round = Math.ceil(this.currentPick / this.draftBoardService.teamDetails.length)
    this.draft.calculateBestChoice(this.currentPick, round);
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
  }

  private updatePickHeader(): void {
    this.currentTeam = this.getCurrentTeam(this.currentPick);
    this.incrementPick();
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
    switch (id) {
      case 'draft-board':
        this.showDraftBoard = true;
        this.showAvailablePlayers = false;
        this.showMyBestChoices = false;
        break;
      case 'remaining-players':
        this.showDraftBoard = false;
        this.showAvailablePlayers = true;
        this.showMyBestChoices = false;
        break;
      case 'best-choices':
        this.showDraftBoard = false;
        this.showAvailablePlayers = false;
        this.showMyBestChoices = true;
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

}
