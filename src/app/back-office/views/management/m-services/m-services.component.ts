import { CarrierService } from './../../../../shared/service/back-office/carrier.service';
import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CountryManagementService } from '../../../../shared/service/back-office/country-management.service';
import { Subscription } from 'rxjs';

// declare var $: any;

@Component({
    selector: 'm-services',
    templateUrl: 'm-services.component.html',
    styleUrls: ['m-services.component.scss']
})
export class MServicesComponent implements OnInit {
    
    services: any[] = [];
    obj_loader: boolean = true;
    waiting: boolean = true;

    criteria: any = {
        skip: 0,
        limit: 10,
        sort: 1
    }
    options = {skip: 0, limit: 10}
    private getArticleSubscription!: Subscription;

    constructor(
            private countryManagementService: CountryManagementService,
            private supplierServ: CarrierService
        ) {}

    ngOnInit(){
        this.getListOfServices();
    }

    //This method is used to get list of services
    async getListOfServices_(params: any){
        
        this.services = [];
        this.obj_loader = true;

        try {
            const rep = await this.supplierServ.getListOfServicesByOptions(params.statut, params.period, params.time);
            console.log(rep);
            this.services = rep;
            this.obj_loader = false;

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

    async getListOfServices(){   
        // this.services = [];
        // this.obj_loader = true;

        // try {
        //     const rep = await this.supplierServ.getListOfServices(this.options);
        //     console.log(rep);
        //     this.services = rep;
        //     this.obj_loader = false;

        // } catch (error) {
        //     console.log(error);
        //     this.buildError(error);
        // }

        this.getArticleSubscription = this.supplierServ.getListOfServices(this.options).subscribe({
            next: (response: any) => {
                console.log(response);
                // this.services = response.result
                this.services = this.services.concat(response.result);
                if (!response.result || response.result.length < this.options.limit) this.waiting = false; 
                this.obj_loader = false;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    getMoreProviders(){
        this.options.skip=this.options.skip + this.options.limit;
        this.getListOfServices();
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {
        console.log("ZZZZZZZZZZZZZZ")
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.options.skip += this.options.limit;
            this.getListOfServices();
        }
    }

    ngOnDestroy(): void {
        if (this.getArticleSubscription) {
            this.getArticleSubscription.unsubscribe();
        }
    }

}
