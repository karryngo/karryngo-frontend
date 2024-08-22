import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-trip-carrier-shipment',
  templateUrl: './view-trip-carrier-shipment.component.html',
  styleUrls: ['./view-trip-carrier-shipment.component.scss']
})
export class ViewTripCarrierShipmentComponent implements OnInit {
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
