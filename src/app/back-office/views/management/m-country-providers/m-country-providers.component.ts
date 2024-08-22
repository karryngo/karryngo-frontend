import { Component, OnInit } from '@angular/core';
import { CountryManagementService } from '../../../../shared/service/back-office/country-management.service';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { Provider } from '../../../../shared/entity/provider';
import { UserService } from '../../../../shared/service/user/user.service';
import { error } from 'console';
import { CarrierService } from '../../../../shared/service/back-office/carrier.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-m-country-providers',
    templateUrl: './m-country-providers.component.html',
    styleUrls: ['./m-country-providers.component.css']
})
export class MCountryProvidersComponent implements OnInit {

    list_providers: any[] = [];
    current_user: Provider;

    // Pagination
    criteria: any = {
        skip: 0,
        limit: 10,
        sort: 1,
        country_id: ""
    }
    dataSkip = this.criteria.skip;
    dataLength = this.criteria.limit;

    obj_loader: boolean = true;
    provider_profile: any;
    currentProvider: any; 
    modalRef: BsModalRef;

    constructor(
        private countryManagementService: CountryManagementService,
        private userService:UserService,
        private authService:AuthService,
        private supplierServ: CarrierService,
        private modalServ: BsModalService,
    ) { 
        this.authService.currentUserSubject.subscribe((user:any)=>{
            console.log(user)
            if (user._id && user._id!="") {
                this.getUserById(user._id);
            }
            this.current_user=user;
        })
    }

    ngOnInit(): void {
    }

    // async getListOfProvider(params: any){

    //     this.list_providers = [];
        
    //     try {
          
    //       this.obj_loader = true;
    //       const rep = await this.supplierServ.getListOfProvidersByOptions(params.pays, params.provider, params.status);
    //       console.log(rep);
    //       this.list_providers = rep;
    //       this.obj_loader = false;
    
    //     } catch (error) {
    
    //       console.log(error);
    //       this.obj_loader = false;
    //       this.buildError(error);
    //     }
    //   }

    getUserById(id: string){
        this.userService.getUserById(id).then((res)=>{
            console.log(res)
            if (res.adresse.country) {
                // this.getCountryProviders(res.adresse.country);
                this.getCountryOfManager(id);
            }
        }).catch((err)=>{console.log(err)})
    }

    getCountryOfManager(user_id: string) {
        this.countryManagementService.getCountryOfManager(user_id).subscribe(async(res: any)=>{
            // console.log(res)
            // await this.getSumCountryProviders(res.data?.country?._id)
            this.getCountryProviders(res.data?.country?._id);
        }, (error)=>{
            console.log(error);
        })
    }

    getCountryProviders(country_id: string){
        this.criteria.country_id = country_id;
        this.countryManagementService.getListOfProviders(this.criteria).subscribe((res)=>{
            // console.log(res)
            this.list_providers = res.data;
            if(this.list_providers.length<this.criteria.limit) {
                console.log(11111111111111111111)
                this.dataLength = this.list_providers.length
            } else {
                console.log(2222222222222222222222222)
                this.dataLength = this.dataLength+  this.list_providers.length+1
            }
            this.obj_loader = false;
        }, (error)=>{
            console.log(error)
        })
    }

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

    private buildError(error){
        if(error && (error.error.resultCode==-10 || error.status>=500)){
          // console.log("erreur");
          this.supplierServ.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> There is an error occurs on Server. Please contact Administrator`);
          // this.toastr.error("There is an error occurs on Server. Please contact Administrator", "Karryngo");
        }
    }

    onPageChange(event: any) {
        if (event.previousPageIndex < event.pageIndex) {
            // User clicked "Next" button
            // this.onPageNext();
            this.criteria.skip = this.criteria.skip + this.criteria.limit;
            this.getCountryProviders(this.current_user.adresse.country_id);
            console.log('Next Page event:', this.current_user);
        } else if(event.previousPageIndex > event.pageIndex){
            console.log('Previous Page event:', event);
            this.criteria.skip = this.criteria.skip - this.criteria.limit;
            this.getCountryProviders(this.current_user.adresse.country_id);
        } else {
            console.log('Number of items:', event);
            this.criteria.limit = event.pageSize
        }
    }

}
