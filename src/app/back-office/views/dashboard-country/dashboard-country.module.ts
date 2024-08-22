import { DashboardCountryRoutingModule } from './dashboard-country-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

// import { DashboardComponent } from './dashboard.component';
// import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { DashboardCountryComponent } from './dashboard-country.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    DashboardCountryRoutingModule,
    ChartsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardCountryComponent ]
})
export class DashboardCountryModule { }
