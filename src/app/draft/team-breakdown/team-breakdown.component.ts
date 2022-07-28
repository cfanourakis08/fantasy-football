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
  qbListLength: number = 0;
  rbListLength: number = 0;
  wrListLength: number = 0;
  teListLength: number = 0;
  dstListLength: number = 0;
  kListLength: number = 0;

  form = new FormGroup({
    team: new FormControl()
  })

  constructor(private draftBoardService: DraftBoardService,
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

  getPositionLength(): void {
    const teamInfo = this.getTeamInfo();
    this.qbListLength = teamInfo?.qbList?.length || 0;
    this.rbListLength = teamInfo?.rbList?.length || 0;
    this.wrListLength = teamInfo?.wrList?.length || 0;
    this.teListLength = teamInfo?.teList?.length || 0;
    this.dstListLength = teamInfo?.dstList?.length || 0;
    this.kListLength = teamInfo?.kList?.length || 0;
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