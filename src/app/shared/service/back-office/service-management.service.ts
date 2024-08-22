import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';


@Injectable({
    providedIn: 'root'
})
export class ServiceManagementService {

    constructor(
        private api: ApiService,
    ) { }

    getServiceStatistics(data: any) {
        return this.api.post(`admin/service/getServiceStatistics`, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getServiceStats(data: any) {
        return this.api.post(`admin/service/test`, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    getTotalStatistics() {
        return this.api.get(`admin/service/totalStatistics`, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

}
