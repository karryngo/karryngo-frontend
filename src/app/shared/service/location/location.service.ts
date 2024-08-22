import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        private api: ApiService,
    ) { }

    //recuperer la liste des pays
    get_all_countries(): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.get(`countries/find_all_countries`)
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }

    //recuperer la liste des pays
    get_country_by_id(country_id): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.get(`countries/find_country_by_id/` + country_id)
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }
    //recuperer un pays avec son code
    get_country_by_code2(code: any): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.get(`countries/get_country_by_code2/` + code)
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }

    //recuperer la liste des pays
    get_country_manager(country_id): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.get(`admin/countries/find_country_manager/` + country_id, {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
            })
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }

    //recuperer l(admin)
    find_user_by_email(email): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.get(`admin/user/find_user_by_email/` + email, {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
            })
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }

    //recuperer la liste des pays
    update_country_rate(country_id: any, data: any): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.post(`countries/update_country_rate/` + country_id, data, {
                    'Authorization': 'Bearer ' + this.api.getAccessToken(),
                })
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }

    //recuperer la liste des pays
    find_cities_by_country(val: any): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.get(`cities/find_cities_by_country/`+ val)
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }
}
