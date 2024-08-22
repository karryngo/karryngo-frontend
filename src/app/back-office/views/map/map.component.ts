
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;

  // marker: google.maps.Marker;

  constructor() {
    // this.findMe();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // const mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  // findMe(event) {
  //   console.log(event)
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.showPosition(position);
  //     });
  //   } else {
  //     alert('Geolocation is not supported by this browser.');
  //   }
  // }

  // showPosition(position) {
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;

  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   this.map.panTo(location);

  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }

  // trackMe() {
  //   if (navigator.geolocation) {
  //     this.isTracking = true;
  //     navigator.geolocation.watchPosition((position) => {
  //       this.showTrackingPosition(position);
  //     });
  //   } else {
  //     alert('Geolocation is not supported by this browser.');
  //   }
  // }

  // showTrackingPosition(position) {
  //   console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;

  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   this.map.panTo(location);

  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }

}
