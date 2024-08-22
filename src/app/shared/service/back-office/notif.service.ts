import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ToastrService } from 'ngx-toastr';
import { Trip } from '../../entity/trip';
import { Rental } from '../../entity/rental';


@Injectable({
    providedIn: 'root'
})
export class NotifService {

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

    // permet d'enregistrer une notif
    // rentCreation(data: Rental): Promise<any> {
    //     console.log(data.toString())
    //     return new Promise((resolve, reject) => {
    //         delete data.id;
    //         this.api.post('requester/rental_service/add', data.toString(), this.getHeaders())
    //         .subscribe(success => {
    //             if(success.resultCode === 0)
    //             {              
    //                 console.log(success)            
    //                 resolve(success.result.idService);
    //             }
    //             else
    //             {
    //                 reject(success);
    //             }
    //         }, error => {
    //             reject(error);
    //         });
    //     })
    // }

        /*
    *  Set the trip informations.
    */

    get_notifs() {
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

    find_by_user_id(user_id: String): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.get('notifications/find_by_user_id/' + user_id, this.getHeaders())
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    // console.log(success)            
                    resolve(success.result);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                reject(error);
            });
        })
    }

}