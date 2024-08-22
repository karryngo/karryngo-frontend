import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MykarryComponent } from './mykarry.component';

const routes: Routes = [
  {
    path: '',
    component: MykarryComponent,
    data: {
      title: 'Dashboard'
    },
    // children: [
    //   {
    //     path: '',
    //     loadChildren: () => import('../../users/trips/trips.module')
    //       .then(mod => mod.TripsModule),
    //   }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MykarryRoutingModule { }
