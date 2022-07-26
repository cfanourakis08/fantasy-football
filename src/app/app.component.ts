import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from './models/player.model';
import { ExcelService } from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  allPlayerDataList: Array<Player> = [];
  qbPlayerDataList: Array<Player> = [];
  rbPlayerDataList: Array<Player> = [];
  wrPlayerDataList: Array<Player> = [];
  tePlayerDataList: Array<Player> = [];
  dstPlayerDataList: Array<Player> = [];
  kPlayerDataList: Array<Player> = [];

  constructor(private excelService: ExcelService,
              private route: Router) { }

  async ngOnInit() {
    this.allPlayerDataList = await this.excelService.getFileContents();
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
    this.qbPlayerDataList = this.allPlayerDataList.filter(player => {
      return player.position == 'QB';
    })
  }

  private createRbList() {
    this.rbPlayerDataList = this.allPlayerDataList.filter(player => {
      return player.position == 'RB';
    })
  }

  private createWrList() {
    this.wrPlayerDataList = this.allPlayerDataList.filter(player => {
      return player.position == 'WR';
    })
  }

  private createTeList() {
    this.tePlayerDataList = this.allPlayerDataList.filter(player => {
      return player.position == 'TE';
    })
  }

  private createDstList() {
    this.dstPlayerDataList = this.allPlayerDataList.filter(player => {
      return player.position == 'DST';
    })
  }

  private createKList() {
    this.kPlayerDataList = this.allPlayerDataList.filter(player => {
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
