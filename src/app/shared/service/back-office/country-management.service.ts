import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class CountryManagementService {

    constructor(private api: ApiService, private http: HttpClient) { }

    getListOfProviders(data: any) {
        console.log(data)
        return this.api.post(`admin/provider/getCountryProviders`, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getCountryServices(data: any, country_id: string) {
        return this.api.post(`admin/service/getCountryServices/`+country_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getServiceStats(data: any, user_id: string) {
        if(data.displayMode=="Monthly")
            return this.api.post(`admin/service/getMonthlyServiceStats/`+user_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
        if(data.displayMode=="Weekly")
            return this.api.post(`admin/service/getWeeklyServiceStats/`+user_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
        if(data.displayMode=="Daily")
            return this.api.post(`admin/service/getDailyServiceStats/`+user_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
        // return this.api.post(`admin/service/getServiceStats/`+user_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
        return this.api.post(`admin/service/getManagerServiceStats/`+user_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getServiceStatistics(data: any, user_id: string) {
        return this.api.post(`admin/service/getCountryServiceStats/`+user_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getCountryOfManager(user_id: string) {
        return this.api.get(`admin/countries/getCountryOfManager/`+user_id, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getCountryProviderStatistics(data: any, user_id: string) {
        return this.api.post(`admin/service/getCountryProviderStatistics/`+user_id, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getSumCountryProviders(user_id: string) {
        return this.api.get(`admin/provider/getSumCountryProviders/`+user_id, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

}
