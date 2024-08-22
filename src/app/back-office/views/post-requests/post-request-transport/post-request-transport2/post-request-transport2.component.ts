import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-post-request-transport2',
  templateUrl: './post-request-transport2.component.html',
  styleUrls: ['./post-request-transport2.component.scss']
})
export class PostRequestTransport2Component implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = ['PROVIDER', 'CAR MODEL', 'SERVICE TYPE', 'DEPARTURE', 'TOTAL SEATS', 'AVAILABLE SEATS', 'COST PER SEAT/DAY'];

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    for (let i = 1; i <= 15; i++) {
      this.elements.push({
        provider: 'data',
        service: 'data',
        departure: 'data ',
        total: 'data ',
        weight: 'data ',
        volume: 'data ',
        duration: 'data '
      });
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

}
