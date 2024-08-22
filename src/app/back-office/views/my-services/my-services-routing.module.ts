import { UserServicesComponent } from './user-services/user-services.component';
import { BizprofileComponent } from './bizprofile/bizprofile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { VehiclesComponent } from '../carrier/vehicles/vehicles.component';
// import { MykarryComponent } from './mykarry.component';
import { MyServiceDetailsComponent } from './my-service-details/my-service-details.component';

const routes: Routes = [

    {
        path: '',
        data: {
            title: 'Update Business Profile'
        },
        children: [
        {
            path: '',
            redirectTo: 'business-profile'
        },
        {
            path: 'business-profile',
            component: BizprofileComponent,        
        },
        {
            path: 'historic-services',
            component: UserServicesComponent,        
        },
        {
            path: 'my-service-details/:service_id',
            component: MyServiceDetailsComponent,        
        },
        
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyServicesRoutingModule { }
