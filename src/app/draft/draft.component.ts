import { Component, OnInit } from '@angular/core';
import { DraftBoardService } from '../services/draft-board.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  currentPick: number = 1;
  currentTeam: string = this.draftBoardService.draftBoard[0].teamName;

  constructor(private draftBoardService: DraftBoardService) { }

  ngOnInit(): void {
    console.log(this.draftBoardService.draftBoard)
  }

  updatePickHeader(): void {
    this.currentTeam = this.getCurrentTeam(this.currentPick);
    this.incrementPick();
  }

  private incrementPick(): void {
    this.currentPick += 1;
  }

  private getCurrentTeam(index: number): string {
    return this.draftBoardService.draftBoard[index].teamName;
  }

}
