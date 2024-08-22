import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Vehicle } from '../../../../../shared/entity/provider';
import { CreateColisPackageService } from '../../../../../shared/service/back-office/create-package.service';
import { TripService } from '../../../../../shared/service/back-office/trip.service';
import { NotificationService } from '../../../../../shared/service/notification/notification.service';
import { SearchLocationComponent } from '../../../../components/search-location/search-location.component';

import * as moment from 'moment';
import { OfferService } from '../../../../../shared/service/back-office/offer.service';
// import { I } from '@angular/cdk/keycodes';
import services from '../../../../../../assets/data/service.json';
import { CreateRentalService } from '../../../../../shared/service/back-office/create-vehicle.service';
import { LocationService } from '../../../../../shared/service/location/location.service';

@Component({
    selector: 'app-post-request-rent0',
    templateUrl: './post-request-rent0.component.html',
    styleUrls: ['./post-request-rent0.component.scss']
})
export class PostRequestRent0Component implements OnInit {

    @ViewChild('fromZone') fromZoneWidget: SearchLocationComponent;

    submitted: boolean;
    rentForm: FormGroup;
    is_form: boolean;
    // owner: string = 'Flambel SANOU';
    status: string = 'Draft';
    title = 'New trip request ';
    titleUser: string;
    user1 = true;
    user2 = false;
    user3 = false;
    visible = true;
    current_date: string;
    slug: string;
    change_typeof: string;

    longitude?: number;
    latitude?: number;
    distance: any = [
        {dist: 1, value: 1000},
        {dist: 2, value: 2000},
        {dist: 5, value: 5000},
        {dist: 10, value: 10000},
        {dist: 20, value: 20000},
        {dist: 30, value: 30000},
        {dist: 40, value: 40000},
        {dist: 50, value: 50000},
        {dist: 100, value: 100000},
        {dist: 500, value: 500000},
        {dist: 800, value: 800000},
        {dist: 1000, value: 1000000},
        {dist: 2000, value: 2000000},
    ]

    service_rent = services;
    countries: any = [];
    country_code: any;
    currency: string;

    constructor(
            private router: Router,
            private formBuilder: FormBuilder,
            private notification: NotificationService,
            private rentCreationServ:CreateRentalService,
            private activatedRoute: ActivatedRoute,
            private cdRef : ChangeDetectorRef,
            private route: ActivatedRoute,
            private locationService:LocationService,
            // private rentService: RentService
        ) { }

