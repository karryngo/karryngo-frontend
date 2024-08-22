import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripService } from '../../../../shared/service/back-office/trip.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';

// declare var $: any;

@Component({
  selector: 'app-post-request-trips',
  templateUrl: './post-request-trips.component.html',
  styleUrls: ['./post-request-trips.component.scss']
})
export class PostRequestTripsComponent implements OnInit {

  title = '';
  titleInterface: string;
  interface1 = true;
  interface2 = false;
  interface3 = false;
  visible = true;
  visiblePrev = false;
  posts: any[];
  slug: string;

  constructor(
    private router: Router,
    public tripService: TripService,
    private toastr: ToastrService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    // this.tripService.getTrips();
    
    this.initPage();
    // this.posts = this.tripService.trips;
    // console.log(this.posts);
  }

  // init the interface trip
  initPage() {
    if (this.interface1) {
      this.titleInterface = this.title;
      this.visible = true;
      this.visiblePrev = false;
    } else if (this.interface2) {
      this.titleInterface = this.title + '2/3';
      this.visible = true;
      this.visiblePrev = true;
    } else if (this.interface3) {
      this.titleInterface = this.title + '3/3';
      this.visible = false;
      this.visiblePrev = true;
    }
  }

  next() {
    if (this.interface1) {
      this.pushTripForm();
      this.interface1 = false;
      this.interface2 = true;
      this.interface3 = false;
    } else if (this.interface2) {
      this.interface1 = false;
      this.interface2 = false;
      this.interface3 = true;
    }
    this.initPage();
  }

  prevPage() {
    if (this.interface1) {
      this.titleInterface = this.title + '1/3';
      this.visible = true;
      this.visiblePrev = false;
    } else if (this.interface2) {
      this.titleInterface = this.title + '2/3';
      this.visible = true;
      this.visiblePrev = true;
    } else if (this.interface3) {
      this.titleInterface = this.title + '3/3';
      this.visible = false;
      this.visiblePrev = true;
    }
  }

  prev() {
    if (this.interface2) {
      this.interface1 = true;
      this.interface2 = false;
      this.interface3 = false;
    } else if (this.interface3) {
      this.interface1 = false;
      this.interface2 = true;
      this.interface3 = false;
    }
    this.prevPage();
  }

  pushTripForm() {
    console.log(TripService.currentTrip);
    this.tripService.tripCreation(TripService.currentTrip);
  }

  showNotification() {
    this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>This service was not available now. Tray later.')
  }
}
