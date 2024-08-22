import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    url = "https://apilayer.net/api/live?access_key=f68da29e3769951bc2f8f9b94b3ce652&base=USD";
    constructor(
        private http: HttpClient,
        private api: ApiService,
    ) { }

    getCurrencies(){
        // return this.http.get(this.url);
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.url)
            .subscribe(success => {
                resolve(success)
            }, error => {
                reject(error);
            })
        })
    }

    get_currencies(){
        return new Promise<any>((resolve, reject) => {
            this.api.get(`payment/get_currencies`)
            .subscribe(success => {
                resolve(success)
            }, error => {
                reject(error);
            })
        })
    }
}
