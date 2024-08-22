import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Discussion, Message } from '../../entity/chat';
import { Provider } from '../../entity/provider';
import { RealtimeService } from '../realtime/realtime.service';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';
import { RealTimeChatMessageType, RealTimeInitErrorType, RealTimeMessage, RealTimeMessageType, UNKNOW_RECEIVER } from '../realtime/realtime-protocole';
import { PackageService } from './package.service';
import { TransactionService } from './transaction.service';

// import { ChatService } from './chat.service';



@Injectable()
export class ChatRealtimeService {

  private listDiscusion: Discussion[] = [];
  listDiscusionSubject: BehaviorSubject<Discussion[]> = new BehaviorSubject<Discussion[]>(this.listDiscusion);
  currentUser:Provider = new Provider();

  constructor(
    private eventService:EventService,
    // private realtimeService:RealtimeService,
    private authService:AuthService,
    private transactionService:TransactionService,
    private packageService:TransactionService) {

      this.eventService.loginRealtimeEvent.subscribe((value:boolean)=>{
        if(!value) return;
        this.currentUser= this.authService.currentUserSubject.getValue();
        // this.realtimeService.send({
        //   senderID:this.currentUser.id.toString(),
        //   receiverID: UNKNOW_RECEIVER,
        //   type:RealTimeChatMessageType.GET_DISCUSSIONS
        // }); 
      });

    let getDiscussionHandle =(data:RealTimeMessage)=>{
      // console.log("Chat herer",data.data)
      if(data.error==RealTimeInitErrorType.SUCCESS)
      {
        this.listDiscusion = data.data.map(disc => Discussion.hydrate(disc));
        this.listDiscusionSubject.next(this.listDiscusion);
      }
      // this.realtimeService.removeListener(RealTimeChatMessageType.GET_DISCUSSIONS,getDiscussionHandle)
    }

    // this.realtimeService.addOnceListener(RealTimeChatMessageType.GET_DISCUSSIONS, getDiscussionHandle);
    // this.realtimeService.addListener(RealTimeChatMessageType.SEND_MESSAGE,(data:RealTimeMessage)=>this.receiveMessage(data))
  }

  getUnReadDiscussion():Observable<Discussion>
  {
    return this.listDiscusionSubject.pipe(
      switchMap((disc:Discussion[])=>from(disc)),
      filter((disc:Discussion)=>disc.read==0),
      map((disc:Discussion)=>{
        // this.eventService.findTransactionEvent.next({idProjet:disc.idProject.toString(),idTransaction:disc.idTransaction.toString()})
        this.eventService.findPackageEvent.next(disc.idProject.toString())   
        this.transactionService.getTransactionById(disc.idTransaction)     
        return disc;
      })
    );
  }

  receiveMessage(data:RealTimeMessage){

    // console.log("Receive new message ",data)
    let pos= this.listDiscusion.findIndex((discus:Discussion)=>discus._id==data.data.idDiscussion);
    console.log(data, pos);

    if(pos<0) return;

    let m = Message.hydrate(data.data);

    if(this.listDiscusion[pos].chats.findIndex((msg:Message)=>msg._id==m._id)>-1) return;
    
    // this.listDiscusion[pos].chats.push(m);
    // this.listDiscusion[pos].read = 0;
    // this.listDiscusionSubject.next(this.listDiscusion);
    // this.eventService.newMessageEvent.next(data);
  }

  //Send message on chat
  sendChatMessage(message:Message){
     
    let dataToSend: RealTimeMessage = {
      senderID:message.from.toString(), 
      receiverID: message.to.toString(),
      type:RealTimeChatMessageType.SEND_MESSAGE,
      data:message.toString()
    };

    // this.realtimeService.send(dataToSend);

    // this.receiveMessage(dataToSend);
  }
}
