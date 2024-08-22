import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { PackagesComponent } from './packages.component';

import { PostRequestsRoutingModule } from './post-requests-routing.module';
import { PostRequestColisComponent } from './post-request-colis/post-request-colis.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostRequestTripsComponent } from './post-request-trip/post-request-trips.component';
import { PostRequestTrip0Component } from './post-request-trip/post-request-trip0/post-request-trip0.component';
import { PostRequestTrip1Component } from './post-request-trip/post-request-trip1/post-request-trip1.component';
import { PostRequestTrip2Component } from './post-request-trip/post-request-trip2/post-request-trip2.component';
import { PostRequestColis0Component } from './post-request-colis/post-request-colis0/post-request-colis0.component';
import { PostRequestColis1Component } from './post-request-colis/post-request-colis1/post-request-colis1.component';
import { PostRequestColis2Component } from './post-request-colis/post-request-colis2/post-request-colis2.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProgressIndeterminateModule } from '../../../shared/components/progress-indeterminate/progress-indeterminate.module';
import { SearchLocationModule } from '../../components/search-location/search-location.module';
import { InputFileUploadModule } from '../../components/input-file-upload-list/input-file-upload.module';
import { MatListModule } from '@angular/material';
import { HowProviderInfosComponent } from './how-provider-infos/how-provider-infos.component';
import { TranslateModule } from '@ngx-translate/core';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapModule } from '../../components/map/map.module';
import { PostRequestRentComponent } from './post-request-rent/post-request-rent.component';
import { PostRequestRent0Component } from './post-request-rent/post-request-rent0/post-request-rent0.component';
import { PostRequestRent1Component } from './post-request-rent/post-request-rent1/post-request-rent1.component';
import { PostRequestRent2Component } from './post-request-rent/post-request-rent2/post-request-rent2.component';
import { PostTravelColisComponent } from './post-travel-colis/post-travel-colis.component';
import { PostTravelColis0Component } from './post-travel-colis/post-travel-colis0/post-travel-colis0.component';
import { PostTravelColis1Component } from './post-travel-colis/post-travel-colis1/post-travel-colis1.component';
import { PostTravelColis2Component } from './post-travel-colis/post-travel-colis2/post-travel-colis2.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PostRequestsRoutingModule,
        MatTabsModule,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        TranslateModule.forChild(),
        ProgressIndeterminateModule,
        SearchLocationModule,
        InputFileUploadModule, 
        MatListModule,
        GoogleMapsModule,
        MapModule,
        FormsModule
    ],
    declarations: [
        PackagesComponent,
        PostRequestColisComponent,
        PostRequestColis0Component,
        PostRequestColis1Component,
        PostRequestColis2Component,
        PostTravelColisComponent,
        PostTravelColis0Component,
        PostTravelColis1Component,
        PostTravelColis2Component,
        PostRequestTripsComponent,
        PostRequestTrip0Component,
        PostRequestTrip1Component,
        PostRequestTrip2Component,
        PostRequestRentComponent,
        PostRequestRent0Component,
        PostRequestRent1Component,
        PostRequestRent2Component,
        HowProviderInfosComponent,
        OfferDetailsComponent
    ],
    entryComponents:[
        HowProviderInfosComponent,
        OfferDetailsComponent
    ]
})
export class PostRequestsModule { }
