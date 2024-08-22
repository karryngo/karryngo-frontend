import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesComponent } from './vehicles/vehicles.component';
import { SettingsComponent } from './settings/settings.component';
import { BeProviderComponent } from './be-provider/be-provider.component';
import { CarrierGuard } from './../../../shared/guard/carrier.guard';
import { WaitAcceptanceComponent } from './wait-acceptance/wait-acceptance.component';
import { BeProviderFormComponent } from './be-provider-form/be-provider-form.component';
import { BeCarrierGuardGuard } from '../../../shared/guard/be-carrier-guard.guard';
import { BeProviderFormGuardGuard } from '../../../shared/guard/be-provider-form-guard.guard';
import { WaitAcceptanceGuardGuard } from '../../../shared/guard/wait-acceptance-guard.guard';
import { VehiclesGuardGuard } from '../../../shared/guard/vehicles-guard.guard';
import { TranslateModule } from '@ngx-translate/core';
import { NewServiceComponent } from './new-service/new-service.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { FindServicesComponent } from './find-services/find-services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { AwardedServicesComponent } from './awarded-services/awarded-services.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Carrier'
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'be-carrier'
      // },
      {
        path: 'be-carrier',
        canActivate:[BeCarrierGuardGuard],
        component: BeProviderComponent,
        data: {
          title: 'Become carrier',
          page:'become-provider'
        },
      },
      {
        path: 'be-provider-form',
        canActivate:[BeProviderFormGuardGuard],
        component: BeProviderFormComponent, 
        data: {
          title: 'Become carrier form',
          page:"provider-form"
        }
      },
      {
        path: 'wait-acceptance',
        component: WaitAcceptanceComponent,
        canActivate:[WaitAcceptanceGuardGuard],
        data: {
          title: 'Wait acceptance'
        },
      },
      
      {
        path: 'vehicles',
        component: VehiclesComponent,
        data: {
          title: 'Vehicles'
        },
         canActivate: [VehiclesGuardGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Settings'
        },
        // canActivate: [CarrierGuard]
      },

      // By Landry
      {
        path: 'create-new-service',
        // canActivate:[BeProviderFormGuardGuard],
        component: NewServiceComponent,
        data: {
          title: 'Create New Service',
          page:"new-service"
        }
      },
      {
        path: 'business-profile',
        // canActivate:[BeProviderFormGuardGuard],
        component: BusinessProfileComponent,
        data: {
          title: 'Business Profile',
          page:"profile"
        }
      },
      // {
      //   path: 'list-of-my-offers',
      //   // canActivate:[BeProviderFormGuardGuard],
      //   component: BusinessProfileComponent,
      //   data: {
      //     title: 'My Offers',
      //     page:"my-offers"
      //   }
      // },
      {
        path: 'list-of-my-offers',
        canActivate:[BeProviderFormGuardGuard],
        component: MyOffersComponent,
        data: {
          title: 'My Offers',
          page:"my-offers"
        }
      },
      {
        path: 'find-new-services',
        canActivate:[BeProviderFormGuardGuard],
        component: FindServicesComponent,
        data: {
          title: 'My Offers',
          page:"my-offers"
        }
      },
      {
        path: 'my-selected-services',
        canActivate:[BeProviderFormGuardGuard],
        component: AwardedServicesComponent,
        data: {
          title: 'My Selected Services',
          page:"my-services"
        }
      },
      {
        path: 'service-details/:service_id',
        canActivate:[BeProviderFormGuardGuard],
        component: ServiceDetailsComponent,
        data: {
          title: 'Service Details',
          page:"my-offers"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierRoutingModule { }
