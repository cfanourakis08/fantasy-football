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
  availablePlayers: Array<Player> = this.draft.availablePlayerDataList.sort(this.draft.adpSort);

  constructor(private appComponent: AppComponent,
              public draft: DraftLogicService) { }

  ngOnInit(): void {
    let availablePlayersList = localStorage.getItem('availablePlayers');
    if (availablePlayersList) {
      this.availablePlayers = JSON.parse(availablePlayersList);
      console.log(this.availablePlayers);
      this.availablePlayers.sort(this.draft.adpSort);
    }
  }

}
