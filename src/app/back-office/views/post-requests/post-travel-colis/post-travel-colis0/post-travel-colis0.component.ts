import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Package, ColisPackage } from '../../../../../shared/entity/package';
import { PackageService } from '../../../../../shared/service/back-office/package.service';
import { SearchLocationComponent } from '../../../../components/search-location/search-location.component';
import { InputFileUploadListComponent } from '../../../../components/input-file-upload-list/input-file-upload-list.component';
// import { Vehicle } from '../../../../../shared/entity/provider';
import { CreateColisPackageService } from '../../../../../shared/service/back-office/create-package.service';
import { NotificationService } from '../../../../../shared/service/notification/notification.service';
import services from '../../../../../../assets/data/service.json';
import * as moment from 'moment';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LocationService } from '../../../../../shared/service/location/location.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
    selector: 'app-post-travel-colis0',
    templateUrl: './post-travel-colis0.component.html',
    styleUrls: ['./post-travel-colis0.component.scss']
})
export class PostTravelColis0Component implements OnInit {
    
    submitted: boolean=false;
    packageForm: FormGroup;
    title = 'New package travel ';
    titleUser: string;
    visible = true;
    current_date : string;
    images: any = [];
    countries: any = [];
    provider_docs_field: File[] = [];

    @ViewChild('toZone') toZoneWidget: SearchLocationComponent;
    @ViewChild('fromZone') fromZoneWidget: SearchLocationComponent;
    @ViewChild('uploadFile') widgetUploadFile: InputFileUploadListComponent;

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

