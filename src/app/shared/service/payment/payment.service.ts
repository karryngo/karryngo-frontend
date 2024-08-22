import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

// export declare enum MethodPaymentState {
//   bank = 'BANK',
//   mtn = 'MTN_MONEY',
//   orange = 'ORANGE_MONEY'
// }

export enum TransactionState {
    PENDING = 'PENDING',
    ERROR = 'FINANCIAL_TRANSACTION_ERROR',
    START = 'FINANCIAL_TRANSACTION_START',
    SUCCESS = 'SUCCES',
    FAILED = 'FAILED',
    PAUSE = 'FINANCIAL_TRANSACTION_PAUSE',
    COMPLETED = 'COMPLETED'
}


@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(
    private api: ApiService,
    ) { }


    //This method is used to get headers
    private getHeaders(){

        const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        };

        return headers;
    }

    /**
     * This method is used to ask payment 
     * @param paymentReq {idService: string; paiement_mode: string;}
     * @returns 
     */
    askPayment(paymentReq: any): Promise<any>{

        return new Promise((resolve, reject) => {

            this.api.post('requester/service/make_paiement', paymentReq, this.getHeaders()).subscribe((rep: any)=>{
            if(rep && rep.resultCode==0){
                resolve(rep);
            }else{
                reject(rep);
            }
            }, (err)=>{
            console.log(err);
            reject(err.error);
            });

        });

    }

    /**
     * This method is used to cancel a payment 
     * @param objReq {ref: string; }
     * @returns Promise
     */
    cancelPayment(objReq: any): Promise<any>{

    return new Promise((resolve, reject) => {

        this.api.post('requester/service/cancel_paiement', objReq, this.getHeaders()).subscribe((rep: any)=>{
        if(rep && rep.resultCode==0){
            resolve(rep);
        }else{
            reject(rep);
        }
        }, (err)=>{
        console.log(err);
        reject(err.error);
        });

    });

    }

    /**
     * This method is used to check state of payment
     * @param paymentRef string, payment reference
     * @returns 
     */
    checkPayment(paymentRef: string, data: any): Promise<any>{

    return new Promise((resolve, reject) => {

        this.api.post('requester/service/check_paiement/'+paymentRef, data, this.getHeaders()).subscribe((rep: any)=>{
        if(rep && rep.resultCode==0){
            resolve(rep.data);
        }else{
            reject(rep);
        }
        }, (err)=>{
            // console.log(err);
            reject(err.error);
        });

    });
    }

    /**
     * This method is used to perform
     * sending bill via mail
     *  
     * @param serviceId string service'id
     */
    sendBill(serviceId: any){

    return new Promise((resolve, reject) => {

        this.api.get('requester/service/transaction/send_bill/'+serviceId, this.getHeaders()).subscribe((rep: any)=>{
        if(rep && rep.resultCode==0){
            resolve(rep.data);
        }else{
            reject(rep);
        }
        }, (err)=>{
        console.log(err);
        reject(err.error);
        });

    });
    }

    /**
     * This method is used to display message
     * Error when checking
     * @param code number, error code
     * @returns string
     */
    getCheckingMgsError(code: number): string{

    let message: string = "";

    switch (code) {
        case -1:
        message = "Payment transaction not found";
        break;
        
        case -3:
        message = "Please provide transaction reference";
        break;

        case -203:
        message = "Unable to cancel this transaction because it is ended";
        break;
    
        default:
        message = "This transaction is not correct provide the correct one";
        break;
    }

    return message;
    }

    //This method is used to retrieve message error
    getErrorMessageReqPay(code: number): string{

    let message: string = "";

    switch (code) {
        case -3:
        message = "You cannot make a payment at the step of this transaction. Ask to your provider to validate service";
        break;
        
        case -201:
        message = "The account user/provider does not have a MTN or Orange Money account";
        break;

        case -204:
        message = "Your account has an insufficient funds, please you need to recharge it";
        break;
        
        case -205:
        message = "This payment method is not found, plase use another one";
        break;
    
        default:
        message = "This service does not exists or it is unavailable. Request another service";
        break;
    }

    return message;
    }
}
