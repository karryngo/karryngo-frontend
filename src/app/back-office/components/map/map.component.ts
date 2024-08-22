import { Input } from '@angular/core';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @Output() get_coord = new EventEmitter<any>();
    @Input() set_coord: any;



    
    @ViewChild(GoogleMap,{static: false}) map: GoogleMap;
    @ViewChild('mapSearchField',{static: false}) searchField: ElementRef;
    zoom = 12;
    center: google.maps.LatLngLiteral;
    options: google.maps.MapOptions = {
        mapTypeId: 'hybrid',
        zoomControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        maxZoom: 25,
        minZoom: 0,
    };
    address: string = "You Provide Services Here";
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
    infoContent = ''
    marker: any;
    
    constructor() { }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
                lat: this.set_coord ? this.set_coord.latitude : position.coords.latitude,
                lng: this.set_coord ? this.set_coord.longitude : position.coords.longitude,
            };
            this.marker = {
                position: {
                    lat: this.center.lat ,
                    lng: this.center.lng ,
                },
                label: {
                    color: 'red',
                    text: this.address,
                },
                title: ' title ',
                options: { animation: google.maps.Animation.BOUNCE },
            }
            this.get_coord.emit({latitude: this.set_coord ? this.set_coord.latitude : position.coords.latitude, longitude: this.set_coord ? this.set_coord.longitude : position.coords.longitude});
        });
    }

    ngAfterViewInit(){
        const searchBox = new google.maps.places.SearchBox(
            this.searchField.nativeElement
        );
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField.nativeElement,)
        searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();
            if(places.length === 0){
                return;
            }
            const bounds = new google.maps.LatLngBounds();
            places.forEach(place => {
                if(!place.geometry || !place.geometry.location){
                    return; 
                }
                if(place.geometry.viewport){
                    console.log(place)
                    console.log(place.geometry.location.lat())
                    bounds.union(place.geometry.viewport);
                    this.marker = {
                        position: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        },
                        label: {
                            color: 'red',
                            text: place.formatted_address,
                        },
                        title: this.address,
                        options: { animation: google.maps.Animation.DROP },
                    };
                    this.get_coord.emit({latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()});
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            this.map.fitBounds(bounds);
            console.log(bounds)
            // this.arr_map.fitBounds(bounds);
        })
    }

    click(event: google.maps.MouseEvent) {
        console.log(event);
        console.log(event.latLng.lat());
        console.log(event.latLng.lng());
        this.get_coord.emit({latitude: event.latLng.lat(), longitude: event.latLng.lng()});

        var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latlng },  (results, status) =>{
            if (status !== google.maps.GeocoderStatus.OK) {
                alert(status);
            }
            // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
                this.address = (results[0].formatted_address);
                console.log(results);
            }
            this.marker = {
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                },
                label: {
                    color: 'red',
                    text: this.address,
                },
                title: this.address,
                options: { animation: google.maps.Animation.DROP },
            }
        });
    }

    openInfo(marker: MapMarker, content){
        console.log(marker)
        this.infoContent = content
        this.infoWindow.open(marker)
    }

}
