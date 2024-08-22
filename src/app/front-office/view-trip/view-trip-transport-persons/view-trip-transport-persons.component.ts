import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-trip-transport-persons',
  templateUrl: './view-trip-transport-persons.component.html',
  styleUrls: ['./view-trip-transport-persons.component.scss']
})
export class ViewTripTransportPersonsComponent implements OnInit {
  user: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user-data');
    if (this.user) {
        this.router.navigate(['dashboard']);
    }
  }

}
