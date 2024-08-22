import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCountryComponent } from './dashboard-country.component';

// import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardCountryComponent,
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
export class DashboardCountryRoutingModule { }
