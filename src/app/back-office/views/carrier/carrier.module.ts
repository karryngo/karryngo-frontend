// Angular
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { VehiclesComponent } from './vehicles/vehicles.component';

// Forms Component
import { SettingsComponent } from './settings/settings.component';

// Components Routing
import { CarrierRoutingModule } from './carrier-routing.module';
import { ProgressIndeterminateModule } from '../../../shared/components/progress-indeterminate/progress-indeterminate.module';
import { BeProviderComponent } from './be-provider/be-provider.component';
import { WaitAcceptanceComponent } from './wait-acceptance/wait-acceptance.component';

import { SearchLocationModule } from '../../components/search-location/search-location.module';

// import { ButtonModule } from '@syncfusion/ej2-angular-buttons';


import { InputFileUploadModule } from '../../components/input-file-upload-list/input-file-upload.module';
import { CdkTreeModule } from '@angular/cdk/tree';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
// import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
  MatTabsModule,
} from '@angular/material';

// import { TabMaterialModule } from '../../../shared/components/tab-material/tab-material.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BeProviderFormComponent } from './be-provider-form/be-provider-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NewServiceComponent } from './new-service/new-service.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { FindServicesComponent } from './find-services/find-services.component';
// import { ScrollTracker } from './find-services/ScrollTracker.directive';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { MapModule } from '../../components/map/map.module';
import { AwardedServicesComponent } from './awarded-services/awarded-services.component';
import { AddDocumentsComponent } from './business-profile/add-documents/add-documents.component';


const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    CarrierRoutingModule,
    ProgressIndeterminateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    SearchLocationModule,
    NgSelectModule,
    InputFileUploadModule,
    // AutoCompleteModule,
    // SearchLocationModule,
    MatTabsModule,
    InputFileUploadModule,
    GoogleMapsModule,
    MapModule
  ],
  declarations: [
    VehiclesComponent,
    SettingsComponent,
    BeProviderComponent,
    WaitAcceptanceComponent,
    BeProviderFormComponent,
    NewServiceComponent,
    BusinessProfileComponent,
    MyServicesComponent,
    MyOffersComponent,
    FindServicesComponent,
    // ScrollTracker,
    ServiceDetailsComponent,
    AwardedServicesComponent,
    AddDocumentsComponent
  ],
  exports: [
    // ...materialModules
  ]
})
export class CarrierModule { }
