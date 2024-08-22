import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";


@Injectable({
    providedIn: 'root'
})
export class WalletService {
    constructor(
        private api: ApiService,
    ) {}

    //This method is used to get headers
    private getHeaders(){

        const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        };

        return headers;
    }

    // Récupétere toutes les offres d'un provider
    get_user_wallet(user_id: any){
        return new Promise<any>((resolve,reject)=>{
            this.api.get("user/find_wallet/"+user_id, this.getHeaders())
            .subscribe((success)=>{
                if(success.resultCode==0)
                {
                    // console.log(success)
                    resolve(success.result);               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }

}
