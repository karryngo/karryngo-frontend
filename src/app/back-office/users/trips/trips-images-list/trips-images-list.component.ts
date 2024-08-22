import { Component, OnInit, Injector } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PageListComponent } from '../../../components/page-list/page-list.component';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-images-list.component.html',
  styleUrls: ['./trips-images-list.component.scss']
})
export class TripsImagesListComponent extends PageListComponent implements OnInit {

  constructor(
    private meta: Meta,
    private titleService: Title,
    injector: Injector) {

    super(injector);

  }

  initialize(): void {

    this.endpoint = 'trips';
    this.link = 'trips';
    this.placeholder = 'trips...';
    this.results = 'Trips';
    this.found = 'trips';
    this.creation = 'Trip';
    this.loaded = false;
    this.icon = 'fas fa-car';
    this.itemsCount = 0;
    this.itemsPerPage = 24;
    this.linkRoute = 'trips-images';

    this.columns = [
      { name: 'Id', field: 'id', align: 'left', color: 'black', font: '' },
      { name: 'Name', field: 'name', align: 'left', color: 'text-primary', font: 'bold' },
      { name: 'Date', field: 'releaseDate', align: 'center', color: 'text-primary', font: '' },
    ];

    super.initialize();
  }

  ngOnInit(): void {
    this.titleService.setTitle('New Trips: angular.ganatan');
    this.meta.addTag({
      name: 'angular.ganatan',
      content: 'Karry n go'
    });
    this.meta.updateTag(
      {
        name: 'description',
        content: 'All the new trips'
      });
  }

  selectItem(id: any): void {
    this.router.navigate(['/trips/' + this.link, id]);
  }

}
