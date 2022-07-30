import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AvailablePlayersComponent } from './draft/available-players/available-players.component';
import { Player } from './models/player.model';
import { DraftLogicService } from './services/draft-logic.service';
import { ExcelService } from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private excelService: ExcelService,
              private draft: DraftLogicService,
              private route: Router) { }

  async ngOnInit() {
    this.draft.availablePlayerDataList = await this.excelService.getFileContents();
    this.createPositionList();
    this.route.navigate(['pre-draft']);
  }

  private createPositionList() {
    this.createQbList();
    this.createRbList();
    this.createWrList();
    this.createTeList();
    this.createDstList();
    this.createKList();
  }

  private createQbList() {
    this.draft.qbPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'QB';
    })
  }

  private createRbList() {
    this.draft.rbPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'RB';
    })
  }

  private createWrList() {
    this.draft.wrPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'WR';
    })
  }

  private createTeList() {
    this.draft.tePlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'TE';
    })
  }

  private createDstList() {
    this.draft.dstPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'DST';
    })
  }

  private createKList() {
    this.draft.kPlayerDataList = this.draft.availablePlayerDataList.filter(player => {
      return player.position == 'K';
    })
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
}
