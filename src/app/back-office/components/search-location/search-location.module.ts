import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchLocationComponent } from './search-location.component';
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ZoneService } from '../../../shared/service/zone/zone.service';
import {GeoDbFreeModule, GeoDbProModule } from 'wft-geodb-angular-client';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SearchLocationComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, 
    NgSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    // GeoDbFreeModule.forRoot({
    //   apiKey: null,
    //   serviceUri: "https://geodb-free-service.wirefreethought.com"
    // }),
    GeoDbProModule.forRoot({
      apiKey: '1d2c075047msh3f2dcdb5548ceb7p10af4ejsn2a10672e2d8d',
      // serviceUri: "https://geodb-free-service.wirefreethought.com"
      serviceUri: "https://wft-geo-db.p.rapidapi.com"
    })
  ],
  exports: [SearchLocationComponent],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    },
    ZoneService
  ]
})
export class SearchLocationModule { }
