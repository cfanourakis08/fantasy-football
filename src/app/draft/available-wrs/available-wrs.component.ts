import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Player } from 'src/app/models/player.model';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-available-wrs',
  templateUrl: './available-wrs.component.html',
  styleUrls: ['./available-wrs.component.css']
})
export class AvailableWrsComponent implements OnInit {

  wrList: Array<Player> = this.draft.wrPlayerDataList.sort(this.draft.adpSort);

  constructor(private appComponent: AppComponent,
              public draft: DraftLogicService) { }

  ngOnInit(): void {
    let availableTeList = localStorage.getItem('wrList');
    if (availableTeList) {
      this.wrList = JSON.parse(availableTeList);
      this.wrList.sort(this.draft.adpSort);
    }
  }

}