    ngOnInit(): void {

        this.initPage();
        this.rentForm = this.formBuilder.group({
            'field_typeof': ['', Validators.required],
            'field_place': [''],
            'field_price': [this.rentCreationServ.rental.suggestedPrice, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            'field_departureDate': ['', Validators.required],
            'returnDate': ['', Validators.required],
            'field_departureTime': ['12:00', Validators.required],
            'returnTime': ['12:00', Validators.required],
            'field_numberPlace': [1, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            'radius': [10000],
            'field_tripDescription': [this.rentCreationServ.rental.description ],
            'field_isUrgent': [this.rentCreationServ.rental.is_urgent ],
            'longitude': [0 ],
            'latitude': [0 ],
            'field_country': [this.rentCreationServ.rental.country, Validators.required],
            'field_code': [this.rentCreationServ.rental.code, Validators.required],
            
        });

        this.get_countries()

    }

    //This method change
    handleType(ev: string){
        console.log(ev);
        this.rentForm.patchValue({field_typeof: ev});
        this.change_typeof = ev;
    }

    ngAfterViewChecked()
    {
        this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
        let selected: string;

        if(this.slug=="rent")
        selected = "Rent a car";
        else if(this.slug=="person")
        selected = "Request a taxi";
        else  
        selected = "Hire a vehicle";

        this.rentForm.patchValue({field_typeof: selected});
        
        if(this.change_typeof!==undefined)
        this.rentForm.patchValue({field_typeof: this.change_typeof});

        this.cdRef.detectChanges();

        //console.log(this.slug);
    }


    get f() {
        return this.rentForm.controls;
    }

    submit(){

        
        if (this.fromZoneWidget.selectedLocation.length < 1) {
        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of collection `);
        return;
        }
        
        // console.log("trip : ",this.rentForm.value);
        this.is_form = true;
        if (!this.rentForm.valid) {
        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Check your inputs form and try again`);
        return;
        }

        // this.rentCreationServ.vehicle.package_name = this.rentForm.value.field_passengerName;
        this.rentCreationServ.rental.suggestedPrice = this.rentForm.value.field_price;
        
        this.rentCreationServ.rental.is_urgent = this.rentForm.value.field_isUrgent;
        this.rentCreationServ.rental.date_rent = this.rentForm.value.field_departureDate+ " "+ this.rentForm.value.field_departureTime;
        this.rentCreationServ.rental.return_date = this.rentForm.value.returnDate+ " "+ this.rentForm.value.returnTime;
        this.rentCreationServ.rental.title = this.rentForm.value.field_typeof;
        this.rentCreationServ.rental.typeof=this.rentForm.value.field_typeof;
        this.rentCreationServ.rental.number_place = this.rentForm.value.field_numberPlace;
        this.rentCreationServ.rental.collection_address = this.rentForm.value.field_place;

        this.rentCreationServ.rental.collection_place = this.fromZoneWidget.selectedLocation[0];
        this.rentCreationServ.rental.dep_place = {
                                                    type: "Point",
                                                    coordinates: [this.rentForm.value.latitude, this.rentForm.value.longitude]
                                                };
        this.rentCreationServ.rental.country = this.rentForm.value.field_country.code2;
        this.rentCreationServ.rental.service_rate = this.rentForm.value.field_country.rate;
        this.rentCreationServ.rental.code = this.rentForm.value.field_code;
        this.rentCreationServ.rental.country_id = this.rentForm.value.field_country._id; 
        //let voitureType:Vehicle=new Vehicle();
        // voitureType.type=this.packageForm.value.field_vehicleType;
        //this.rentCreationServ.vehicle.carTypeList.push(voitureType);

        // this.rentCreationServ.vehicle.suggestedPrice=this.rentForm.value.field_price;
        this.rentCreationServ.rental.description = this.rentForm.value.field_tripDescription;
        // this.rentCreationServ.vehicle.collection_address = this.fromZoneWidget.selectedLocation[0];
        // this.packageCreationService.package.images=this.widgetUploadFile.getDocumentsList();

        this.submitted = true;
    // this.rentCreationServ.vehicle=this.rentCreationServ.vehicle;
        console.log("Trip: ",this.rentCreationServ.rental);
        // this.packageService.packageCreation(this.packageCreationService.package)
        let data = {
            type: this.f.field_typeof.value,
            weight: this.f.field_numberPlace.value,
            longitude: this.f.longitude.value,
            latitude: this.f.latitude.value,
            number_place: this.f.field_numberPlace.value,
        }
        this.rentCreationServ.save_rent_serv().then((result:any)=>{
            this.submitted=false;
            console.log(result)
            // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Service was created successfully')
            setTimeout(() => {
                this.router.navigate(['/my-services/historic-services']);
            }, 600);
        }).catch((error) => {
            console.log(error);
            if(error.error.resultCode==-1) {
                this.notification.showNotification('top', 'center', 'primary', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.error.message);
                this.router.navigate(['/my-services/historic-services']);
            } 
            else this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
            this.submitted = false;
        });
        // this.rentCreationServ.findProvider().then((result:any)=>{
        //     this.submitted=false;
        //     // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Service was created successfully')
        //     setTimeout(() => {
        //     this.router.navigate(['/post-requests/trips/list-providers']);
        //     }, 600);
        // }).catch((error) => {
        //     console.log(error);
        //     this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        //     this.submitted = false;
        // });
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

    next() {
        if (this.user1) {
        this.user2 = true;
        this.user1 = false;
        this.user3 = false;
        } else if (this.user2) {
        this.user3 = true;
        this.user1 = false;
        this.user2 = false;
        }

    }


    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
        TripService.currentTrip.field_price = this.rentForm.controls.field_price?.value;
        TripService.currentTrip.field_time = this.rentForm.controls.field_departureTime?.value;
        TripService.currentTrip.return_time = this.rentForm.controls.returnTime?.value;
        TripService.currentTrip.field_numPlace = this.rentForm.controls.field_numberPlace?.value;
        TripService.currentTrip.field_description = this.rentForm.controls.field_tripDescription?.value;
        TripService.currentTrip.field_delayDate = this.rentForm.controls.field_departureDate?.value;
        TripService.currentTrip.field_returnDate = this.rentForm.controls.returnDate?.value;

    }

    get_coord(event){
        console.log(event)
        this.f.latitude.setValue(event.latitude)
        this.f.longitude.setValue(event.longitude)
    }


    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            console.log(res);
            this.countries = res.result;
        })
    }

    get_cities(val){
        let country = this.f.field_country.value;
        this.country_code = country.code2;
        this.currency = country.currency.name;
    }

}
