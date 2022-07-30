import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/models/player.model';
import { Team } from 'src/app/models/team.model';
import { DraftBoardService } from 'src/app/services/draft-board.service';

@Component({
  selector: 'app-team-breakdown',
  templateUrl: './team-breakdown.component.html',
  styleUrls: ['./team-breakdown.component.css']
})
export class TeamBreakdownComponent implements OnInit {
  index: number = 0;

  form = new FormGroup({
    team: new FormControl()
  })

  constructor(public draftBoardService: DraftBoardService,
              private fb: FormBuilder) { 
                this.form = this.fb.group({
                  team: ['', [Validators.required]]
                })
              }

  ngOnInit(): void {
  }

  getTeamList(): Array<Team> {
    return this.draftBoardService.teamDetails
  }

  getTeamIndex(): void {
    this.index = this.draftBoardService.teamDetails.findIndex(team => {
      return team.name == this.team
    });
  }

  private getTeamInfo(): Team {
    let index = this.draftBoardService.teamDetails.findIndex(team => {
      return team.name == this.team
    });

    return this.draftBoardService.teamDetails[index]
  }

  get team() {
    return this.form.controls['team'].value;
  }

}
