import { CarrierService } from './../../service/back-office/carrier.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { LocationService } from '../../service/location/location.service';

@Component({
    selector: 'app-c-providers',
    templateUrl: './c-providers.component.html',
    styleUrls: ['./c-providers.component.scss']
})
export class CProvidersComponent implements OnInit{

    // @ViewChild('services') public services: ModalDirective;
    countries: any[] = [];
    list_providers: any[] = [];
    currentProvider: any; 
    provider_profile: any;
    modalRef: BsModalRef;
    obj_spinner: boolean;
    obj_loader: boolean = true;

    fileUrl: string = environment.filesUrl;
    
    waiting: boolean = true;
    countryChanged: boolean = false;

    options : any = { skip: 0, limit: 10, sort: -1, country_id: "" };


    constructor(
        private supplierServ: CarrierService,
        private locationService:LocationService,
        private modalServ: BsModalService
    // private toastr: ToastrService
    ) { }

    ngOnInit(){
        // this.getListOfCountries();
        this.get_countries();
        this.getListOfProvider(this.options);
    }

    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            console.log(res);
            this.countries = res.result; 
        })
    }

    //This method is used to gel list of countries
    async getListOfCountries(){
    try {
        
        const rep = await this.supplierServ.getListOfCountries();
        console.log(rep);
        this.countries = rep.filter(elt => elt!="");
        this.getListOfProvider(this.options);

    } catch (error) {
        console.log(error);
        this.buildError(error);
    }
    }

    //This method is used to gel list of providers
    async getListOfProvider(params: any = this.options){
        try {
            this.obj_loader = true;
            const rep = await this.supplierServ.getListOfProvidersByOptions(params);
            this.list_providers = this.list_providers.concat(rep.map(item => item.user));
            if (!rep || rep.length < this.options.limit) this.waiting = false; 
            this.obj_loader = false;

        } catch (error) {

            console.log(error);
            this.obj_loader = false;
            this.buildError(error);
        }
    }

    onCountrySelected(selectedCountryId: string): void {
        this.countryChanged = true;
        this.options = { skip: 0, limit: 10, sort: -1, country_id: "" };
        this.options.country_id = selectedCountryId;
        this.list_providers = []; 
        this.waiting = true;
        this.getListOfProvider();
    }

    getMoreProviders(){
        this.options.skip=this.options.skip + this.options.limit;
        this.getListOfProvider(this.options);
    }

    /**
     * This method is used to display
     * details of provider
     */
    async displayDetails(item, template){
    console.log(item)
    const rep = await this.supplierServ.getProviderByUser(item._id);
    console.log(rep)
    this.provider_profile = rep[0];
    this.currentProvider = item;
    this.modalRef = this.modalServ.show(template, { class: 'modal-lg' });
    }

    //This method is used to confirm a provider request
    async validerAccount(item){

    item["loadder"] = true;
    try {
        const rep = await this.supplierServ.manageProvider(item.address.email);
        item["loadder"] = false;
        
        this.supplierServ.showNotification('top', 'center', 'success', 'pe-7s-close-circle', `\<b>Account Validation !\</b>\<br> A new provider ${item.firstname} is now available`);
        item.isAcceptedProvider = true;
    } catch (error) {
        console.log(error);
        this.buildError(error);
    }
    }

    /**
     * This method is used to display error according
     * to code error
     * @param error any
     */
    private buildError(error){
    if(error && (error.error.resultCode==-10 || error.status>=500)){
        // console.log("erreur");
        this.supplierServ.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> There is an error occurs on Server. Please contact Administrator`);
        // this.toastr.error("There is an error occurs on Server. Please contact Administrator", "Karryngo");
    }
    }

}
