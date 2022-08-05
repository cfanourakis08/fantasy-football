import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreDraftFormComponent } from './pre-draft-form/pre-draft-form.component';
import { DraftComponent } from './draft/draft.component';
import { DraftBoardComponent } from './draft/draft-board/draft-board.component';
import { AvailablePlayersComponent } from './draft/available-players/available-players.component';
import { TeamBreakdownComponent } from './draft/team-breakdown/team-breakdown.component';
import { BestChoicesComponent } from './draft/best-choices/best-choices.component';
import { AvailableQbsComponent } from './draft/available-qbs/available-qbs.component';
import { AvailableRbsComponent } from './draft/available-rbs/available-rbs.component';
import { AvailableWrsComponent } from './draft/available-wrs/available-wrs.component';
import { AvailableTesComponent } from './draft/available-tes/available-tes.component';
import { AvailableDstsComponent } from './draft/available-dsts/available-dsts.component';
import { AvailableKsComponent } from './draft/available-ks/available-ks.component';

@NgModule({
  declarations: [
    AppComponent,
    PreDraftFormComponent,
    DraftComponent,
    DraftBoardComponent,
    AvailablePlayersComponent,
    TeamBreakdownComponent,
    BestChoicesComponent,
    AvailableQbsComponent,
    AvailableRbsComponent,
    AvailableWrsComponent,
    AvailableTesComponent,
    AvailableDstsComponent,
    AvailableKsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
