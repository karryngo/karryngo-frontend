import { ComponentsModule } from './../../components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BizprofileComponent } from './bizprofile/bizprofile.component';
import { MyServicesRoutingModule } from './my-services-routing.module';
// import { VehiclesComponent } from '../carrier/vehicles/vehicles.component';
import { SearchLocationModule } from '../../components/search-location/search-location.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserServicesComponent } from './user-services/user-services.component';
import { CProvidersModule } from '../../../shared/components/Providers/c-providers.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListServicesComponent } from '../../components/list-services/list-services.component';
import { MyServiceDetailsComponent } from './my-service-details/my-service-details.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';


@NgModule({
    declarations: [BizprofileComponent, UserServicesComponent, MyServiceDetailsComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        MyServicesRoutingModule,
        TranslateModule.forChild(), 
        SearchLocationModule,
        CProvidersModule,
        NgxDatatableModule,
        NgxIntlTelInputModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
        
    ]
})
export class MyServicesModule { }
