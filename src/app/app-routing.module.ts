import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftComponent } from './draft/draft.component';
import { PreDraftFormComponent } from './pre-draft-form/pre-draft-form.component';

const routes: Routes = [
  { path: 'draft', component: DraftComponent },
  { path: 'pre-draft', component: PreDraftFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