    service_travel_colis = services;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private packageCreationService:CreateColisPackageService,
        private packageService:PackageService,
        private locationService:LocationService,
        private sanitizer: DomSanitizer,
        private notification:NotificationService) { }

    ngOnInit(): void 
    {
        this.current_date = moment().format('YYYY-MM-DD');
        this.packageForm = this.formBuilder.group({
            'field_code': [this.packageCreationService.travel_package.title, Validators.required],
            'departure_address': [''],
            'arrival_address': [''],
            'field_price': [this.packageCreationService.travel_package.suggestedPrice, Validators.required],
            'field_isWeak': [this.packageCreationService.travel_package.is_weak],
            'field_isUrgent': [this.packageCreationService.travel_package.is_urgent],
            'field_delayDate': [this.packageCreationService.travel_package.date_arrival, Validators.required],
            'field_recipientName': [this.packageCreationService.travel_package.receiver.name],
            'field_recipientContact': [this.packageCreationService.travel_package.receiver.contact],
            'field_recipientEmail': [this.packageCreationService.travel_package.receiver.email],
            'field_recipientAddress': [this.packageCreationService.travel_package.receiver.address],
            'field_typeof': [this.packageCreationService.travel_package.typeof, Validators.required],
            'field_numberPackage': [this.packageCreationService.travel_package.size_piece_nber, Validators.required],
            'latitude': [this.packageCreationService.travel_package.latitude, Validators.required],
            'longitude': [this.packageCreationService.travel_package.longitude, Validators.required],
            'field_heightPackages': [this.packageCreationService.travel_package.size_heigth, Validators.compose([Validators.pattern("^[0-9]*$")])],
            'field_widhtPackage': [this.packageCreationService.travel_package.size_width, Validators.compose([Validators.pattern("^[0-9]*$")])],
            'field_weightPackage': [this.packageCreationService.travel_package.size_depth, Validators.compose([Validators.pattern("^[0-9]*$")])],
            'field_lengthPackage': [this.packageCreationService.travel_package.size_piece_length, Validators.compose([Validators.pattern("^[0-9]*$")])],
            'field_descriptionPackage': [this.packageCreationService.travel_package.description, Validators.required],
            'arr_latitude': [this.packageCreationService.travel_package.dep_place, Validators.required],
            'field_country': [this.packageCreationService.travel_package.country, Validators.required],
            'arr_longitude': [this.packageCreationService.travel_package.arr_place, Validators.required]
        });
        this.get_countries();

    }

    get f() {
        return this.packageForm.controls;
    }

    submit() {
        console.log("Package: ",this.packageForm.value)
        if (this.fromZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of departure `);
            return;
        }
        if (this.toZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of arrival `);
            return;
        }
        
        // console.log("package: ",this.packageForm.value)
        if (!this.packageForm.valid) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Please verify the filling form is correct then try again`);
            return;
        }

        this.packageCreationService.travel_package.title = this.packageForm.value.field_typeof;
        this.packageCreationService.travel_package.suggestedPrice=this.packageForm.value.field_price;
        
        this.packageCreationService.travel_package.is_weak=this.packageForm.value.field_isWeak;
        this.packageCreationService.travel_package.is_urgent=this.packageForm.value.field_isUrgent;
        this.packageCreationService.travel_package.date_arrival=this.packageForm.value.field_delayDate;
        this.packageCreationService.travel_package.code=this.packageForm.value.field_code;
        this.packageCreationService.travel_package.receiver.name=this.packageForm.value.field_recipientName;
        this.packageCreationService.travel_package.receiver.contact=this.packageForm.value.field_recipientContact;
        this.packageCreationService.travel_package.receiver.email=this.packageForm.value.field_recipientEmail;
        this.packageCreationService.travel_package.receiver.address=this.packageForm.value.field_recipientAddress;
        // this.packageCreationService.travel_package.receiver.phone_number=this.packageForm.value.field_recipientPhoneNumber;
        this.packageCreationService.travel_package.typeof=this.packageForm.value.field_typeof;
        this.packageCreationService.travel_package.size_piece_nber=this.packageForm.value.field_numberPackage;
        this.packageCreationService.travel_package.latitude = this.packageForm.value.latitude;
        this.packageCreationService.travel_package.longitude = this.packageForm.value.longitude;
        this.packageCreationService.travel_package.images = this.images;
        this.packageCreationService.travel_package.dep_place = {
                                                            type: "Point",
                                                            coordinates: [this.packageForm.value.latitude, this.packageForm.value.longitude]
                                                        };
        ;
        this.packageCreationService.travel_package.arr_place = {
                                                            type: "Point",
                                                            coordinates: [this.packageForm.value.arr_latitude, this.packageForm.value.arr_longitude]
                                                        };
                                                        
        this.packageCreationService.travel_package.suggestedPrice=this.packageForm.value.field_price;
        this.packageCreationService.travel_package.size_width=this.packageForm.value.field_widhtPackage;
        this.packageCreationService.travel_package.size_depth=this.packageForm.value.field_weightPackage;
        this.packageCreationService.travel_package.size_heigth=this.packageForm.value.field_heightPackages;    
        this.packageCreationService.travel_package.size_piece_length=this.packageForm.value.field_lengthPackage;
        this.packageCreationService.travel_package.description=this.packageForm.value.field_descriptionPackage;
        this.packageCreationService.travel_package.from=this.fromZoneWidget.selectedLocation[0];
        this.packageCreationService.travel_package.to=this.toZoneWidget.selectedLocation[0] 
        this.packageCreationService.travel_package.country = this.packageForm.value.field_country.code2;
        this.packageCreationService.travel_package.service_rate = this.packageForm.value.field_country.rate;
        this.packageCreationService.travel_package.geo = {
            type: "Point",
            coordinates: [this.f.latitude.value, this.f.longitude.value]
        }
            
        this.packageCreationService.travel_package=this.packageCreationService.travel_package;
        this.submitted=true;
        console.log("Package: ",this.packageCreationService.travel_package)
        let data = {
            type: this.f.field_typeof.value,
            longitude: this.f.longitude.value,
            latitude: this.f.latitude.value,
        }
        // this.packageService.packageCreation(this.packageCreationService.travel_package)
        this.packageCreationService.save_travel_package_serv()
        .then((result:any)=>{
            this.submitted=false;
            // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Service was created successfully')
            setTimeout(() => {
            this.router.navigate(['/my-services/historic-services']);
            }, 600);
        })
        .catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
            this.submitted = false;
        });
    }

    callApi(Longitude: number, Latitude: number){
        const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
        //Call API
    }

    // fileUpload(event){
    //     console.log(event);
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         console.log(reader.result);
    //         this.images.push(reader.result)
    //     };
    //     // console.log(this.images)
    // }

    async fileUpload(event) {
        const file = event.target.files[0];
    
        if (file) {
            const response = await fetch(URL.createObjectURL(file));
            const blob = await response.blob();
            const newFile = new File([blob], file.name, { type: file.type });
    
            const imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
    
            // this.imagePath.push(imagePath);
            this.provider_docs_field.push(newFile);
        }
    }


    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
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
}
