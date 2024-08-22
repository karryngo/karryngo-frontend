import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private api: ApiService,
    ) { }

    
    get_user_token(token: string, deviceId: string): Promise<any> 
    {
        let data = {
            token: token,
            id: deviceId
        }
        return new Promise<any>((resolve, reject) => {
            this.api.post(`device_token/get_user_token`, data, this.getHeaders())
            .subscribe(success => {
                console.log(success)
                resolve(success)
            }, error => {
            reject(error);
            })
        })
    }

    //This method is used to get headers
    private getHeaders(){

        const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        };

        return headers;
    }

    showNotification(from, align, colortype, icon, text, time?) {
        if (time) {
            $.notify({
                icon: icon,
                message: text
            }, {
                type: colortype,
                timer: time,
                placement: {
                    from: from,
                    align: align
                }
            });
        } else {
            $.notify({
                icon: icon,
                message: text
            }, {
                type: colortype,
                timer: 3000,
                placement: {
                    from: from,
                    align: align
                }
            });
        }
    }
    showServNotification(from, align, colortype, icon, text, time?) {
        if (time) {
            $.notify({
                icon: icon,
                message: text
            }, {
                type: colortype,
                timer: time,
                placement: {
                    from: from,
                    align: align
                }
            });
        } else {
            $.notify({
                icon: icon,
                message: text
            }, {
                type: colortype,
                timer: 3000,
                placement: {
                    from: from,
                    align: align
                }
            });
        }
    }
}
