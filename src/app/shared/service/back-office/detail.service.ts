
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api/api.service';


@Injectable({
    providedIn: 'root'
})
export class DetailService {
    posts: any[];

    constructor(
        private api: ApiService,
        private toastr: ToastrService,
    ) { }

    getParcelDetail(): Promise<any> {

        return new Promise((resolve, reject) => {
            const headers = {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
                'Content-Type': 'application/json',
                // 'Accept': 'application/json'
            };
            this.api.get('backend/link', headers)
                .subscribe((response: any) => {
                    console.log('Response ', response);
                    if (response) {
                        resolve(response);
                        this.posts = response.result;
                        localStorage.setItem('parcel-detail', JSON.stringify(this.posts));
                    }
                    return JSON.stringify(this.posts);

                }, (error: any) => {

                    if (error) {
                        console.log(error);
                        this.toastr.error(error.message);
                        reject(error);
                    }
                });
        });
    }


    getPassengerDetail(): Promise<any> {

        return new Promise((resolve, reject) => {
            const headers = {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
                'Content-Type': 'application/json',
                // 'Accept': 'application/json'
            };
            this.api.get('backend/link', headers)
                .subscribe((response: any) => {
                    console.log('Response ', response);
                    if (response) {
                        resolve(response);
                        this.posts = response.result;
                        localStorage.setItem('passenger-detail', JSON.stringify(this.posts));
                    }
                    return JSON.stringify(this.posts);

                }, (error: any) => {

                    if (error) {
                        console.log(error);
                        this.toastr.error(error.message);
                        reject(error);
                    }
                });
        });
    }

    getParcelLocalStorageDetails() {
        const data: any = {
            parcelName: JSON.parse(localStorage.getItem('parcel-detail')).result.parcelName,
            startLocation: JSON.parse(localStorage.getItem('parcel-detail')).result.startLocation,
            endLocation: JSON.parse(localStorage.getItem('parcel-detail')).result.endLocation,
            parcelType: JSON.parse(localStorage.getItem('parcel-detail')).result.parcelType,
            vehicleType: JSON.parse(localStorage.getItem('parcel-detail')).result.vehicleType,
            volume: JSON.parse(localStorage.getItem('parcel-detail')).result.volume,
            isFragile: JSON.parse(localStorage.getItem('parcel-detail')).result.isFragile,
            isUrgent: JSON.parse(localStorage.getItem('parcel-detail')).result.isUrgent,
            collectionDate: JSON.parse(localStorage.getItem('parcel-detail')).result.collectionDate,
            description: JSON.parse(localStorage.getItem('parcel-detail')).result.description,
            price: JSON.parse(localStorage.getItem('parcel-detail')).result.price,

            senderName: JSON.parse(localStorage.getItem('parcel-detail')).result.senderName,
            senderLocatione: JSON.parse(localStorage.getItem('parcel-detail')).result.adresse.senderLocatione,
            senderContact: JSON.parse(localStorage.getItem('parcel-detail')).result.adresse.senderContact,

            receiverName: JSON.parse(localStorage.getItem('parcel-detail')).result.receiverName,
            receiverLocation: JSON.parse(localStorage.getItem('parcel-detail')).result.adresse.receiverLocation,
            receiverContact: JSON.parse(localStorage.getItem('parcel-detail')).result.adresse.receiverContact,
        };
        return data;
    }

    getPassengerLocalStorageDetails() {
        const data: any = {
            passengerName: JSON.parse(localStorage.getItem('passenger-detail')).result.passengerName,
            startLocation: JSON.parse(localStorage.getItem('passenger-detail')).result.startLocation,
            endLocation: JSON.parse(localStorage.getItem('passenger-detail')).result.endLocation,
            numberOfPlace: JSON.parse(localStorage.getItem('passenger-detail')).result.numberOfPlace,
            departureDate: JSON.parse(localStorage.getItem('passenger-detail')).result.collectionDate,
            departureHoure: JSON.parse(localStorage.getItem('passenger-detail')).result.Description,
            price: JSON.parse(localStorage.getItem('passenger-detail')).result.price,
            passengerLocatione: JSON.parse(localStorage.getItem('passenger-detail')).result.adresse.passengerLocatione,
            passengerContact: JSON.parse(localStorage.getItem('passenger-detail')).result.adresse.passengerContact,
        };
        return data;
    }

    // Login into your account
    increase(increase?: string, idRequest?: string, providerId?: string, requesterId?: string): Promise<any> {
        const param = {
            'idRequest': idRequest,
            'increase': increase,
            'idProvider': providerId,
            'idRequester': requesterId,
        };
        const header = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Content-Type': 'application/json',
        };

        return new Promise((resolve, reject) => {
            this.api.post('backend/link', param, header)
                .subscribe(response => {
                    this.toastr.success('You have been successfully increase');
                    resolve(response);
                }, error => {
                    this.toastr.success('You have failed to increase');
                    reject(error);

                });
        });
    }


    setChoice(choice?: boolean, idRequest?: string, providerId?: string, requesterId?: string) {
        const param = {
            'idRequest': idRequest,
            'idProvider': providerId,
            'idRequester': requesterId,
            'choice': choice,
        };
        const header = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Content-Type': 'application/json',
        };

        return new Promise((resolve, reject) => {
            this.api.post('backend/link', param, header)
            .subscribe(response => {
               console.log(response);
                resolve(response);
            }, error => {
                console.log(error);
                reject(error);

            });
        });

    }

}
