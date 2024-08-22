import { Injectable } from '@angular/core';
import { Transaction } from '../../entity/transaction';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';
import { RealTimeInitErrorType, RealTimeMessage, RealTimeTransactionError, RealTimeTransactionMessageType, UNKNOW_RECEIVER } from '../realtime/realtime-protocole';
import { RealtimeService } from '../realtime/realtime.service';
import { TransactionService } from './transaction.service';

@Injectable()
export class TransactionRealtimeService {

  constructor(
    private eventService:EventService,
    private transactionService:TransactionService,
    private authService:AuthService,
    private realtimeService:RealtimeService)
  {
    this.eventService.findTransactionEvent.subscribe((infos)=>{
      if(infos==({}).constructor) return;
      this.getTransactionById(infos);
    })
    this.realtimeService.addOnceListener(RealTimeTransactionMessageType.GET_TRANSACTION,(data:RealTimeMessage)=>this.handleGetTransaction(data))
   }

   getTransactionById(infos:{idTransaction?:string,idProjet?:string})
   {
     console.log("Transaction service ",this.transactionService.transactions.has(infos.idTransaction))
    if(this.transactionService.transactions.has(infos.idTransaction)) return;
    this.realtimeService.send({
      senderID:this.authService.currentUserSubject.getValue().id.toString(),
      receiverID:UNKNOW_RECEIVER,
      type:RealTimeTransactionMessageType.GET_TRANSACTION,
      data:infos
    });
   }

   handleGetTransaction(data:RealTimeMessage)
   {
     console.log("handle transaction ", data)
      if(data.error==RealTimeTransactionError.TRANSACTION_NOT_EXIST) return;
      if(data.error==RealTimeInitErrorType.SUCCESS)
      {
        this.transactionService.addObjectTransaction(data.data);
      }
   }
}
