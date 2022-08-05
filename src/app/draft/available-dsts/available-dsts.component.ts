import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Player } from 'src/app/models/player.model';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-available-dsts',
  templateUrl: './available-dsts.component.html',
  styleUrls: ['./available-dsts.component.css']
})
export class AvailableDstsComponent implements OnInit {

  dstList: Array<Player> = this.draft.dstPlayerDataList.sort(this.draft.adpSort);

  constructor(private appComponent: AppComponent,
              private draft: DraftLogicService) { }

  ngOnInit(): void {
    let availableDstList = localStorage.getItem('dstList');
    if (availableDstList) {
      this.dstList = JSON.parse(availableDstList);
      this.dstList.sort(this.draft.adpSort);
    }
  }

}
