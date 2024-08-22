import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Provider, User } from '../../entity/provider';
import { UserlocalstorageService } from '../localstorage/userlocalstorage.service';
import { environment } from './../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TempsreelService {

    socketClient: any;
    user_subject: Subject<User> = new Subject<User>();
    service_subject: Subject<any> = new Subject<any>();
    notification_subject: Subject<any> = new Subject<any>();

    constructor(
        private localStorageService: UserlocalstorageService,
    ) { 

        this.socketClient = io(`${environment.socket_url}`);
        // this.socketClient.emit('message', "This is my messsage");
        // this.socketClient.emit('room_join_request', {message: "I want to join the room"})
        this.socketClient.on('message', (data: any) => {
            console.log(data);
            // if(data._id._id===undefined)
            // console.log(data);
        });

        this.socketClient.on('user', (data: any) => {
            console.log(data.user);
            console.log(JSON.parse(localStorage.getItem("user")));
            if (JSON.parse(localStorage.getItem("user"))._id == data.user._id) {
                console.log("the user id is : ", JSON.parse(localStorage.getItem("user"))._id)
                let user:Provider=new Provider();
                user.hydrate(data.user);
                this.localStorageService.setUserData({ 
                    isLoggedIn: true,
                    user: user
                });
            }
        });

        this.socketClient.on('service', (data: any) => {
            console.log(data);
            this.emit_service(data);
        });

        this.socketClient.on('notification', (data: any) => {
            console.log(data);
            // this.emit_notification(data);
            if (JSON.parse(localStorage.getItem("user"))._id == data.notification.user_id) {
                this.emit_notification(data.notification);
            }

        });
        
    }

    joinRoom(room: string) {
        this.socketClient.emit('joinRoom', room);
    }

    // take_personal_room(user_id){
    //     this.socketClient.emit('room_join_request', {message: "I want to join the room", roomName: user_id})
    // }

    get_profile(user_id){
        this.socketClient.emit('user_profile', user_id)
    }

    emit_user(user) {
        this.user_subject.next(user);
    }

    emit_service(service) {
        this.service_subject.next(service);
    }

    emit_notification(service) {
        this.notification_subject.next(service);
    }
}
