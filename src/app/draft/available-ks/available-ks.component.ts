import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Player } from 'src/app/models/player.model';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-available-ks',
  templateUrl: './available-ks.component.html',
  styleUrls: ['./available-ks.component.css']
})
export class AvailableKsComponent implements OnInit {

  kList: Array<Player> = this.draft.kPlayerDataList.sort(this.draft.adpSort);

  constructor(private appComponent: AppComponent,
              private draft: DraftLogicService) { }

  ngOnInit(): void {
    let availableKList = localStorage.getItem('kList');
    if (availableKList) {
      this.kList = JSON.parse(availableKList);
      this.kList.sort(this.draft.adpSort);
    }
  }

}
