import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TripsComponent } from './trips.component';
import { SettingsComponent } from './settings/settings.component';

// Dropdowns Component
import { VehiclesComponent } from './vehicles/vehicles.component';

// Trips Routing
import { TripsRoutingModule } from './trips-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RequestsComponent } from './requests/requests.component';
import { TranslateModule } from '@ngx-translate/core';

// Angular

@NgModule({
  imports: [
    CommonModule,
    TripsRoutingModule,
    NgSelectModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FormsModule
  ],
  declarations: [
    TripsComponent,
    VehiclesComponent,
    SettingsComponent,
    RequestsComponent,
  ]
})
export class TripsModule { }
