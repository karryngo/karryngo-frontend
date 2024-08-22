import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsComponent } from './requests/requests.component';
import { SettingsComponent } from './settings/settings.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trips'
    },
    children: [
      {
        path: '',
        redirectTo: 'vehicles'
      },
      {
        path: 'vehicles',
        component: VehiclesComponent,
        data: {
          title: 'Vehicles'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Statistics'
        }
      },
      {
        path: 'requests/:id',
        component: RequestsComponent,
        data: {
          title: 'Requests'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule {}
