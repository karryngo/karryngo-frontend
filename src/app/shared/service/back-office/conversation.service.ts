import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
providedIn: 'root',
})
export class ConversationService {
    private socket: Socket;

    constructor(
        private http: HttpClient,
    ) {
        this.socket = io(environment.chatUrl);
    }

    // findUserConversations(id: string) {
    //     return this.http.get(`${this.env.USER_CONVERSATIONS_ENDPOINT}/${id}`)
    // }

    findUserConversations( id: String, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/conversation/list/${id}`, data)
            .subscribe((success: any) => {
                console.log(success)
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    resolve(success);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                console.log(error)
                reject(error);
            });
        })

    }

    findServiceConversation( service_id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${environment.apiUrl}/conversation/find_conversation_by_service/${service_id}`)
            .subscribe((success: any) => {
                console.log(success)
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    resolve(success);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                console.log(error)
                reject(error);
            });
        })

    }

    get_conversation_messages( data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`${environment.apiUrl}/conversation/get_conversation_messages`, data)
            .subscribe((success: any) => {
                console.log(success)
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    resolve(success);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                console.log(error)
                reject(error);
            });
        })

    }
}
