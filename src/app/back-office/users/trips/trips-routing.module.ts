import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsComponent } from './trips.component';

const routes: Routes = [
  {
    path: '', component: TripsComponent, children: [
      {
        path: 'trips',
        loadChildren: () => import('./trips-list/trips-list.module').then(mod => mod.TripsListModule)
      },
      {
        path: 'trips-images',
        loadChildren: () => import('./trips-images-list/trips-images-list.module').then(mod => mod.TripsImagesListModule)
      },
      {
        path: 'trips/:id',
        loadChildren: () => import('./trips-form/trips-form.module').then(mod => mod.TripsFormModule)
      },
      {
        path: '',
        loadChildren: () => import('./trips-list/trips-list.module').then(mod => mod.TripsListModule)
      },
      // {
      //   path: '**',
      //   loadChildren: () => import('./pages/blank-page/blank-page.module').then(mod => mod.BlankPageModule)
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
