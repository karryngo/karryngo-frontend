import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsListComponent } from './trips-list.component';
import { TripsListRoutingModule } from './trips-list-routing.module';

import { GridModule } from '../../../components/grid/grid.module';
import { PaginationModule } from '../../../components/pagination/pagination.module';
import { SearchBarModule } from '../../../components/search-bar/search-bar.module';
import { SearchResultModule } from '../../../components/search-result/search-result.module';

@NgModule({
  declarations: [
    TripsListComponent,
  ],
  imports: [
    CommonModule,
    TripsListRoutingModule,
    GridModule,
    PaginationModule,
    SearchBarModule,
    SearchResultModule,
  ],
  exports: [
    TripsListComponent
  ],
})
export class TripsListModule { }
