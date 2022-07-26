import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '../models/team.model';
import { DraftBoardService } from '../services/draft-board.service';

@Component({
  selector: 'app-pre-draft-form',
  templateUrl: './pre-draft-form.component.html',
  styleUrls: ['./pre-draft-form.component.css']
})
export class PreDraftFormComponent implements OnInit {
  calculate: boolean = false;
  submit: boolean = false;
  teamCountArray: Array<number> = [];

  form = new FormGroup({
    roundCount: new FormControl(),
    teamCount: new FormControl()
  })

  constructor(private fb: FormBuilder,
              private draftBoardService: DraftBoardService,
              private route: Router) {
    this.form = this.fb.group({
      roundCount: ['', [Validators.required]],
      teamCount: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onBuildList() {
    this.teamCountArray = this.createTeamCount();
    this.calculate = true;
  }

  createDraft() {
    let userList: Array<Team> = [];
    for (let i = 1; i <= this.teamCount; i++) {
      let teamName = this.getTeamName(i);
      let draftPicks = this.getTeamPicks(i);
      userList.push({
        name: teamName,
        picks: draftPicks
      });
    }

    this.draftBoardService.createDraftBoard(userList, this.roundCount);
    this.route.navigate(['/draft']);
  }

  private getTeamName(i: number): string {
    const element = document.getElementById(`team-${i}`) as HTMLInputElement
    return element.value;
  } 

  private getTeamPicks(pick: number): Array<number> {
    let total = 0;
    let pickArray: Array<number> = [];
    for (let i = 0; i < this.roundCount; i++) {
      if (i % 2 == 0) {
        let overallPick = (i * this.teamCount) + pick
        pickArray.push(overallPick);
      }
      else {
        let overallPick = ((i + 1) * this.teamCount) - (pick - 1);
        pickArray.push(overallPick);
      }
    }

    return pickArray;
  }

  private setupTeam() {
  }

  private createTeamCount(): Array<number> {
    return Array(this.teamCount).fill(0).map((x,i)=>i);
  }

  get roundCount() {
    return Number(this.form.controls['roundCount'].value);
  }

  get teamCount() {
    return Number(this.form.controls['teamCount'].value);
  }
}
