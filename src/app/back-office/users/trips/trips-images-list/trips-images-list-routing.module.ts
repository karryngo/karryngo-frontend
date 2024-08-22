import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsImagesListComponent } from './trips-images-list.component';

const routes: Routes = [
  { path: '', component: TripsImagesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsImagesListRoutingModule { }
