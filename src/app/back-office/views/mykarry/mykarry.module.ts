import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MykarryRoutingModule } from './mykarry-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MykarryComponent } from './mykarry.component';

// import { TrackingComponent } from '../../../shared/components/tracking/tracking.component';
// import { DashboardCountryComponent } from './dashboard-country.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    // DashboardCountryRoutingModule,
    MykarryRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [ MykarryComponent]
})
export class MykarryModule { }
