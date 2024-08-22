import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GatewayService {

    private socket: Socket;

    constructor() {
        this.socket = io(environment.chatUrl);
    }

    joinRoom(room: string) {
        this.socket.emit('joinRoom', room);
    }
    
    // sendMessage(data: any) {
    //     // console.log("mes")
    //     this.socket.emit('message', data);
    // }
    
    getService(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('service', (data: any) => {
                observer.next(data);
            });
        });
    }
}
