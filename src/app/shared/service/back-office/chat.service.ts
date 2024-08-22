import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Discussion, Message } from '../../entity/chat';
import { ApiService } from '../api/api.service';
import { EventService } from '../event/event.service';
import { RealtimeService } from '../realtime/realtime.service';
import { TransactionService } from './transaction.service';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket: Socket;
    listDiscusion: Discussion[] = [];
    listUnreadMessage: Message[] = [];
    listDiscusionSubject: BehaviorSubject<Discussion[]> = new BehaviorSubject<Discussion[]>(this.listDiscusion);
    listMessageUnreadSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
    headers = {};
    selectedDiscussion:BehaviorSubject<Discussion>=new BehaviorSubject<Discussion>(null);

    constructor(private api: ApiService,
        private eventService:EventService,
        private transactionService:TransactionService,
        // private realtimeService:RealtimeService
        ) {
            this.socket = io(environment.chatUrl);

        this.headers = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        // this.socket.emit('test', "données de test");

        // this.eventService.loginEvent.subscribe((state)=>{
        //     console.log(state);

        // })
        this.listDiscusion=[];
        // this.getDiscutionList().then((result) => {
            
        //     this.emitDiscussion();
        //     // this.emitUnReadMessage();
        // });

        this.socket.on('message', (data: any) => {
            console.log(data);
            // if(data._id._id===undefined)
            // console.log(data);
        });

        this.socket.on('user', (data: any) => {
            console.log(data.user);
            console.log(JSON.parse(localStorage.getItem("user")));
            if (JSON.parse(localStorage.getItem("user"))._id == data.user._id) {
                console.log("the user id is : ", JSON.parse(localStorage.getItem("user"))._id)
                // let user:Provider=new Provider();
                // user.hydrate(data.user);
                // this.localStorageService.setUserData({ 
                //     isLoggedIn: true,
                //     user: user
                // });
            }
        });

        this.socket.on('service', (data: any) => {
            console.log(data);
            // this.emit_service(data);
        });

        // this.socket.on('test', (data: any) => {
        //     console.log("tttttttttttttttttttttttt");
        //     console.log(data);
        //     // this.emit_notification(data);
        //     // if (JSON.parse(localStorage.getItem("user"))._id == data.notification.user_id) {
        //     //     // this.emit_notification(data.notification);
        //     // }

        // });
    }

    //This method is used to get headers
    private getHeaders(){

        const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        };

        return headers;
    }

    //This method is used to retrieve discussions list
    getDiscutionList(): Promise<any> {

        return new Promise((resolve, reject) => {
            this.api.get('chat/list', this.getHeaders()).subscribe((success) => {
                    if (success && success.resultCode == 0) {
                        success.result.forEach((disc) => this.listDiscusion.push(Discussion.hydrate(disc)));
                        resolve(true);
                    }
                    else  reject(success);
                }, (error: any) => reject(error));
        });
    }

    /**
     * This method is used to get messages from
     * by idDiscussion
     * @returns Promise
     */
    getListMessagesByDiscussion(idDisc: any, page: number, limit: number = 5): Promise<any> {

        return new Promise((resolve, reject) => {
            
            const req: string = "?id_discuss="+idDisc+"&limit="+limit+"&page="+page;

            this.api.get('chat/message/list'+req, this.getHeaders()).subscribe((success) => {
                    if (success && success.resultCode == 0) {
                        resolve(success.result);
                    }
                    else  reject(success);
                }, (error: any) => reject(error));
        });
    }

    getLocalDiscutionById(idDiscussion: String): Discussion {
        return this.listDiscusion.find((discuss: Discussion) => discuss._id == idDiscussion);
    }
    
    getUnReadDiscussion(): Observable<Discussion>{
        return this.listDiscusionSubject.pipe(
            switchMap((disc:Discussion[])=>from(disc)),
            filter((disc:Discussion)=>disc.read==0),
            map((disc:Discussion)=>{
              // this.eventService.findTransactionEvent.next({idProjet:disc.idProject.toString(),idTransaction:disc.idTransaction.toString()})
              this.eventService.findPackageEvent.next(disc.idProject.toString())   
              this.transactionService.getTransactionById(disc.idTransaction)     
              return disc;
            })
        )
    }
    getUnreadMessage() {
        this.listDiscusion.forEach((value: Discussion) => {
            this.listUnreadMessage.concat(value.chats.filter((msg: Message) => msg.read == 0));
        });
        this.emitUnReadMessage();
        // this.listDiscusion.filter((value:Discussion,)=>)
    }
    emitDiscussion() {
        this.listDiscusionSubject.next(this.listDiscusion.slice());
    }
    emitUnReadMessage() {
        this.listMessageUnreadSubject.next(this.listUnreadMessage.slice());
    }
    markAsRead(idMessage: String, idDiscussion: String): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.post('chat/mark_as_read', { idMessage, idDiscussion }, this.getHeaders())
                .subscribe((success) => {
                    if (success && success.resultCode == 0) { resolve(success); }
                    else { reject(success); }
                }, (error: any) => reject(error));
        });
    }

    newMessage(msg: Message, discussID?: String): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.post('chat/message/add', msg.toString(), this.getHeaders())
                .subscribe((success) => {
                    if (success && success.resultCode == 0) { resolve(success); }
                    else { reject(success); }
                }, (error: any) => reject(error));
        });
    }







    // NEW WORKING CHAT
    joinRoom(room: string) {
        this.socket.emit('joinRoom', room);
    }
    
    sendMessage(data: any) {
        // console.log("mes")
        this.socket.emit('message', data);
    }
    
    getMessages(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('message', (data: any) => {
                observer.next(data);
            });
        });
    }
    
    sendTypingNotification(data: any) {
        this.socket.emit('typing', data);
    }
    
    getTypingNotifications(): Observable<boolean> {
        return new Observable(observer => {
            this.socket.on('typing', (typing: boolean) => {
                observer.next(typing);
            });
        });
    }

    
    get_notif(): Observable<boolean> {
        return new Observable(observer => {
            // this.socket.on('typing', (typing: boolean) => {
            //     observer.next(typing);
            // });
            this.socket.on('notification', (data: any) => {
                console.log(data);
                observer.next(data);
                // if (JSON.parse(localStorage.getItem("user"))._id == data.notification.user_id) {
                //     this.emit_notification(data.notification);
                // }
    
            });
        });
        
    }



}
