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
import { LocationService } from '../../../../../shared/service/location/location.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
selector: 'app-post-request-trip0',
templateUrl: './post-request-trip0.component.html',
styleUrls: ['./post-request-trip0.component.scss']
})
export class PostRequestTrip0Component implements OnInit {

    @ViewChild('toZone') toZoneWidget: SearchLocationComponent;
    @ViewChild('fromZone') fromZoneWidget: SearchLocationComponent;

    submitted: boolean;
    tripForm: FormGroup; 
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
    list_types: string[];
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

    service_trip = services;
    servs : any[] = [];
    countries: any = [];
    country_code: any;
    cities: any = [];

    currency: string;

    servs$: Observable<any>;
    savingService = false;
    // services: { name: string, value: string }[];

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private tripCreationServ:CreateColisPackageService, 
        private activatedRoute: ActivatedRoute,
        private cdRef : ChangeDetectorRef,
        private offerService : OfferService,
        private translate: TranslateService,
        private locationService:LocationService,
        private route: ActivatedRoute
        // private tripService: TripService
        ) { 
            // this.translate.onLangChange.subscribe(() => {
            //     this.servs$ = this.translate.get('services.PERSONS');
            // });
            this.initService();
            this.translate.onLangChange.subscribe(() => {
                let i: number = -1
                this.servs$ = this.translate.get('services.PERSONS').pipe(
                  map((translations: any) => {
                    return this.service_trip.PERSONS.map((service: string) => {
                        i++;
                        console.log(translations[i])
                        console.log(service)
                        return {
                            name: translations[i],
                            value: service
                        };
                    });
                  })
                );
            });
        }

    ngOnInit(): void {

        console.log(this.route.snapshot.params.service_id)

        this.initPage();
        this.tripForm = this.formBuilder.group({
            'field_place': ["", Validators.required],
            'arrival_place': ["", Validators.required],
            'field_price': [, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            'field_departureDate': [Validators.required],
            'field_departureTime': ['12:00', Validators.required],
            'field_typeof': ["", Validators.required],
            'field_numberPlace': [1, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            'luggage_weight': [Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
            'radius': [Validators.required],
            'field_tripDescription': ["", Validators.required],
            'field_isUrgent': [Validators.required],
            'longitude': [Validators.required],
            'latitude': [Validators.required],
            'arr_latitude': [Validators.required],
            'arr_longitude': [Validators.required],
            'field_country': [Validators.required],
            'field_code': ["", Validators.required]
        });
        // this.getLocation();
        this.get_countries()
        // console.log(this.translate.['PERSONS']) 
        // this.translate.get("services.PERSONS").subscribe(data=>{
            
        //     console.log(data)
        //     this.servs = data;
        // });
        
    // this.servs$ = this.translate.get('services.PERSONS');
        // console.log(this.service_trip['PERSON'].map((service: string) => this.translate.instant('services.' + service)))

    }

    initService(){
        let i: number = -1
        this.servs$ = this.translate.get('services.PERSONS').pipe(
            map((translations: any) => {
                return this.service_trip.PERSONS.map((service: string) => {
                    i++;
                    console.log(translations[i])
                    console.log(service)
                    return {
                        name: translations[i],
                        value: service
                    };
                });
            })
        );
    }

    // getTranslatedServices(category: string): string[] {
    //     return this.service_trip[category].map((service: string) => this.translate.instant('services.' + service));
    // }

    getTranslatedServices(category: string): string[] {
        return this.service_trip[category].map((service: string) => 'services.' + category + '.' + service);
    }

    buildPlaces(){
        this.translate.get("carrier").subscribe(rep=>{
            const txtLang = rep.be_provider_form;
            if(this.slug=="rent") 
                this.list_types = [txtLang.beCompagnyCarrierForm_optgroup2_item1, txtLang.beCompagnyCarrierForm_optgroup2_item2, txtLang.beCompagnyCarrierForm_optgroup2_item3, 
                    txtLang.beCompagnyCarrierForm_optgroup2_item4, txtLang.beCompagnyCarrierForm_optgroup2_item5, txtLang.beCompagnyCarrierForm_optgroup2_item6,
                    txtLang.beCompagnyCarrierForm_optgroup2_item7, txtLang.beCompagnyCarrierForm_optgroup2_item8
                ]
            if(this.slug=="person") 
                this.list_types = [txtLang.beCompagnyCarrierForm_optgroup2_item1, txtLang.beCompagnyCarrierForm_optgroup2_item2, txtLang.beCompagnyCarrierForm_optgroup2_item3, 
                    txtLang.beCompagnyCarrierForm_optgroup2_item4, txtLang.beCompagnyCarrierForm_optgroup2_item5, txtLang.beCompagnyCarrierForm_optgroup2_item6,
                    txtLang.beCompagnyCarrierForm_optgroup2_item7, txtLang.beCompagnyCarrierForm_optgroup2_item8
                ]
        });

    }

    //This method change
    handleType(ev: string){
        console.log(ev);
        this.tripForm.patchValue({field_typeof: ev});
        this.change_typeof = ev;
    }

    ngAfterViewChecked(){
            
        this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
        this.buildPlaces();
        let selected: string;

        if(this.slug=="rent")
        selected = "Rent a car";
        else if(this.slug=="person")
        selected = "Request a taxi";
        else  
        selected = "Hire a vehicle";

        this.tripForm.patchValue({field_typeof: selected});
        
        if(this.change_typeof!==undefined)
        this.tripForm.patchValue({field_typeof: this.change_typeof});

        this.cdRef.detectChanges();

        //console.log(this.slug);
    }

    get f() {
        return this.tripForm.controls;
    }

    submit(){

        this.submitted = true;

        if (this.fromZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of departure `);
            return;
        }
        if (this.toZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of arrival `);
            return;
        }
        if (!this.tripForm.valid) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>${this.translate.instant('post_requests.post_request_colis.post_request_colis0.error')} !\</b>\<br> ${this.translate.instant('post_requests.post_request_colis.post_request_colis0.incomplete_form')}`);
            return;
        }
        
        if (!this.tripForm.valid) {
            return
        }

        console.log("trip : ",this.tripForm.value);
        this.is_form = true;

        this.savingService = true;
        
        // this.tripCreationServ.person.package_name = this.tripForm.value.field_passengerName;
        this.tripCreationServ.person.suggestedPrice = Number(this.tripForm.value.field_price);
        
        this.tripCreationServ.person.is_urgent = this.tripForm.value.field_isUrgent;
        this.tripCreationServ.person.date_departure = this.tripForm.value.field_departureDate+ " "+ this.tripForm.value.field_departureTime;
        this.tripCreationServ.person.title = this.tripForm.value.field_typeof;
        this.tripCreationServ.person.typeof=this.tripForm.value.field_typeof;
        this.tripCreationServ.person.size_piece_nber = this.tripForm.value.field_numberPlace;
        this.tripCreationServ.person.luggage_weight = this.tripForm.value.luggage_weight;
        this.tripCreationServ.person.number_place = this.tripForm.value.field_numberPlace;

        this.tripCreationServ.person.dep_place = {
                                                            type: "Point",
                                                            coordinates: [this.tripForm.value.latitude, this.tripForm.value.longitude]
                                                        };
        ;
        this.tripCreationServ.person.arr_place = {
                                                            type: "Point",
                                                            coordinates: [this.tripForm.value.arr_latitude, this.tripForm.value.arr_longitude]
                                                        };
        this.tripCreationServ.person.country = this.tripForm.value.field_country.code2;
        this.tripCreationServ.person.country_id = this.tripForm.value.field_country._id;
        this.tripCreationServ.person.service_rate = this.tripForm.value.field_country.rate;
        this.tripCreationServ.person.code = this.tripForm.value.field_code;
        //let voitureType:Vehicle=new Vehicle();
        // voitureType.type=this.packageForm.value.field_vehicleType;
        //this.tripCreationServ.person.carTypeList.push(voitureType);

        // this.tripCreationServ.person.suggestedPrice=this.tripForm.value.field_price;
        this.tripCreationServ.person.description = this.tripForm.value.field_tripDescription;
        this.tripCreationServ.person.departure_address=this.tripForm.value.field_place;
        this.tripCreationServ.person.arrival_address=this.tripForm.value.arrival_place;
        this.tripCreationServ.person.from = this.fromZoneWidget.selectedLocation[0];
        this.tripCreationServ.person.to = this.toZoneWidget.selectedLocation[0]
        // this.packageCreationService.package.images=this.widgetUploadFile.getDocumentsList();

        
    // this.tripCreationServ.person=this.tripCreationServ.person;
        console.log("Trip: ",this.tripCreationServ.person);
        // this.packageService.packageCreation(this.packageCreationService.package)
        let data = {
            type: this.f.field_typeof.value,
            weight: this.f.field_numberPlace.value,
            longitude: this.f.longitude.value,
            latitude: this.f.latitude.value,
            number_place: this.f.field_numberPlace.value,
        }
        this.tripCreationServ.save_person_serv().then((result:any)=>{
            this.submitted=false;
            console.log(result)
            // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Service was created successfully')
            setTimeout(() => {
                this.router.navigate(['/my-services/historic-services']);
            }, 600);
        }).catch((error) => {
            this.savingService = false;
            console.log(error);
            if(error.error.resultCode==-1) {
                this.notification.showNotification('top', 'center', 'primary', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.error.message);
                this.router.navigate(['/my-services/historic-services']);
            } 
            else this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
            this.submitted = false;
        });
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


    callApi(Longitude: number, Latitude: number){
        const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
        //Call API
    }


    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
        TripService.currentTrip.field_price = this.tripForm.controls.field_price?.value;
        TripService.currentTrip.field_time = this.tripForm.controls.field_departureTime?.value;
        TripService.currentTrip.field_numPlace = this.tripForm.controls.field_numberPlace?.value;
        TripService.currentTrip.field_description = this.tripForm.controls.field_tripDescription?.value;
        TripService.currentTrip.field_delayDate = this.tripForm.controls.field_departureDate?.value;

        // console.log(TripService.currentTrip);
    }

    get_coord(event){
        console.log(event)
        this.f.latitude.setValue(event.latitude)
        this.f.longitude.setValue(event.longitude)
    }

    get_arr_coord(event){
        console.log(event)
        this.f.arr_latitude.setValue(event.latitude)
        this.f.arr_longitude.setValue(event.longitude)
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
        // console.log(country)
        // console.log(this.country_code)
        this.locationService.find_cities_by_country(val)
        .then((res) => {
            console.log(res);
            this.cities = res.result;
        })
    }

}
