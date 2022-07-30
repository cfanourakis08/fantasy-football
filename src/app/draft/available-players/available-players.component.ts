import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Player } from 'src/app/models/player.model';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-available-players',
  templateUrl: './available-players.component.html',
  styleUrls: ['./available-players.component.css']
})
export class AvailablePlayersComponent implements OnInit {
  availablePlayers: Array<Player> = this.draft.availablePlayerDataList.sort(this.adpSort);

  constructor(private appComponent: AppComponent,
              private draft: DraftLogicService) { }

  ngOnInit(): void {
    
  }

  private adpSort(a: any, b: any) {
    if ( a.adp > b.adp ){
      return 1;
    }
    if ( a.adp < b.adp ){
      return -1;
    }
    return 0;
  }

}
