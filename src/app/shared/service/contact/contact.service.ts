import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(
        private api: ApiService,
    ) { }

    private getHeaders()
    {
        const headers = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Content-Type': 'application/json',
        };
        return headers;
    }

        // send new message
    send_message(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
            };

            this.api.post('inquiry/save', data, headers)
            .subscribe((response: any) => {
                if (response) {
                    if (response.resultCode == 0) {
                        resolve(response);
                        return;
                    }
                    reject(response);
                    return 0;
                }
            }, (error: any) => {
                if (error) {
                    // this.toastr.error(error.message);
                    // console.log('Error message: ', error.message);
                    reject(error);
                }
            });
        });

    }

    getInquiries(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.post('inquiry/getMany', data, this.getHeaders()) 
            .subscribe((response: any) => {
                if (response) {
                    if (response.resultCode == 0) {
                        resolve(response.result);
                        return;
                    }
                    reject(response);
                    return 0;
                }
            }, (error: any) => {
                if (error) {
                    // this.toastr.error(error.message);
                    // console.log('Error message: ', error.message);
                    reject(error);
                }
            });
        });
    }

    getById(message_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.get('inquiry/getById/'+ message_id, this.getHeaders()) 
            .subscribe((response: any) => {
                if (response) {
                    if (response.resultCode == 0) {
                        resolve(response.result);
                        return;
                    }
                    reject(response);
                    return 0;
                }
            }, (error: any) => {
                if (error) {
                    // this.toastr.error(error.message);
                    // console.log('Error message: ', error.message);
                    reject(error);
                }
            });
        });

    }

    delete(id: string){
        return this.api.delete('inquiry/delete/'+ id, this.getHeaders())
    }
}
