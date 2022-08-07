import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Player } from 'src/app/models/player.model';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-available-qbs',
  templateUrl: './available-qbs.component.html',
  styleUrls: ['./available-qbs.component.css']
})
export class AvailableQbsComponent implements OnInit {

  qbList: Array<Player> = this.draft.qbPlayerDataList.sort(this.draft.adpSort);

  constructor(private appComponent: AppComponent,
              public draft: DraftLogicService) { }

  ngOnInit(): void {
    let availableQbList = localStorage.getItem('qbList');
    if (availableQbList) {
      this.qbList = JSON.parse(availableQbList);
      this.qbList.sort(this.draft.adpSort);
    }
  }

}
