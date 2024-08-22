import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Provider } from '../../entity/provider';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';
import { RealTimeChatMessageType, RealTimeErrorType, RealTimeInitErrorType, RealTimeInitMessageType, RealTimeMessage, RealTimeMessageType, UNKNOW_RECEIVER } from './realtime-protocole';

import { io } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../../entity/chat';


@Injectable({
  providedIn: 'root'
})

export class RealtimeService {
  
  currentUser: Provider;
  private socketClient: any;
  private EVENT_MSG: string = 'message';
  messageSubject: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

  constructor(private eventService:EventService,    
    private authService:AuthService,    
    private apiService:ApiService) {


      // //Setting Socket Io
      this.socketClient = io(environment.socket_url);
      this.socketClient.on(this.EVENT_MSG, (data: any) => {
        console.log(data);
        console.log('essaie');
        if(data._id._id!=undefined)
          this.messageSubject.next(data);
      });
      
      //Event subscription
      this.authService.currentUserSubject.subscribe((userData:Provider)=>{
        this.currentUser=userData;
      });
   }

   handleRealTimeSocketDisconnect()
   {
    this.socketClient.removeAllListeners()
   }

   handleRealTimeSocketTimeOutErrorConnexion(e:any)
   {
    console.error("connection timeout error: ", e)
   }
   handleRealTimeSocketErrorConnexion(e:any)
   {
    console.error("connect error: ", e);
    // this.socketClient.disconnect();
   }

  setupSocketConnection(data: any) {
    this.socketClient.emit(this.EVENT_MSG, data);
  }

  //This method is used to retrieve list of messages
  getMessages(){
    this.socketClient.on(this.EVENT_MSG, (data: any) => {
      console.log(data);
    });
  }

  handleRealTimeSocketConnected(){
    this.socketClient.emit(RealTimeInitMessageType.LOGGIN,
      {
        senderID:this.currentUser.id,
        receiverID:UNKNOW_RECEIVER,
        type:RealTimeInitMessageType.LOGGIN,
        data:{
          token:this.apiService.getAccessToken()
        }
      })
      console.log("Socket.IO Connected");
  }

  handleRealtimeLoggin (data:RealTimeMessage){
    if(data.error==RealTimeInitErrorType.SUCCESS )
    {
      this.eventService.loginRealtimeEvent.next(true);
      // this.eventService.loginRealtimeEvent
      // this.socketClient.off(handleRealtimeLoggin)
    }
  }

   addListener(event:RealTimeMessageType,callback:(data:RealTimeMessage)=>void):void
   {
     this.socketClient.on(event.toString(),(data:RealTimeMessage)=>callback(data));
   }

   /**
    * This method is used to send message
    * @param data realTimeMessage
    */
   send(data:RealTimeMessage){
    this.socketClient.emit(data.type.toString(), data);
   }

   removeListener(event:RealTimeMessageType,callback:(data:RealTimeMessage)=>void):void
   {
      this.socketClient.off(event,callback);
   }

   addOnceListener(event: RealTimeMessageType, callback: (data: RealTimeMessage) => void) {
    this.socketClient.once(event.toString(),(data:RealTimeMessage)=>callback(data));
  }
 
}
