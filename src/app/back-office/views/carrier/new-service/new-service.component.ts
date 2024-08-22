import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CreateColisPackageService } from '../../../../shared/service/back-office/create-package.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { TripService } from '../../../../shared/service/back-office/trip.service';
import * as moment from 'moment';
import { SearchLocationComponent } from '../../../components/search-location/search-location.component';
import { OfferService } from '../../../../shared/service/back-office/offer.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import services from '../../../../../assets/data/service.json';

@Component({
    selector: 'app-new-service',
    templateUrl: './new-service.component.html', changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent implements OnInit {

    // map
    @ViewChild(GoogleMap,{static: false}) map: GoogleMap;
    @ViewChild('mapSearchField',{static: false}) searchField: ElementRef;
    
    zoom = 12;
    center: google.maps.LatLngLiteral;
    options: google.maps.MapOptions = {
        mapTypeId: 'hybrid',
        zoomControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        maxZoom: 15,
        minZoom: 0,
    };
    address: string = "You are here";
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
    infoContent = ''
    marker: any;
    //   end map

    @ViewChild('map') mapElement: any;
    // map: google.maps.Map;

    @ViewChild('toZone') toZoneWidget: SearchLocationComponent;
    @ViewChild('fromZone') fromZoneWidget: SearchLocationComponent;
    is_form: boolean;
    offerForm: FormGroup;
    submitted: boolean;
    titleUser: string;
    list_types: string[];
    list_types1: string[];
    list_types2: string[];
    list_types3: string[];
    visible = true;
    hange_typeof: string;
    change_typeof: string;
    slug: string;
    current_date: string;
    title = 'New offer';
    user1 = true;
    user2 = false;
    user3 = false;
    current_user: any;

    longitude?: number;
    latitude?: number;
    service_types = services;

    services: any;

    
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private tripCreationServ:CreateColisPackageService,
        private offerService: OfferService,
        private activatedRoute: ActivatedRoute,
        private cdRef : ChangeDetectorRef,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
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
            this.f.latitude.setValue(position.coords.latitude)
            this.f.longitude.setValue(position.coords.longitude)
        });
        
        this.initPage();
        this.current_user = JSON.parse(localStorage.getItem("user"));
        this.offerForm = this.formBuilder.group({
            'departure_place': [''],
            'arrival_place': [''],
            'provider_name': [this.current_user.firstname+' '+this.current_user.lastname, Validators.required],
            'title': ['', Validators.required],
            'provider_id': [this.current_user._id, Validators.required],
            // 'field_price': [this.tripCreationServ.package.suggestedPrice, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            'departure_date': ['', Validators.required],
            'departure_time': ['', Validators.required],
            'type': ['', Validators.required],
            'number_place': [1, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            'description': [this.tripCreationServ.package.description ],
            'is_urgent': [this.tripCreationServ.package.is_urgent ],
            'latitude': ['', Validators.required],
            'longitude': ['', Validators.required],
            'weight': [0],
        });

        // this.getLocation();
        this.notification.showNotification('top', 'center', 'primary', 'pe-7s-close-circle', `\<b>Hello !\</b>\<br> We'll use your current location to make the client find you quickly `);
        
    //     const mapProperties = {
    //         center: new google.maps.LatLng(35.2271, -80.8431),
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //    };
    //    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
    }


    get f() { return this.offerForm.controls; }

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
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            this.map.fitBounds(bounds);
        })
    }

    ngAfterViewChecked(){
        


        this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
        this.buildPlaces();
        this.get_services();
        let selected: string;
    
        if(this.slug=="rent")
          selected = "Rent a car";
        else if(this.slug=="person")
          selected = "Request a taxi";
        else  
          selected = "Hire a vehicle";
    
        this.offerForm.patchValue({type: selected});
        
        if(this.change_typeof!==undefined)
          this.offerForm.patchValue({type: this.change_typeof});
    
        this.cdRef.detectChanges();
    
        //console.log(this.slug);
    }

    //This method is used to build arrays
    buildPlaces(){
        this.translate.get("carrier").subscribe(rep=>{
        const txtLang = rep.be_provider_form;
        // console.log(txtLang)
            this.list_types = this.service_types.TRANSPORTER
            this.list_types1 = this.service_types.PERSONS
            this.list_types2 = this.service_types["VEHICLE RENTALS"]
            this.list_types3 = this.service_types["KARRYNGO TRAVELER"]
            console.log(this.list_types[0])
            console.log(this.list_types1)
            console.log(this.list_types2)
            console.log(this.list_types3)
        });

    }
    // buildPlaces(){
    //     this.translate.get("post_requests").subscribe(rep=>{
    //     const txtLang = rep.post_request_trip.services;
    //     if(this.slug=="rent") 
    //         this.list_types = [txtLang.rent_bike, txtLang.rent_car, txtLang.rent_bus, txtLang.rent_truck, txtLang.rent_vip, txtLang.rent_suv];
    //     else if(this.slug=="person")
    //         this.list_types = [txtLang.req_moto, txtLang.req_taxi, txtLang.req_seat, txtLang.req_vip, txtLang.req_suv];
    //     else
    //         this.list_types = [txtLang.hire_car, txtLang.hire_bike, txtLang.hire_tricycle, txtLang.hire_minibus, txtLang.hire_bus, txtLang.hire_bakkie, txtLang.hire_truck];
    //     });

    // }

    //This method is used to get services
    get_services(){
        this.translate.get("carrier").subscribe(rep=>{
            const txtLang = rep.be_provider_form;
            // console.log(txtLang)
            // console.log(txtLang.include("beCompagnyCarrierForm"))
            this.services = txtLang;
        });
    }

    //This method change
    handleType(ev: string){
        console.log(ev);
        this.offerForm.patchValue({type: ev});
        this.change_typeof = ev;
    }

        // init the user registration
    initPage() {
        this.current_date = moment().format("YYYY-MM-DD");
        // this.buildPlaces();

        if (this.user1) {
        this.titleUser = this.title + '1/3';
        this.visible = true;
        } else if (this.user2) {
        this.titleUser = this.title + '2/3';
        this.visible = true;
        } else if (this.user3) {
        this.titleUser = this.title + '3/3';
        this.visible = false;
        }
    }

    submit(){
        if (this.fromZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of departure `);
            return;
        }
        if (this.toZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of arrival `);
            return;
        }
        
        console.log("trip : ",this.offerForm.value);
        this.is_form = true;
        if (!this.offerForm.valid) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Check your inputs form and try again`);
            return;
        }
    
        // this.tripCreationServ.package.package_name = this.offerForm.value.field_passengerName;
        // this.tripCreationServ.package.suggestedPrice = this.offerForm.value.field_price;
        
        // this.tripCreationServ.package.is_urgent = this.offerForm.value.field_isUrgent;
        // this.tripCreationServ.package.date_departure = this.offerForm.value.departure_date+ " "+ this.offerForm.value.departure_time;
        // this.tripCreationServ.package.title = this.offerForm.value.departure_time;
        // this.tripCreationServ.package.size_piece_nber = this.offerForm.value.number_place;
    
        //let voitureType:Vehicle=new Vehicle();
        // voitureType.type=this.packageForm.value.field_vehicleType;
        //this.tripCreationServ.package.carTypeList.push(voitureType);
    
        // this.tripCreationServ.package.suggestedPrice=this.offerForm.value.field_price;
        // this.tripCreationServ.package.description = this.offerForm.value.tripDescription;
        // this.tripCreationServ.package.from = this.fromZoneWidget.selectedLocation[0];
        // this.tripCreationServ.package.to = this.toZoneWidget.selectedLocation[0]
        // this.packageCreationService.package.images=this.widgetUploadFile.getDocumentsList();
    
        this.submitted = true;
    // this.tripCreationServ.package=this.tripCreationServ.package;
        // console.log("Trip: ",this.tripCreationServ.package);
        // this.packageService.packageCreation(this.packageCreationService.package)
        this.offerService.create_offer(this.offerForm.value)
        .then((result:any)=>{
            this.submitted=false;
            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Your offer was created successfully')
            setTimeout(() => {
            this.router.navigate(['/carrier/list-of-my-offers']);
            // this.router.navigate(['/post-requests/trips/list-providers']);
            }, 600);
        }).catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
            this.submitted = false;
        });
    }

        // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
        // TripService.currentTrip.field_price = this.offerForm.controls.field_price?.value;
        TripService.currentTrip.field_time = this.offerForm.controls.departure_time?.value;
        TripService.currentTrip.field_numPlace = this.offerForm.controls.number_place?.value;
        TripService.currentTrip.field_description = this.offerForm.controls.description?.value;
        TripService.currentTrip.field_delayDate = this.offerForm.controls.departure_date?.value;

        // console.log(TripService.currentTrip);
        // this.pushofferForm();
    }

    // getLocation(): void{
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position)=>{
    //             this.longitude = position.coords.longitude;
    //             this.latitude = position.coords.latitude;
    //             this.f.latitude.setValue(position.coords.latitude)
    //             this.f.longitude.setValue(position.coords.longitude)
    //         });
    //     } else {
    //        console.log("No support for geolocation")
    //     }
    // }
    
    // map
    zoomIn() {
        if (this.zoom < this.options.maxZoom) this.zoom++;
    }
    
    zoomOut() {
        if (this.zoom > this.options.minZoom) this.zoom--;
    }

    click(event: google.maps.MouseEvent) {
        console.log(event);
        console.log(event.latLng.lat());
        this.f.latitude.setValue(event.latLng.lat())
        this.f.longitude.setValue(event.latLng.lng())

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
                console.log(this.address);
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
        this.infoContent = this.address
        this.infoWindow.open(marker)
    }

    logCenter() {
        console.log(JSON.stringify(this.map.getCenter()))
    }

    onDragStart(e){
        
     }
  
     onDragEnd(){
     }
    
    get_arr_coord(event){
        console.log(event)
        this.f.latitude.setValue(event.latitude)
        this.f.longitude.setValue(event.longitude)
    }

}
