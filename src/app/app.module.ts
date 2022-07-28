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

@NgModule({
  declarations: [
    AppComponent,
    PreDraftFormComponent,
    DraftComponent,
    DraftBoardComponent,
    AvailablePlayersComponent,
    TeamBreakdownComponent
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
