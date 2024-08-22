    import { Vehicle } from './../../../../shared/entity/provider';
    // import { ENTER, COMMA } from '@angular/cdk/keycodes';
    import { ElementRef, OnInit, TemplateRef } from '@angular/core';
    import { AfterViewInit, ViewChild } from '@angular/core';
    import { Component } from '@angular/core';
    import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
    // import { MatChipInputEvent } from '@angular/material/chips';
    // import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
    import { Router } from '@angular/router';
    // import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
    // import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
    // import { Observable } from 'rxjs';
    // import { map, startWith } from 'rxjs/operators';
    import { Address, Provider, ServiceOfProvider, Zone, Document } from '../../../../shared/entity/provider';
    import { ProviderService } from '../../../../shared/service/back-office/provider.service';
    import { ZoneService } from '../../../../shared/service/zone/zone.service';
    // import { MatDialog } from '@angular/material';
    import { SearchLocationComponent } from '../../../components/search-location/search-location.component';
    // import { InputFileUploadComponent } from '../../../components/input-file-upload-list/input-file-upload/input-file-upload.component';
    import { InputFileUploadListComponent } from '../../../components/input-file-upload-list/input-file-upload-list.component';
    import service from '../../../../../assets/data/services.json'
    import company_service from '../../../../../assets/data/company_services.json'
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
    declare var $: any;

    @Component({
    // tslint:disable-next-line:component-selector
    selector: 'be-provider-form',
    templateUrl: 'be-provider-form.component.html',
    styleUrls: ['be-provider-form.component.scss'],
    })
    // tslint:disable-next-line:component-class-suffix
    export class BeProviderFormComponent implements OnInit, AfterViewInit {
    submitted: boolean = false;

    //list of selected locations
    selectedLocations: Zone[] = [];
    tabList = [];
    //list of location
    locations: Zone[] = [];

    //search location component
    @ViewChild("personnalZone") personnalWidgetZone: SearchLocationComponent;
    @ViewChild("compagnyZone") compagnyWidgetZone: SearchLocationComponent;

    //upload file component
    @ViewChild("personnalUploadFile") personnalWidgetUploadFile: InputFileUploadListComponent;
    @ViewChild("compagnyUploadFile") compagnyWidgetUploadFile: InputFileUploadListComponent;

    private objUser: Provider;
    bePersonnalCarrierForm: FormGroup;
    beCompagnyCarrierForm: FormGroup;

    isCompagnyAccount = false;
    waitForSubmittionProviderPersonnalForm: boolean = false;
    waitForSubmittionProviderCompanyForm: boolean = false;


    //adress for verification
    addresseForVerification: Address[] = [];
    customer_type: string;

    //error message
    errorMessage: String = "";
    list_vehicles: Vehicle[] = [];
    services: any;
    company_services: any;
    serv: any;
    images: any = [];

    provider_docs_field: File[] = [];
    provider_docs: File[] = [];

    constructor(
        // private modalService: NgbModal,
        // private dialog: MatDialog,
        // private formBuilder: FormBuilder,
        private translate: TranslateService,
        private router: Router,
        private sanitizer: DomSanitizer,
        private providerService: ProviderService,
        private zoneService: ZoneService) { }

    ngAfterViewInit(): void { }

    ngOnInit(): void {
        // this.buildPlaces();
        this.services = service;
        this.company_services = company_service;

        this.objUser = this.providerService.currentUser;
        console.log(this.objUser);

        this.bePersonnalCarrierForm = new FormGroup({
        'field_service_title': new FormControl('', [Validators.required]),
        'field_service_description': new FormControl('', [Validators.required]),
        'fiel_adPersonal1': new FormControl(''),
        'fiel_adPersonal2': new FormControl(''),
        'fiel_adPersonal3': new FormControl(''),
        'fiel_adPersonal4': new FormControl(''),
        'latitude': new FormControl(''),
        'longitude': new FormControl(''),
        'fiel_passportNumber': new FormControl('', [Validators.required])
        })
        this.beCompagnyCarrierForm = new FormGroup({
        'field_companyName': new FormControl('', [Validators.required]),
        'field_impExpCode': new FormControl('', [Validators.required]),
        'field_regNum': new FormControl('', [Validators.required]),
        'fiel_adCompany1': new FormControl(''),
        'fiel_adCompany2': new FormControl(''),
        'fiel_adCompany3': new FormControl(''),
        'fiel_adCompany4': new FormControl(''),
        'latitude': new FormControl(''),
        'longitude': new FormControl(''),
        'field_service_description': new FormControl('', [Validators.required]),
        'field_service_title': new FormControl('', [Validators.required]),
        'fiel_passportNumber': new FormControl('', [Validators.required]),
        'fiel_compagnyaddress': new FormControl('', [Validators.required])
        });
    }

    //This method is used to build arrays of the select
    buildPlaces(){
        this.translate.get("carrier").subscribe(rep=>{
            const txtLang = rep.be_provider_form;
            console.log(txtLang)
            this.services = txtLang;
            // "beCompagnyCarrierForm"
            // if(this.isCompagnyAccount) {
            //     this.services = txtLang;
            // }
            // else {
            //     this.list_types = [txtLang.hire_car, txtLang.hire_bike, txtLang.hire_tricycle, txtLang.hire_minibus, txtLang.hire_bus, txtLang.hire_bakkie, txtLang.hire_truck];
            // }
        });
    }


    //This method is used to set adress
    getListAddresse() {
        
        let add = new Address();

        this.addresseForVerification = [];
        if (this.isCompagnyAccount) {
        if (this.beCompagnyCarrierForm.value.fiel_adCompany1.length > 0) {
            // let add = new Address();
            add.phone = this.beCompagnyCarrierForm.value.fiel_adCompany1;
            // this.addresseForVerification.push(add);
        }
        if (this.beCompagnyCarrierForm.value.fiel_adCompany2.length > 0) {
            // let add = new Address();
            add.email = this.beCompagnyCarrierForm.value.fiel_adCompany2;
            // this.addresseForVerification.push(add);
        }
        if (this.beCompagnyCarrierForm.value.fiel_adCompany3.length > 0) {
            // let add = new Address();
            add.websiteLink = this.beCompagnyCarrierForm.value.fiel_adCompany3;
            // this.addresseForVerification.push(add);
        }
        if (this.beCompagnyCarrierForm.value.fiel_adCompany4.length > 0) {
            // let add = new Address();
            add.mobilePhone = this.beCompagnyCarrierForm.value.fiel_adCompany4;
            // this.addresseForVerification.push(add);
        }
        }
        else {
        if (this.bePersonnalCarrierForm.value.fiel_adPersonal1.length > 0) {
            add.phone = this.bePersonnalCarrierForm.value.fiel_adPersonal1;
        }
        if (this.bePersonnalCarrierForm.value.fiel_adPersonal2.length > 0) {
            // let add = new Address();
            add.email = this.bePersonnalCarrierForm.value.fiel_adPersonal2;
            // this.addresseForVerification.push(add);
        }
        if (this.bePersonnalCarrierForm.value.fiel_adPersonal3.length > 0) {
            // let add = new Address();
            add.zip = this.bePersonnalCarrierForm.value.fiel_adPersonal3;
            // this.addresseForVerification.push(add);
        }
        if (this.bePersonnalCarrierForm.value.fiel_adPersonal4.length > 0) {
            // let add = new Address();
            add.websiteLink = this.bePersonnalCarrierForm.value.fiel_adPersonal4;
            // this.addresseForVerification.push(add);
        }
        }

        this.addresseForVerification.push(add);
    }

    getLocation() {
        this.selectedLocations = [];
        if (this.isCompagnyAccount) this.selectedLocations = this.compagnyWidgetZone.selectedLocation;
        else this.selectedLocations = this.personnalWidgetZone.selectedLocation;

        // console.log(this.compagnyWidgetZone.selectedLocation);
        // console.log(this.personnalWidgetZone.selectedLocation);
    }

    getFile(): Document[] {
        if (this.isCompagnyAccount) return this.compagnyWidgetUploadFile.getDocumentsList();
        else return this.personnalWidgetUploadFile.getDocumentsList();
    }

    //This method is used to open section
    openSection(ev: any){
        // console.log(this.customer_type);
        this.isCompagnyAccount = this.customer_type == "personal" ? false : true;
    }

    submit_() {
        const formData = new FormData();
        if(this.provider_docs_field.length==0) {
            this.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Documents missing`);
            return;
        }
        else {
            for (let i = 0; i < this.provider_docs_field.length; i++) {
                formData.append('files', this.provider_docs_field[i]);
            }
            this.providerService.seveProviderDocuments(formData).then((res: any)=>{
                this.provider_docs = res.files;
                console.log(res)
                // this.sendProviderRequest();
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    //This method is used to send Request to be Provider
    submit() 
    {
        console.log(this.bePersonnalCarrierForm.value)
        this.submitted = true;
        let value = {};
        this.getListAddresse();
        // this.getLocation();

        if (this.addresseForVerification.length < 1) {
            this.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You should give your contact for verification`);
            return;
        }
        // console.log("Here is a test for company personnal for",this.isCompagnyAccount)

        // if (this.selectedLocations.length < 2) {
        // this.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> You should give at least two (02) deserved zone`);
        // return;
        // }

        
        if(this.provider_docs_field.length==0) {
            this.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Documents missing`);
            return;
        }
        



        let providerType: number;
        if (this.isCompagnyAccount) {
            // console.log(this.beCompagnyCarrierForm);
            if (!this.beCompagnyCarrierForm.valid) {
                this.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Invalid Compagny form`);
                return;
            }
            this.waitForSubmittionProviderCompanyForm = true;
            value = {
                title: this.beCompagnyCarrierForm.value.field_service_title,
                description: this.beCompagnyCarrierForm.value.field_service_description,
                zones: this.selectedLocations,
                companyName: this.beCompagnyCarrierForm.value.field_companyName,
                registrationNumber: this.beCompagnyCarrierForm.value.field_regNum,
                importExportCompagnyCode: this.beCompagnyCarrierForm.value.field_impExpCode,
                addressForVerification: this.addresseForVerification,
                passportNumber: this.beCompagnyCarrierForm.value.fiel_passportNumber,
                companyAddress: this.beCompagnyCarrierForm.value.fiel_compagnyaddress,
                location: {
                    type: "Point",
                    coordinates: [this.beCompagnyCarrierForm.value.latitude, this.beCompagnyCarrierForm.value.longitude]
                },
            };
            providerType = 1;
        }
        else {
            if (!this.bePersonnalCarrierForm.valid) {
                // this.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> Invalid Personnal form`);
                return;
            }
            this.waitForSubmittionProviderPersonnalForm = true;

            value = {
                title: this.bePersonnalCarrierForm.value.field_service_title,
                description: this.bePersonnalCarrierForm.value.field_service_description,
                zones: this.selectedLocations,
                addressForVerification: this.addresseForVerification,

                passportNumber: this.bePersonnalCarrierForm.value.fiel_passportNumber,
                location: {
                    type: "Point",
                    coordinates: [this.bePersonnalCarrierForm.value.latitude, this.bePersonnalCarrierForm.value.longitude]
                },
            };
            providerType = 0;
        }

        // value['documents'] = this.getFile().map((doc: Document) => doc.toString());
        // value['documents'] = this.images;
        
        for(let i; i<this.list_vehicles.length; i++) this.list_vehicles[i].photo = []
        value['documents'] =this.provider_docs;
        value['vehicles'] = this.list_vehicles;

        let provider: Provider = this.objUser;
        provider.hydrate(value);

        let service: ServiceOfProvider = new ServiceOfProvider();
        service.hydrate(value);
        console.log("this.list_vehicles ", this.list_vehicles);
        console.log("Become provider: Service", service, " provider: ", provider);
        // return;

        const formData = new FormData();
        for (let i = 0; i < this.provider_docs_field.length; i++) {
            formData.append('files', this.provider_docs_field[i]);
        }
        // formData.append('provider', JSON.stringify(provider));
        // formData.append('service', JSON.stringify(service));
        // formData.append('providerType', JSON.stringify(providerType)); 
 
        console.log(formData)
        this.providerService.becomeProvider(provider, service, providerType, formData)
        .then((result) => {
            this.waitForSubmittionProviderPersonnalForm = false;
            this.showNotification('top', 'center', 'success', 'pe-7s-gift', '\<b>Congratulations !\</b>\<br>Your request has been taken into account. You will be notified after verification of the information.')
            console.log(result)
            this.router.navigate['/carrier/wait-acceptance'];
            // setTimeout(() => this.router.navigate['/carrier/wait-acceptance'], 4000);
            this.waitForSubmittionProviderCompanyForm = false;
        })
        .catch((error) => {
            this.waitForSubmittionProviderPersonnalForm = false;
            this.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> ${error.message}`)
            this.waitForSubmittionProviderCompanyForm = false;
        })
    }

    //This method is used to remove
    removeZone(idZone: number){
        this.selectedLocations.splice(idZone, 1);
    }

    //This method is used to add zone
    addZone(){

        // this.selectedLocations = this.isCompagnyAccount ? this.compagnyWidgetZone.selectedLocation : this.personnalWidgetZone.selectedLocation;
        if (this.isCompagnyAccount) 
        this.selectedLocations = this.compagnyWidgetZone.selectedLocation;
        else
        this.selectedLocations = this.personnalWidgetZone.selectedLocation;

        // console.log(this.personnalWidgetZone.selectedLocation);
        // console.log(this.selectedLocations);
    }

    // add a vehicle
    registerVehicle(ev: any){
        ev.photo = []
        console.log(ev);
        this.list_vehicles.push(ev);
    }

    showNotification(from, align, colortype, icon, text) {

        $.notify({
        icon: icon,
        message: text
        }, {
        type: colortype,
        timer: 300,
        placement: {
            from: from,
            align: align
        }
        });
    }
    
    get fPersonnal() {
        return this.bePersonnalCarrierForm.controls;
    }
    
    get fCompagny() {
        return this.beCompagnyCarrierForm.controls;
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

    get_coord_pers(event){
        console.log(event)
        this.bePersonnalCarrierForm.controls["latitude"].setValue(event.latitude)
        this.bePersonnalCarrierForm.controls["longitude"].setValue(event.longitude)
    }
    get_coord_comp(event){
        console.log(event)
        this.beCompagnyCarrierForm.controls["latitude"].setValue(event.latitude)
        this.beCompagnyCarrierForm.controls["longitude"].setValue(event.longitude)
    }

}