import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TempsreelService } from '../tempsreel/tempsreel.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var $: any;
var INVENTORY_URI = 'assets/data/data';

@Injectable({
    providedIn: 'root'
})

export class CarrierService {
    constructor(
        private api: ApiService,
        private temps: TempsreelService,
        private httpClient: HttpClient,
    ) {}

    //This method is used to get headers
    private getHeaders(){

        const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        };

        return headers;
    }


    /**
     * This method is used to get list of providers
     * according to some options
     * 
     * @param pays string, filter by country
     * @param provider string, type of provider
     * @param status string, status of request to be a provier
     * 
     * @returns Promise
     */
    // getListOfProvidersByOptions(pays: string, provider: string, status: string): Promise<any> {

    //     return new Promise((resolve, reject) => {
            
    //         const req: string = ""+pays+"/"+provider+"/"+status;

    //         this.api.get('manager/provider/get_by_country/'+req, this.getHeaders()).subscribe((success) => {
    //                 if (success && success.resultCode == 0) {
    //                     resolve(success.result);
    //                 }
    //                 else  reject(success);
    //             }, (error: any) => reject(error));
    //     });
    // }
    getListOfProvidersByOptions(data: any): Promise<any> {

        return new Promise((resolve, reject) => {
            this.api.post('admin/provider/getCountryProviders', data, this.getHeaders()).subscribe((success) => {
                    if (success && success.resultCode == 0) {
                        resolve(success.data);
                    }
                    else  reject(success);
                }, (error: any) => reject(error));
        });
    }

    /**
     * This method is used to get a provider's profilz usind the user id
     * 
     * @param user_id string, is the user id
     * 
     * @returns Promise
     */
     getProviderByUser(user_id): Promise<any> {

        return new Promise((resolve, reject) => {
            this.api.get('manager/provider/get_by_user/'+user_id, this.getHeaders()).subscribe((success) => {
                    if (success && success.resultCode == 0) {
                        resolve(success.result);
                    }
                    else  reject(success);
                }, (error: any) => reject(error));
        });
    }

    /**
     * This method is used to get list of countries
     * 
     * @returns Promise
     */
     getListOfCountries(): Promise<any> {

        return new Promise((resolve, reject) => {
            
            this.api.get('manager/country/list', this.getHeaders()).subscribe((success) => {
                    if (success && success.resultCode == 0) {
                        resolve(success.result);
                    }
                    else  reject(success);
                }, (error: any) => reject(error));
        });
    }

    /**
     * This method is used to get list of services
     * according to some options
     * 
     * @param statut string, filter by state of service
     * @param period string, period depend of day, monthly and year
     * @param time string, specific time (day of week, month number, and year number)
     * 
     * @returns Promise
     */
    getListOfServicesByOptions(statut: string, period: string, time: string=""): Promise<any> {

        return new Promise((resolve, reject) => {
            
            const req: string = ""+statut+"/"+period+"/"+time;

            this.api.get('manager/service/get_list/'+req, this.getHeaders()).subscribe((success) => {
                    if (success && success.resultCode == 0) {
                        resolve(success.result);
                    }
                    else  reject(success);
                }, (error: any) => reject(error));
        });
    }

    getListOfServices(data: any):Observable<any[]> {
        return this.api.post('admin/service/getListOfServices', data, this.getHeaders());
    }


    /**
     * This method is used to get list of services
     * according to user with some options
     * 
     * @param user_type string, requester or provider
     * @param id_user string, User id
     * @param statut string, filter by state of service
     * @param period string, period depend of day, monthly and year
     * @param time string, specific time (day of week, month number, and year number)
     * 
     * @returns Promise
     */
    getListOfServicesByUser(user_type: string, id_user: string, statut: string, period: string, time: string=""): Promise<any> {

            return new Promise((resolve, reject) => {
                
                const req: string = user_type+"/"+id_user+"/"+statut+"/"+period+"/"+time;
    
                this.api.get('manager/service/get/'+req, this.getHeaders()).subscribe((success) => {
                        if (success && success.resultCode == 0) {
                            resolve(success.result);
                        }
                        else  reject(success);
                    }, (error: any) => reject(error));
            });
    }

    /**
     * This method is used to get financial statement
     * with some options
     * 
     * @param statut string, filter by state of service
     * @param period string, period depend of day, monthly and year
     * @param time string, specific time (day of week, month number, and year number)
     * 
     * @returns Promise
     */
    getFinancialStatement(statut: string, period: string, time: string=""): Promise<any> {

            return new Promise((resolve, reject) => {
                
                const req: string = statut+"/"+period+"/"+time;
    
                this.api.get('manager/service/financial/price/'+req, this.getHeaders()).subscribe((success) => {
                        if (success && success.resultCode == 0) {
                            resolve(success.result);
                        }
                        else  reject(success);
                    }, (error: any) => reject(error));
            });
    }

    /**
     * This method is used to validate account
     * of a provider
     * 
     * @param email string, email provider
     * 
     * @returns Promise
     */
    manageProvider(email: string): Promise<any> {

            return new Promise((resolve, reject) => {
                
                const req: any = {email: email};
                this.api.post('admin/account/accept_as_provider', req, this.getHeaders()).subscribe((success) => {
                        if (success && success.resultCode == 0) {
                            console.log(success)
                            // this.temps.socketClient.emit("service", "630dce46232b415639d25061") 
                            resolve(success);
                        }
                        else  reject(success);
                    }, (error: any) => reject(error));
            });
    }

    // Display notification
    showNotification(from, align, colortype, icon, text) {

        $.notify({
        icon: icon,
        message: text
        }, {
        type: colortype,
        timer: 300,
        placement: {
            from: from,
            align: align
        }
        });
    }

    //This method is used to load inventory list
    loadInventory(lang: string){ 
        return this.httpClient.get(INVENTORY_URI+'_'+lang+'.json');
    }


}
