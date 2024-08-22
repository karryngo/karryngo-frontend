import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TripsFormRoutingModule } from './trips-form-routing.module';
import { TripsFormComponent } from './trips-form.component';


@NgModule({
  declarations: [TripsFormComponent],
  imports: [
    CommonModule,
    TripsFormRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TripsFormComponent
  ],
})
export class TripsFormModule { }
