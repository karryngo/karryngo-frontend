import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsImagesListComponent } from './trips-images-list.component';
import { TripsImagesListRoutingModule } from './trips-images-list-routing.module';

import { GridImagesModule } from '../../../components/grid-images/grid-images.module';
import { PaginationModule } from '../../../components/pagination/pagination.module';
import { SearchBarModule } from '../../../components/search-bar/search-bar.module';
import { SearchResultModule } from '../../../components/search-result/search-result.module';

@NgModule({
  declarations: [
    TripsImagesListComponent,
  ],
  imports: [
    CommonModule,
    TripsImagesListRoutingModule,
    GridImagesModule,
    PaginationModule,
    SearchBarModule,
    SearchResultModule,
  ],
  exports: [
    TripsImagesListComponent
  ],
})
export class TripsImagesListModule { }
