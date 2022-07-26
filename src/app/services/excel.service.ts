import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Player } from '../models/player.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private appDataCsv = 'assets/fantasy-data.csv';
  private rawPlayerData: Array<any> = [];
  private headersIndexObj: any = {};

  constructor(private http: HttpClient) { }

  async getFileContents(): Promise<Array<Player>> {
    let data = await lastValueFrom(this.http.get(this.appDataCsv, {responseType: 'text'}))
    return this.createFinalPlayerList(data);
  }

  private createFinalPlayerList(data: string): Array<Player> {
    let playerRowArray = data.split('\r\n');
    let headers = playerRowArray[0].split(',');
    this.headersIndexObj = this.createHeadersObj(headers);
    this.rawPlayerData = this.createRawPlayerData(playerRowArray.splice(1));
    return this.createPlayerList();
  }

  private createHeadersObj(headers: Array<string>): any {
    let headersIndexObj: any = {}
    for (let i = 0; i < headers.length; i++) {
      let header = headers[i].toLowerCase().replace(' ', '_')
      headersIndexObj[header] = i
    }

    return headersIndexObj;
  }

  private createPlayerList(): Array<Player> {
    let playerDataList: Array<Player> = [];
    this.rawPlayerData.forEach(player => {
      playerDataList.push(this.createPlayer(player));
    })

    return playerDataList;
  }

  private createPlayer(player: any): Player {
    return {
      id: Number(player[this.headersIndexObj['id']]),
      name: player[this.headersIndexObj['player']],
      position: player[this.headersIndexObj['position']],
      adp: Number(player[this.headersIndexObj['adp']]),
      ceiling: Number(player[this.headersIndexObj['ceiling']]),
      floor: Number(player[this.headersIndexObj['floor']]),
      mean: Number(player[this.headersIndexObj['mean']]),
      team: player[this.headersIndexObj['team']],
      risk: Number(player[this.headersIndexObj['risk']]),
      starterValue: this.calculateStarter(player),
      benchValue: this.calculateBench(player)
    }
  }

  private calculateStarter(player: any): number {
    let mean = Number(player[this.headersIndexObj['mean']]);
    let floor = Number(player[this.headersIndexObj['floor']]);
    let risk = Number(player[this.headersIndexObj['risk']]);

    return ((mean + floor) / 2 ) * ((100 - risk) / 100);
  }

  private calculateBench(player: any): number {
    let mean = Number(player[this.headersIndexObj['mean']]);
    let ceiling = Number(player[this.headersIndexObj['ceiling']]);
    let risk = Number(player[this.headersIndexObj['risk']]);

    return ((mean + ceiling) / 2 ) * ((100 - risk) / 100);
  }

  private createRawPlayerData(data: Array<string>): Array<Array<any>> {
    let rawDataArray: Array<Array<any>> = [];

    data.forEach(row => {
      let rowDataArray = row.split(',');
      rawDataArray.push(rowDataArray);
    })

    return rawDataArray;
  }

}
