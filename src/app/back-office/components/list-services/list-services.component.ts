// import { UserService } from 'app/shared/services/user.service';
// import { CarrierService } from './../../../shared/service/back-office/carrier.service';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { UserService } from '../../../shared/service/user/user.service';

@Component({
    selector: 'app-list-services',
    templateUrl: './list-services.component.html',
    styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {

    @Input() services : any;

    @ViewChild('detailscontent', { static: true }) bloc_details: ElementRef; 

    columns: any[] = [];
    rows: any[] = [];
    entries: number = 10;
    obj_spinner: boolean;
    customMessage = {
        totalMessage: "service(s)",
        emptyMessage: 'No data to display',
        selectedMessage: 'selected'
    };
    objHouse: any; 
    statuts: any[] = [
        { state: "service_init_STATE", name: "Initialize"},
        { state: "service_in_transaction_state", name: "Transaction accepted"},
        { state: "service_accepted_and_waiting_paiement", name: "Waiting payment"},
        { state: "service_paiement_done_and_waiting_start", name: "Payment done"},
        { state: "service_running", name: "Service running"}
    ]

    periods: any[] = [];
    customer: any;
    provider: any;


    constructor(
        private modalService: NgbModal,
        private userServ: UserService,
        private router:Router,
    ) { }

    ngOnInit(): void {
        const currentYear: number = new Date().getFullYear();
        this.periods = [ currentYear, currentYear -1, currentYear - 2, currentYear - 3];

        this.initTable();
    }

    //This method is used to initialize data products
    private initTable(){
    
        this.columns = [{ prop: 'title', name: 'Title' }, { name: 'Status', prop:'state' }, { name: 'Type', prop:'type' }];
        this.rows = this.services;
        // this.rows = [];
    }

    //This method display
    showDetails(content, objet: any){
        // this.router.navigate(['post-requests/trips/add/rent/'+objet._id])
        // console.log(content);
        console.log(objet);
        this.objHouse = objet;
        if(this.objHouse.idSelectedProvider!=""){
          this.getCurrentProvider(this.objHouse.idSelectedProvider, 'provider');  
        }

        if(this.objHouse.idRequester!="")
            this.getCurrentProvider(this.objHouse.idRequester, 'customer');

        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        // console.log(result);
        });
    }

    callApi(Longitude: number, Latitude: number){
        const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
        //Call API
    }

    // get providers list
    got_todetails(service){
        console.log(service)
        this.modalService.dismissAll()
        this.router.navigate(['./my-services/my-service-details/' + service._id]);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                // this.longitude = position.coords.longitude;
                // this.latitude = position.coords.latitude;
                // this.callApi(this.longitude, this.latitude);
                // this.f.latitude.setValue(position.coords.latitude)
                // this.f.longitude.setValue(position.coords.longitude)
                // console.log(this.f.latitude.value)
                // console.log(this.f.longitude.value)
                let data = {
                    type: service.type,
                    // weight: this.f.field_numberPlace.value,
                    longitude:  position.coords.longitude,
                    latitude: position.coords.latitude,
                    number_place:  service.options.size.piece_nber,
                }
            });
        } else {
           console.log("No support for geolocation")
        }
        
    }

    /**
     * This method is used to retrieve selected user or
     * selected provider
     * 
     * @param id_provider string id of provider | requester
     */
    private async getCurrentProvider(id_provider: string, type: string){
        try {
        const rep = await this.userServ.getUserById(id_provider);
        console.log(rep);
        
        if(type=='customer') 
            this.customer = rep;
        else 
            this.provider = rep;

        } catch (error) {
        console.log(error);
        }
    }

    /**
     * This method retrieve the label of state
     * @param status string sate of service
     * 
     * @returns string
     */
    getStatus(status: string): string{
        
        let result: any;

        result = this.statuts.find(elt => elt.state == status);
    
        return result===undefined ? "" : result.name;
    }
}
