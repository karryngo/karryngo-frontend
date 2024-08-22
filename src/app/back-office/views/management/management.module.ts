import { ComponentsModule } from './../../components/component.module';
import { ListServicesComponent } from './../../components/list-services/list-services.component';
// Angular
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Forms Component
import { MCostomersComponent } from './m-costomers/m-costomers.component';
import { MCountriesComponent } from './m-countries/m-countries.component';
import { MFinancesComponent } from './m-finances/m-finances.component';
import { MProvidersComponent } from './m-providers/m-providers.component';
import { MServicesComponent } from './m-services/m-services.component';
import { MTvaComponent } from './m-tva/m-tva.component';

// Components Routing
// import { ProgressIndeterminateModule } from '../../../shared/components/progress-indeterminate/progress-indeterminate.module';
// import { SearchLocationModule } from '../../components/search-location/search-location.module';
import { ManagementRoutingModule } from './management-routing.module';

// import { ButtonModule } from '@syncfusion/ej2-angular-buttons';


// import { InputFileUploadModule } from '../../components/input-file-upload-list/input-file-upload.module';
import { CdkTreeModule } from '@angular/cdk/tree';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

// import {
//   MatAutocompleteModule,
//   MatBadgeModule,
//   MatBottomSheetModule,
//   MatButtonModule,
//   MatButtonToggleModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatChipsModule,
//   MatDatepickerModule,
//   MatDialogModule,
//   MatDividerModule,
//   MatExpansionModule,
//   MatGridListModule,
//   MatIconModule,
//   MatInputModule,
//   MatListModule,
//   MatMenuModule,
//   MatNativeDateModule,
//   MatPaginatorModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatRadioModule,
//   MatRippleModule,
//   MatSelectModule,
//   MatSidenavModule,
//   MatSliderModule,
//   MatSlideToggleModule,
//   MatSnackBarModule,
//   MatSortModule,
//   MatStepperModule,
//   MatTableModule,
//   MatToolbarModule,
//   MatTooltipModule,
//   MatTreeModule,
//   MatFormFieldModule,
//   MatTabsModule,
// } from '@angular/material';

// import { TabMaterialModule } from '../../../shared/components/tab-material/tab-material.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CProvidersModule } from '../../../shared/components/Providers/c-providers.module';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { MCountryDetailsComponent } from './m-country-details/m-country-details.component';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
// import {MatPaginatorModule} from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { MMessagesComponent } from './m-messages/m-messages.component';
import { MMessageDetailsComponent } from './m-message-details/m-message-details.component';
import { MCountryProvidersComponent } from './m-country-providers/m-country-providers.component';
import { MCountryServicesComponent } from './m-country-services/m-country-services.component';
import { MCountryStatisticsComponent } from './m-country-statistics/m-country-statistics.component';
import { ChartModule } from 'angular-highcharts';
import { MServiceStatisticsComponent } from './m-service-statistics/m-service-statistics.component';
import { MProviderStatisticsComponent } from './m-provider-statistics/m-provider-statistics.component';
import { MUserProfileComponent } from './m-costomers/m-user-profile/m-user-profile.component';
import { MapModule } from '../../components/map/map.module';
import { CountCartComponent } from './m-service-statistics/count-cart/count-cart.component';
import { ChartComponent } from './m-service-statistics/chart/chart.component';
import { NbProvidersChartComponent } from './m-provider-statistics/nb-providers-chart/nb-providers-chart.component';
import { NbServicesChartComponent } from './m-provider-statistics/nb-services-chart/nb-services-chart.component';
import { TotalChartComponent } from './m-service-statistics/total-chart/total-chart.component';
import { TotalRevenueChartComponent } from './m-service-statistics/total-revenue-chart/total-revenue-chart.component';
import { MCountryProviderStatisticsComponent } from './m-country-provider-statistics/m-country-provider-statistics.component';
import { MPaymentTransactionsComponent } from './m-payment-transactions/m-payment-transactions.component';
import { MPaymentTransactionDetailsComponent } from './m-payment-transactions/m-payment-transaction-details/m-payment-transaction-details.component';
import { CPaymentTransactionsComponent } from './c-payment-transactions/c-payment-transactions.component';
import { CPaymentTransactionDetailsComponent } from './c-payment-transactions/c-payment-transaction-details/c-payment-transaction-details.component';



// const materialModules = [
//   CdkTreeModule,
//   MatAutocompleteModule,
//   MatButtonModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatChipsModule,
//   MatDividerModule,
//   MatExpansionModule,
//   MatIconModule,
//   MatInputModule,
//   MatListModule,
//   MatMenuModule,
//   MatProgressSpinnerModule,
//   MatPaginatorModule,
//   MatRippleModule,
//   MatSelectModule,
//   MatSidenavModule,
//   MatSnackBarModule,
//   MatSortModule,
//   MatTableModule,
//   MatTabsModule,
//   MatToolbarModule,
//   MatFormFieldModule,
//   MatButtonToggleModule,
//   MatTreeModule,
//   OverlayModule,
//   PortalModule,
//   MatBadgeModule,
//   MatGridListModule,
//   MatRadioModule,
//   MatDatepickerModule,
//   MatTooltipModule
// ];
// import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagementRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    CProvidersModule,
    MatPaginatorModule,
    ComponentsModule,
    TranslateModule.forChild(),
    BsDropdownModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgSelectModule,
    MatPaginatorModule,
    ChartsModule,
    ChartModule,
    MapModule,
    ChartsModule,
    // NgApexchartsModule
    
  ],
  declarations: [
    MCostomersComponent,
    // ListServicesComponent,
    MCountriesComponent,
    MFinancesComponent,
    MProvidersComponent,
    MServicesComponent,
    MTvaComponent,
    MCountryDetailsComponent,
    MMessagesComponent,
    MMessageDetailsComponent,
    MCountryProvidersComponent,
    MCountryServicesComponent,
    MCountryStatisticsComponent,
    MServiceStatisticsComponent,
    MProviderStatisticsComponent,
    MUserProfileComponent,
    CountCartComponent,
    ChartComponent,
    NbProvidersChartComponent,
    NbServicesChartComponent,
    TotalChartComponent,
    TotalRevenueChartComponent,
    MCountryProviderStatisticsComponent,
    MPaymentTransactionsComponent,
    MPaymentTransactionDetailsComponent,
    CPaymentTransactionsComponent,
    CPaymentTransactionDetailsComponent
  ],
  exports: [
    // ListServicesComponent,
  ]
})
export class ManagementModule { }
