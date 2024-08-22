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
import { CarrierService } from '../../../../../shared/service/back-office/carrier.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../../shared/service/language/language.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var $: any;

@Component({
    selector: 'app-post-request-colis0',
    templateUrl: './post-request-colis0.component.html',
    styleUrls: ['./post-request-colis0.component.scss']
})
export class PostRequestColis0Component implements OnInit {
    
    // packageLoaded:ColisPackage=PackageService.currentPackage ;

     
    submitted: boolean=false;
    packageForm: FormGroup;
    title = 'New package request ';
    titleUser: string;
    visible = true;
    savingPackage = false;
    current_date : string;
    images: any = [];
    countries: any = []; 
    cities: any = []; 
    country_code: any;

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

    service_colis = services;
    currency: string;

    provider_docs_field: File[] = [];
    inventories: any[] = [];
    inventory: any;
    isRemoval: boolean = false;

    servs$: Observable<any>;
    maxFileSize: number = 1 * 1024 * 1024;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private packageCreationService:CreateColisPackageService,
        private packageService:PackageService,
        private locationService:LocationService,
        private sanitizer: DomSanitizer,
        private carrierServ: CarrierService,
        private translate: TranslateService,
        private language: LanguageService,
        private notification:NotificationService) {
            this.initService();
            this.translate.onLangChange.subscribe(() => {
                let i: number = -1
                this.servs$ = this.translate.get('services.TRANSPORTER').pipe(
                  map((translations: any) => {
                    return this.service_colis.TRANSPORTER.map((service: string) => {
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
            // console.log(this.language.getLanguage());
            // const currentLang = this.translate.currentLang;
            // console.log('Current Language:1111111111111111111');
            // this.language.getLanguage()
            // this.language.languageSubject.subscribe((lang) => {
            //     console.log('222222222222222222222222222222');
            //     console.log(lang);
            //     this.carrierServ.loadInventory(lang).subscribe((rep: any)=>{
            //         console.log(rep);
            //         this.inventories = rep;
            //     });
            // })
        }

    ngOnInit(): void 
    {
        
        // console.log(services)
        // console.log(services.TRANSPORTER)
        // console.log(services["KARRYNGO TRAVELER"])
        // this.getLocation();
        this.current_date = moment().format('YYYY-MM-DD');
        // this.packageForm = this.formBuilder.group({
        //     // 'field_name': [this.packageCreationService.package.title, Validators.required],
        //     // 'ship_type': [''],
        //     'departure_address': [''],
        //     'arrival_address': [''],
        //     'field_price': [this.packageCreationService.package.suggestedPrice, Validators.required],
        //     'field_isWeak': [this.packageCreationService.package.is_weak],
        //     'field_isUrgent': [this.packageCreationService.package.is_urgent],
        //     'field_delayDate': [this.packageCreationService.package.date_arrival, Validators.required],
        //     'field_recipientName': [this.packageCreationService.package.receiver.name],
        //     'field_recipientContact': [this.packageCreationService.package.receiver.contact],
        //     'field_recipientEmail': [this.packageCreationService.package.receiver.email],
        //     'field_recipientAddress': [this.packageCreationService.package.receiver.address],
        //     // 'field_recipientPhoneNumber': [this.packageCreationService.package.receiver.phone_number],
        //     'field_typeof': [this.packageCreationService.package.typeof, Validators.required],
        //     'field_numberPackage': [this.packageCreationService.package.size_piece_nber, Validators.required],
        //     'latitude': [this.packageCreationService.package.latitude, Validators.required],
        //     'longitude': [this.packageCreationService.package.longitude, Validators.required],
        //     // 'field_vehicleType': [this.packageCreationService.package.carTypeList.length>0?this.packageCreationService.package.carTypeList[0].type:"",Validators.required ],
        //     'field_heightPackages': [this.packageCreationService.package.size_heigth, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_widhtPackage': [this.packageCreationService.package.size_width, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_weightPackage': [this.packageCreationService.package.size_depth, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_lengthPackage': [this.packageCreationService.package.size_piece_length, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_descriptionPackage': [this.packageCreationService.package.description, Validators.required],
        //     'arr_latitude': [this.packageCreationService.package.dep_place, Validators.required],
        //     'arr_longitude': [this.packageCreationService.package.arr_place, Validators.required],
        //     'field_country': [this.packageCreationService.package.country],
        //     'field_city': [this.packageCreationService.package.city],
        //     'field_code': [this.packageCreationService.package.code, Validators.required]
        // });
        // this.packageForm = this.formBuilder.group({
        //     // 'field_name': [this.packageCreationService.package.title, Validators.required],
        //     // 'ship_type': [''],
        //     'departure_address': [, Validators.required],
        //     'arrival_address': [, Validators.required],
        //     'field_price': [this.packageCreationService.package.suggestedPrice, Validators.required],
        //     'field_isWeak': [this.packageCreationService.package.is_weak],
        //     'field_isUrgent': [this.packageCreationService.package.is_urgent],
        //     'field_delayDate': [this.packageCreationService.package.date_arrival, Validators.required],
        //     'field_recipientName': [this.packageCreationService.package.receiver.name],
        //     'field_recipientContact': [this.packageCreationService.package.receiver.contact],
        //     'field_recipientEmail': [this.packageCreationService.package.receiver.email],
        //     'field_recipientAddress': [this.packageCreationService.package.receiver.address],
        //     // 'field_recipientPhoneNumber': [this.packageCreationService.package.receiver.phone_number],
        //     'field_typeof': [this.packageCreationService.package.typeof, Validators.required],
        //     'field_numberPackage': [this.packageCreationService.package.size_piece_nber, Validators.required],
        //     'latitude': [this.packageCreationService.package.latitude, Validators.required],
        //     'longitude': [this.packageCreationService.package.longitude, Validators.required],
        //     // 'field_vehicleType': [this.packageCreationService.package.carTypeList.length>0?this.packageCreationService.package.carTypeList[0].type:"",Validators.required ],
        //     'field_heightPackages': [this.packageCreationService.package.size_heigth, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_widhtPackage': [this.packageCreationService.package.size_width, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_weightPackage': [this.packageCreationService.package.size_depth, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_lengthPackage': [this.packageCreationService.package.size_piece_length, Validators.compose([Validators.pattern("^[0-9]*$")])],
        //     'field_descriptionPackage': [this.packageCreationService.package.description, Validators.required],
        //     'arr_latitude': [this.packageCreationService.package.dep_place, Validators.required],
        //     'arr_longitude': [this.packageCreationService.package.arr_place, Validators.required],
        //     'field_country': [this.packageCreationService.package.country],
        //     'field_city': [this.packageCreationService.package.city],
        //     'field_code': [this.packageCreationService.package.code, Validators.required]
        // });
        this.packageForm = this.formBuilder.group({
            // 'field_name': [this.packageCreationService.package.title, Validators.required],
            // 'ship_type': [''],
            'departure_address': [, Validators.required],
            'arrival_address': [""],
            'field_price': [this.packageCreationService.package.suggestedPrice, Validators.required],
            'field_isWeak': [this.packageCreationService.package.is_weak],
            'field_isUrgent': [this.packageCreationService.package.is_urgent],
            'field_delayDate': [this.packageCreationService.package.date_arrival, Validators.required],
            'field_recipientName': [this.packageCreationService.package.receiver.name, Validators.required],
            'field_recipientContact': [this.packageCreationService.package.receiver.contact, Validators.required],
            'field_recipientEmail': [this.packageCreationService.package.receiver.email, Validators.required],
            'field_recipientAddress': [this.packageCreationService.package.receiver.address, Validators.required],
            // 'field_recipientPhoneNumber': [this.packageCreationService.package.receiver.phone_number],
            'field_typeof': [this.packageCreationService.package.typeof, Validators.required],
            'field_numberPackage': [this.packageCreationService.package.size_piece_nber, Validators.required],
            'latitude': [this.packageCreationService.package.latitude, Validators.required],
            'longitude': [this.packageCreationService.package.longitude, Validators.required],
            // 'field_vehicleType': [this.packageCreationService.package.carTypeList.length>0?this.packageCreationService.package.carTypeList[0].type:"",Validators.required ],
            'field_heightPackages': [this.packageCreationService.package.size_heigth,[Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
            'field_widhtPackage': [this.packageCreationService.package.size_width, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
            // 'field_weightPackage': [this.packageCreationService.package.size_depth, Validators.compose([Validators.pattern("^[0-9]*$")])],
            'field_weightPackage': [ this.packageCreationService.package.size_depth, [Validators.required, Validators.pattern("^[1-9][0-9]*$")] ],
            'field_lengthPackage': [this.packageCreationService.package.size_piece_length, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
            'field_descriptionPackage': [this.packageCreationService.package.description, Validators.required],
            'arr_latitude': [this.packageCreationService.package.dep_place, Validators.required],
            'arr_longitude': [this.packageCreationService.package.arr_place, Validators.required],
            'field_country': [this.packageCreationService.package.country, Validators.required],
            'field_city': [this.packageCreationService.package.city],
            'field_code': [this.packageCreationService.package.code, Validators.required]
        });
        this.get_countries();
        // this.carrierServ.loadInventory(this.lang).subscribe((rep: any)=>{
        //     console.log(rep);
        //     this.inventories = rep;
        // });

    }

    initService(){
        let i: number = -1
        this.servs$ = this.translate.get('services.TRANSPORTER').pipe(
            map((translations: any) => {
                return this.service_colis.TRANSPORTER.map((service: string) => {
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

    get f() {
        return this.packageForm.controls;
    }

    submit() {
        this.submitted=true;
        console.log("Package: ",this.packageForm.value)
        console.log("provider docs field: ",this.provider_docs_field)
        if (this.fromZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of departure `);
            return;
        }
        if (this.toZoneWidget.selectedLocation.length < 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You must specify the place of arrival `);
            return;
        }
        // if (this.widgetUploadFile.getDocumentsList().length < 1) {
        //   this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> you must provide at least one picture of your package `);
        //   return;
        // }
        // console.log("package: ",this.packageForm.value)
        if (!this.packageForm.valid) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> ${this.translate.instant('post_requests.post_request_colis.post_request_colis0.incomplete_form')}`);
            return;
        }
        if(this.provider_docs_field.length==0) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Documents missing`);
            return;
        }

        this.savingPackage = true;

        this.packageCreationService.package.title = this.packageForm.value.field_typeof;
        this.packageCreationService.package.suggestedPrice=this.packageForm.value.field_price;
        
        this.packageCreationService.package.is_weak=this.packageForm.value.field_isWeak;
        this.packageCreationService.package.is_urgent=this.packageForm.value.field_isUrgent;
        this.packageCreationService.package.date_arrival=this.packageForm.value.field_delayDate;
        // this.packageCreationService.package.package_name=this.packageForm.value.field_name;
        this.packageCreationService.package.receiver.name=this.packageForm.value.field_recipientName;
        this.packageCreationService.package.receiver.contact=this.packageForm.value.field_recipientContact;
        this.packageCreationService.package.receiver.email=this.packageForm.value.field_recipientEmail;
        this.packageCreationService.package.receiver.address=this.packageForm.value.field_recipientAddress;
        // this.packageCreationService.package.receiver.phone_number=this.packageForm.value.field_recipientPhoneNumber;
        this.packageCreationService.package.typeof=this.packageForm.value.field_typeof;
        this.packageCreationService.package.size_piece_nber=this.packageForm.value.field_numberPackage;
        this.packageCreationService.package.latitude = this.packageForm.value.latitude;
        this.packageCreationService.package.longitude = this.packageForm.value.longitude;
        this.packageCreationService.package.images = this.images;
        this.packageCreationService.package.dep_place = {
                                                            type: "Point",
                                                            coordinates: [this.packageForm.value.latitude, this.packageForm.value.longitude]
                                                        };
        ;
        this.packageCreationService.package.arr_place = {
                                                            type: "Point",
                                                            coordinates: [this.packageForm.value.arr_latitude, this.packageForm.value.arr_longitude]
                                                        };
        this.packageCreationService.package.country = this.packageForm.value.field_country.code2;
        this.packageCreationService.package.country_id = this.packageForm.value.field_country._id; 
        this.packageCreationService.package.service_rate = this.packageForm.value.field_country.rate;
        this.packageCreationService.package.city = this.packageForm.value.field_city;
        this.packageCreationService.package.code = this.packageForm.value.field_code;

        // let voitureType:Vehicle=new Vehicle();
        // voitureType.type=this.packageForm.value.field_vehicleType;

        // this.packageCreationService.package.carTypeList.push(voitureType);
        this.packageCreationService.package.suggestedPrice=this.packageForm.value.field_price;
        this.packageCreationService.package.size_width=this.packageForm.value.field_widhtPackage;
        this.packageCreationService.package.size_depth=this.packageForm.value.field_weightPackage;
        this.packageCreationService.package.size_heigth=this.packageForm.value.field_heightPackages;    
        this.packageCreationService.package.size_piece_length=this.packageForm.value.field_lengthPackage;
        this.packageCreationService.package.description=this.packageForm.value.field_descriptionPackage;
        this.packageCreationService.package.departure_address=this.packageForm.value.departure_address;
        this.packageCreationService.package.from=this.fromZoneWidget.selectedLocation[0];
        this.packageCreationService.package.to=this.toZoneWidget.selectedLocation[0] 
        // this.packageCreationService.package.inventory = this.inventory;
        // this.packageCreationService.package.images=this.widgetUploadFile.getDocumentsList();
        // this.packageCreationService.package.from.address = this.packageForm.value.departure_address;
        // this.packageCreationService.package.to.address = this.packageForm.value.arrival_address;
        // if(this.packageForm.value.departure_address!==''){
        // }
        this.packageCreationService.package.geo = {
            type: "Point",
            coordinates: [this.f.latitude.value, this.f.longitude.value]
        }
            
        this.packageCreationService.package=this.packageCreationService.package;
        // this.submitted=true;
        console.log("Package: ",this.packageCreationService.package)
        let data = {
            type: this.f.field_typeof.value,
            longitude: this.f.longitude.value,
            latitude: this.f.latitude.value,
        }

        const formData = new FormData();
        for (let i = 0; i < this.provider_docs_field.length; i++) {
            formData.append('files', this.provider_docs_field[i]);
        }

        // this.packageService.packageCreation(this.packageCreationService.package)
        this.packageCreationService.savePackage(formData)
        .then((result:any)=>{
            this.submitted=false; 
            // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Service was created successfully')
            setTimeout(() => {
                this.router.navigate(['/my-services/historic-services']);
            }, 600);
        })
        .catch((error) => {
            this.savingPackage = false;
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
            this.submitted = false;
        });

        // this.packageCreationService.findProvider()
        // .then((result:any)=>{
        //     this.submitted=false;
        //     // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Service was created successfully')
        //     setTimeout(() => {
        //     this.router.navigate(['/post-requests/packages/list-providers']);
        //     }, 600);
        // })
        // .catch((error) => {
        //     console.log(error);
        //     this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        //     this.submitted = false;
        // });

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
    async removeFile(event) {
        const file = event?.target?.files[0] || null;
        if (file) {
            const response = await fetch(URL.createObjectURL(file));
            const blob = await response.blob();
            const itemToRemove = new File([blob], file.name, { type: file.type });
            // console.log(itemToRemove)
            this.provider_docs_field = this.provider_docs_field.filter(item => item !== itemToRemove);
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

    onClose(){}

    onSelectChange(event: Event): void {
        // Your logic when the select value changes
        // console.log('Selected value:', this.packageForm.value.field_typeof);
        // Call your method or perform other actions here
        if(this.packageForm.value.field_typeof == "Removals") this.isRemoval = true;
        else this.isRemoval = false;
    }

    //This method is used to make inventory view
    openInventoryView(){
        // this.isRemoval = true;
        this.carrierServ.loadInventory(this.language.getLanguage()).subscribe((rep: any)=>{
            console.log(rep);
            this.inventories = rep;
        });
    }

    //This method is used to confirm list of inventories
    validateInventory(){
        console.log(this.inventories);
        const result = this.buildInventoryToString();
        console.log(result)
        this.inventory = result;

        // this.modal.dismiss(JSON.stringify(result));
    }

    private buildInventoryToString(): any{

        let result: any[] = [];
        for (let k = 0; k < this.inventories.length; k++) {
            let element = this.inventories[k];
            let obj_element = {};
            // result+= '\n'+element.name+': \n \n';
            obj_element['name'] = element.name;
            obj_element["items"] = [];
            for (let j = 0; j < element.items.length; j++) {
                const objet = element.items[j];
                if(objet.quantity!=0 && objet.quantity!= ""){
                    obj_element["items"].push({name: objet.name, quantity: objet.quantity});
                }
                    // result+= objet.name+' ('+objet.quantity+') \n';
            }

            result.push(obj_element);
        }

        return result;
    }

}
