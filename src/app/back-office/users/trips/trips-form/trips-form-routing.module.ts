import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsFormComponent } from './trips-form.component';

const routes: Routes = [
  { path: '', component: TripsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsFormRoutingModule { }
