import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Player } from 'src/app/models/player.model';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-available-tes',
  templateUrl: './available-tes.component.html',
  styleUrls: ['./available-tes.component.css']
})
export class AvailableTesComponent implements OnInit {

  teList: Array<Player> = this.draft.tePlayerDataList.sort(this.draft.adpSort);

  constructor(private appComponent: AppComponent,
              public draft: DraftLogicService) { }

  ngOnInit(): void {
    let availableTeList = localStorage.getItem('teList');
    if (availableTeList) {
      this.teList = JSON.parse(availableTeList);
      this.teList.sort(this.draft.adpSort);
    }
  }

}
