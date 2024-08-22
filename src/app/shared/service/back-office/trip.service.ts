import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ToastrService } from 'ngx-toastr';
import { Trip } from '../../entity/trip';

@Injectable({
    providedIn: 'root'
})
export class TripService {

    public static currentTrip: Trip = new Trip();
    params: any;
    packageData: any;
    isLoggedIn = false;
    trips: any[];

    constructor(
        private api: ApiService,
        private toastr: ToastrService
    ) { }

    /*
  *  Set the trip informations.
  */

 getTrips() {
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


    setTripInformations(currentTrip: any) {
        localStorage.setItem('trip-data', JSON.stringify(currentTrip));
    }

    /*
   *  get the trip informations.
   */
    getTripInformations() {
        return JSON.parse(localStorage.getItem('trip-data'));
    }


    /*
    *  Get local trip data.
    */
    getLocalStorageTrip() {
        this.packageData = JSON.parse(localStorage.getItem('trip-data'));
    }

    // permet d'enregistrer un trip en creant son compte
    tripCreation(data: Trip): Promise<any> {

        return new Promise((resolve, reject) => {

            const headers = {
                'Content-Type': 'application/hal+json',
                'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token')),
                'Accept': 'application/json',
            };
            const cheminUrl = `${this.api.url}/rest/type/trip/trip`;
            this.params = {
                // '_links': {
                //     'type': {
                //         'href': cheminUrl
                //     }
                // },
                'address':
                {
                    'from':
                    {
                        'country': data.field_countryStart,
                        'city': data.field_cityStart,
                        'lat': data.field_latStart,
                        'lg': data.field_longStart
                    },
                    'to':
                    {
                        'country': data.field_countryArrived,
                        'city': data.field_cityArrived,
                        'lat': data.field_latArrived,
                        'lg': data.field_longArrived
                    },
                },
                'options':
                {
                    'haveLuggage': data.field_haveLuggage,
                    'typeof': data.field_typeof,
                    'date': data.field_delayDate,
                    'car_type': data.field_vehicleType,
                    'num_place': data.field_numPlace,
                    // 'price': data.field_price
                }

            };
            console.log(this.params);
            this.api.post(`trip/trip?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
                resolve(success);
                this.setTripInformations(success);
                // this.toastr.success('You have been successfully Register your trip!');
                // this.router.navigate(['dashboard']);
            }, error => {
                this.toastr.success(error.message);
                reject(error);
            });
        });
    }


    // permet d'update les infos d'un trip
    UpdateTrip(nid: string, token: string, data: any): Promise<any> {

        return new Promise((resolve, reject) => {

            const headers = {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/hal+json',
                'Accept': 'application/json',
                'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token'))
            };

            const cheminUrl = `${this.api.url}/rest/type/trip/trip`;
            this.params = {
                // '_links': {
                //     'type': {
                //         'href': cheminUrl
                //     }
                // },
                'address':
                {
                    'from':
                    {
                        'country': data.field_countryStart,
                        'city': data.field_cityStart,
                        'lat': data.field_latStart,
                        'lg': data.field_longStart
                    },
                    'to':
                    {
                        'country': data.field_countryArrived,
                        'city': data.field_cityArrived,
                        'lat': data.field_latArrived,
                        'lg': data.field_longArrived
                    },
                },
                'options':
                {
                    'haveLuggage': data.field_haveLuggage,
                    'typeof': data.field_typeof,
                    'date': data.field_delayDate,
                    'car_type': data.field_vehicleType,
                    'num_place': data.field_numPlace,
                    // 'price': data.field_price
                }
            };
            this.api.patch(`trip/${nid}?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
                resolve(success);
            }, error => {
                reject(error);
            });
        });
    }
}
