import { Component, OnInit } from '@angular/core';
import { Injector } from '@angular/core';

import { PageListComponent } from '../../../components/page-list/page-list.component';

@Component({
  selector: 'app-movies-list-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent extends PageListComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  initialize(): void {

    this.endpoint = 'trips';
    this.link = 'trips';
    this.placeholder = 'trips...';
    this.results = 'Trip';
    this.found = 'trips';
    this.creation = 'Trips';
    this.loaded = false;
    this.icon = 'fas fa-car';
    this.itemsCount = 0;
    this.itemsPerPage = 5;
    this.linkRoute = 'trips';

    this.columns = [
      {
        type:'id',
        title: { caption: 'Id', class: 'text-info font-weight-bold text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell' },
        data: { field: 'id', class: 'text-info text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell' }
      },
      {
        type:'type',
        title: { caption: 'Type', class: 'font-weight-bold text-center' },
        data: { field: 'type', class: 'text-center' }
      },
      {
        type:'place',
        title: { caption: 'Places', class: 'text-success font-weight-bold text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell' },
        data: { field: 'places', class: 'text-info text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell' }
      },
      {
        type:'location',
        title: { caption: 'Start', class: 'text-info font-weight-bold text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell' },
        data: { field: 'startLocation', class: 'text-info text-center d-none d-md-table-cell d-lg-table-cell d-xl-table-cell' }
      },
      {
        type:'location',
        title: { caption: 'End', class: 'text-center font-weight-bold' },
        data: { field: 'endLocation', class: 'text-center text-success' }
      },
      {
        type:'name',
        title: { caption: 'Drivers', class: 'font-weight-bold text-center' },
        data: { field: 'driverName', class: 'text-primary font-weight-bold text-center' }
      },
      // {
      //   type: 'img',
      //   title: { caption: 'Images', class: 'font-weight-bold text-center' },
      //   data: { field: 'img', class: 'font-weight-bold text-center', height: 50, width: 30 }
      // },
    ];

    super.initialize();
  }

}
