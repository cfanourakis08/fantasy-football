import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Player } from 'src/app/models/player.model';
import { DraftLogicService } from 'src/app/services/draft-logic.service';

@Component({
  selector: 'app-available-rbs',
  templateUrl: './available-rbs.component.html',
  styleUrls: ['./available-rbs.component.css']
})
export class AvailableRbsComponent implements OnInit {

  rbList: Array<Player> = this.draft.rbPlayerDataList.sort(this.draft.adpSort);

  constructor(private appComponent: AppComponent,
              public draft: DraftLogicService) { }

  ngOnInit(): void {
    let availableRbList = localStorage.getItem('rbList');
    if (availableRbList) {
      this.rbList = JSON.parse(availableRbList);
      this.rbList.sort(this.draft.adpSort);
    }
  }

}
