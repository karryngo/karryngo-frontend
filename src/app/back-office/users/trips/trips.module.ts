import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips.component';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from '../../../shared/service/config/config.service';
import { TripsPipesModule } from '../../../shared/pipes/trips-pipes.module';


@NgModule({
    declarations: [
      TripsComponent,
    ],
    imports: [
      CommonModule,
      TripsRoutingModule,
      HttpClientModule,
      TripsPipesModule
    ],
    exports: [
      TripsComponent,
    ],
    providers: [
      ConfigService,
    ],
  })
export class TripsModule { }

