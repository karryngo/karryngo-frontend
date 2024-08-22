import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ToastrService } from 'ngx-toastr';
import { Trip } from '../../entity/trip';
import { Rental } from '../../entity/rental';


@Injectable({
    providedIn: 'root'
})
export class RentService {

    public static currentTrip: Trip = new Trip();
    params: any;
    packageData: any;
    isLoggedIn = false;
    trips: any[];

    constructor(
        private api: ApiService,
        private toastr: ToastrService
    ) { }

    //This method is used to get headers
    private getHeaders(){

        const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        };

        return headers;
    }

    // permet d'enregistrer un service de location
    rentCreation(data: Rental): Promise<any> {
        console.log(data.toString())
        return new Promise((resolve, reject) => {
            delete data.id;
            this.api.post('requester/rental_service/add', data.toString(), this.getHeaders())
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    // this.packages.set(success.result.idService,data);
                    //this.toastr.success('You have been successfully Register your package!');               
                    resolve(success.result.idService);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                //this.toastr.success(error.message);
                reject(error);
            });
        })

    }

        /*
    *  Set the trip informations.
    */

    get_rents() {
        const headers = {
            'Content-Type': 'application/hal+json',
            // 'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token')),
            // 'Accept': 'application/json',
        };
        this.api.get('user/trips', headers)
        .subscribe(response => {
            this.trips = response.json();
        });
    }

}