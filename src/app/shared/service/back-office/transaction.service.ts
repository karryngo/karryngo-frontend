import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../entity/transaction';
import { ApiService } from '../api/api.service';
import { EventService } from '../event/event.service';

@Injectable({
    providedIn: 'root'
})

export class TransactionService {
    transactions: Map<String,Transaction>=new Map<String,Transaction>();
    transactionList:BehaviorSubject<Map<String,Transaction>> = new BehaviorSubject<Map<String,Transaction>>(this.transactions)
    constructor(
        private apiService: ApiService,
        private eventService:EventService
    ) {
        // this.eventService.findTransactionEvent()
    }

    headers: Record<string, string> = {
        'Authorization': 'Bearer ' + this.apiService.getAccessToken(),
        'Content-Type': 'application/json'
    };

      //This method is used to get headers
  private getHeaders(){

    const headers = {
      'Authorization': 'Bearer ' + this.apiService.getAccessToken(),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return headers;
  }
    
    createTransaction(providerId: String, requesterId: String, serviceId: String, initiatorId: String): Promise<any> {
        console.log("idService", serviceId)
        console.log("idProvider", providerId,)
        console.log("idRequester", requesterId)
        console.log("idInitiator", initiatorId)
        // this.headers['Authorization']+=;
        return new Promise<any>((resolve, reject) => {
            this.apiService.post("requester/service/transaction/create", {
                "idService": serviceId,
                "idProvider": providerId,
                "idRequester": requesterId,
                "idInitiator": initiatorId
            }, this.getHeaders())
                .subscribe((result) => {
                    console.log(result)
                    if (result && result.resultCode == 0) resolve(result);
                    else reject(result);
                    // console.log("nomalData ",result)
                }, (error: any) => 
                {
                    // console.log("DataError ",error);
                    reject(error)
                });

        })
    }
    startTransaction(providerId: String, requesterId: String, serviceId: String, initiatorId: String): Promise<any> {
        // console.log("idService", serviceId)
        // console.log("idProvider", providerId,)
        // console.log("idRequester", requesterId)
        // console.log("idInitiator", initiatorId)
        // this.headers['Authorization']+=;
        return new Promise<any>((resolve, reject) => {
            this.apiService.post("requester/service/transaction/start", {
                "idService": serviceId,
                "idProvider": providerId,
                "idRequester": requesterId,
                "idInitiator": initiatorId
            }, this.getHeaders())
                .subscribe((result) => {
                    console.log(result)
                    if (result && result.resultCode == 0) resolve(result);
                    else reject(result);
                    // console.log("nomalData ",result)
                }, (error: any) => 
                {
                    // console.log("DataError ",error);
                    reject(error)
                });

        })
    }

    /**
     * This method is used to get specific transaction 
     * @param idTransaction string
     * @returns 
     */
    getTransactionById(idTransaction:String, update?: any):Promise<any>
    {
        return new Promise<any>((resolve, reject)=>{
            
            if(this.transactions.has(idTransaction) && update===undefined) return resolve(this.transactions.get(idTransaction));

            this.apiService.get(`requester/service/transaction/find/${idTransaction}`,this.getHeaders())
            .subscribe((result)=>{
                // console.log("transaction ", result)
                if(result && result.resultCode==0) return resolve(this.addObjectTransaction(result.result))
                reject(result);
            },(error)=>reject(error))
        })
        
    }

    addTransaction(transaction:Transaction):void
    {
        if(this.transactions.has(transaction._id)) return;
        this.transactions.set(transaction._id,transaction);
        this.transactionList.next(this.transactions);
    }
    addObjectTransaction(transaction:Record<string, any>):Transaction
    {
        let trans:Transaction=new Transaction();
        trans.hydrate(transaction);
        this.addTransaction(trans);
        return trans;
    }
    setTransactionFromAPI(data:Record<string, any>)
    {
        data.transactions.forEach(transaction => {
            let trans:Transaction=new Transaction();
            trans.hydrate(transaction);
            this.addTransaction(trans);
        });
    }


    // Start running the service
    start_service(data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.apiService.post("provider/service/start", data, this.getHeaders())
                .subscribe((result) => {
                    console.log(result)
                    if (result && result.resultCode == 0) resolve(result);
                    else reject(result);
                }, (error: any) => 
                {
                    reject(error)
                });

        })
    }
    // set the service as completed
    service_completed(data: any): Promise<any> {
        console.log(data)
        return new Promise<any>((resolve, reject) => {
            this.apiService.post("provider/service/completed", data, this.getHeaders())
                .subscribe((result) => {
                    console.log(result)
                    if (result && result.resultCode == 0) resolve(result);
                    else reject(result);
                }, (error: any) => 
                {
                    reject(error)
                });

        })
    }
}