import { NotificationService } from './../notification/notification.service';
import { UserLocalStorageData, UserlocalstorageService } from './../localstorage/userlocalstorage.service';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColisPackage, Package, packageBuilder, PackageState, Person, TravelPackage } from '../../../shared/entity/package';
import { ProviderService } from './provider.service';
import { Provider,ServiceOfProvider, Zone } from '../../entity/provider';
import { EventService } from '../event/event.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionState } from '../../entity/transaction';
import { RealTimeMessage } from '../realtime/realtime-protocole';

import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class PackageService {
    packages: Map<String,Package>=new Map<String,Package>();
    packageList:BehaviorSubject<Map<String,Package>> = new BehaviorSubject<Map<String,Package>>(this.packages)
    headers = {};
    constructor(
        private api: ApiService,
        private toastr: ToastrService,
        private transactionService:TransactionService,
        // private providerService:ProviderService,
        private localStorageService: UserlocalstorageService,
        private notificationService: NotificationService,
        private router: Router,
        private http: HttpClient,
        private eventService:EventService
    ) { 
        this.eventService.loginEvent.subscribe(()=>{
            // this.headers = {
            //     'Authorization': 'Bearer ' + this.api.getAccessToken(),
            //     'Content-Type': 'application/json'
            //   };
            //   this.getAllPackagesUser();
        });

        // this.eventService.findPackageEvent.subscribe((packageId:string)=>{
        //     this.findPackageById(packageId);
        // })
    }

    //This method is used to get headers
    private getHeaders(){

        const headers = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Content-Type': 'application/json',
        };

        return headers;
    }


    find_package_services_by_location(data:any, radius: any)
    {
        console.log(data);
        return new Promise<any>((resolve,reject)=>{
            this.api.post("package_serv/get_by_location/" + radius, data, this.getHeaders())
            .subscribe((result)=>{
                console.log(result)
                if(result.resultCode==0)
                {
                    console.log(result)
                    resolve(result.result);               
                }
                else if(result.resultCode==-1) resolve(result);
            },
            (error)=> reject(error))
        })
    }


    find_package_services_by_user_location(data:any, radius: any, skip: any, limit: any)
    {
        const url = `${environment.apiUrl}/package_serv/get_by_user_location/${radius}/${skip}/${limit}`;
        return this.http.post<any>(url, data, {headers: this.getHeaders()});
        // console.log(data);
        // return new Promise<any>((resolve,reject)=>{
        //     this.api.post("package_serv/get_by_user_location/" + radius +"/"+ skip+"/"+ limit, data, this.getHeaders())
        //     .subscribe((result)=>{
        //         console.log(result)
        //         if(result.resultCode==0)
        //         {
        //             console.log(result)
        //             resolve(result.result);               
        //         }
        //         else if(result.resultCode==-1) resolve(result);
        //     },
        //     (error)=> reject(error))
        // })
    }

    get_by_selected_provider(user_id: any, state: any, skip: any, limit: any)
    {
        // console.log(user_id);
        return new Promise<any>((resolve,reject)=>{
            this.api.get("package_serv/get_by_selected_provider/" + user_id +"/"+ state+"/"+ skip+"/"+ limit, this.getHeaders())
            .subscribe((result)=>{
                // console.log(result)
                if(result.resultCode==0)
                {
                    // console.log(result)
                    resolve(result.result);               
                }
                else if(result.resultCode==-1) resolve(result);
            },
            (error)=> reject(error))
        })
    }


    handlePackageModificationMessage(data:RealTimeMessage)
    {
        // if(!data.data || !data.data.type)
    }


    findLocalPackagesById(id: String): Package {
        if (this.packages.has(id)) { return this.packages.get(id); }
        return null;
    }

    /**
     * This method is used to retrieve unique package
     * @param id string
     * @returns 
     */
    findPackageById(id: String): Promise<Package> {
        // console.log(id);
        if(id===undefined) return;

        return new Promise((resolve, reject) => {
            if (this.packages.has(id))  resolve(this.packages.get(id));
            else {
                this.api.get(`requester/service/one/${id}`,this.getHeaders()).subscribe(success=>{
                      if(success && success.resultCode==0)
                      {
                          let pack:Package =packageBuilder(success.result);
                          if(pack===null){
                            reject(null);
                            return;
                          }  
                            console.log(pack);
                          if(!this.packages.has(pack._id))
                          {
                            this.packages.set(pack._id,pack);
                            this.packageList.next(this.packages)
                          }
                         resolve(pack);
                      }
                      else reject(null);
                  }, (error: any)=> reject(null))
            }
        })
    }

    /**
     * This method is used to make a new price suggestion
     * 
     * @param toSend any, {idTransaction: string, price: number}
     * 
     * @returns Promise
     */
    updateTransactionPrice(toSend: any): Promise<any> {
        // console.log(id);
        
        return new Promise((resolve, reject) => {
                        
            this.api.post(`requester/service/transaction/update_price`, toSend, this.getHeaders()).subscribe(success=>{
                    
                if(success && success.resultCode==0)
                    resolve(success);
                else 
                    reject(success);

            }, (error: any)=> reject(error))
            
        });
    }

    /**
     * This method is used to perform accepting price
     * 
     * @param toSend any, {idTransaction: string, idService: string}
     * @param user Provider, Provider
     * 
     * @returns Promise
     */
    acceptTransactionPrice(toSend: any, user: Provider): Promise<any> {        

        return new Promise((resolve, reject) => {

            if(!user.isAcceptedProvider){
                reject({error:-4, message: "You are not a provider"});
            }

            this.api.post(`requester/service/transaction/accept_price`, toSend, this.getHeaders()).subscribe(success=>{
                    
                if(success && success.resultCode==0)
                    resolve(success);
                else 
                    reject(success);

            }, (error: any)=> reject(error))
            
        });
    }

    /**
     * This method is used to perform start/stop a service
     * 
     * @param toSend any, {idTransaction: string}
     * @param user Provider, Provider
     * @param type string, "start" or "stop"
     * 
     * @returns Promise
     */
     startOrStopTransaction(toSend: any, type:string, user: Provider): Promise<any> {        

        return new Promise((resolve, reject) => {

            if(user.isAcceptedProvider)
                reject({error:-3, message: "You are not a provider"});
            
            this.api.post(`requester/service/${type}`, toSend, this.getHeaders()).subscribe(success=>{
                    
                if(success && success.resultCode==0)
                    resolve(success);
                else 
                    reject(success);

            }, (error: any)=> reject(error))
            
        });
    }

   
    getPackageList()
    {
        let list:Package[]=[];
        for(const key in this.packages)
        {
            list.push(this.packages.get(key));
        }
        return list;
    }

    getRecentRequestedServices(state: any, skip: any, limit: any): Observable<any> {
        let data = {
            state: state,
            skip: skip,
            limit: limit  
        }
        return this.api.post('requester/service/getRecentRequestedServices', data, this.getHeaders());
    }

    //Retrieve services according to connected user
    getAllPackagesUser(state: any, skip: any, limit: any): Promise<any> {
        // console.log("111111", state)
        // console.log("111111", skip)
        // console.log("111111", limit)
        return new Promise((resolve, reject) => {
          this.api.get('requester/service/list/'+state+"/"+skip+"/"+limit, this.getHeaders()).subscribe((response: any) => {
            if (response) {
                if(response.resultCode==0)
                {
                    console.log(response)
                    // response.result.map((pkg:Record<string,any>)=>{
                    //     let pack:Package= packageBuilder(pkg);
                    //     console.log(pack)
                    //     if(!this.packages.has(pack.id)) this.packages.set(pack.id.toString(),pack);
                    //     this.transactionService.setTransactionFromAPI(pkg);
                    // })
                    // this.packageList.next(this.packages);
                    resolve(response);
                }else if(response.resultCode==-3){
                    this.localStorageService.clearData();
                    setTimeout(() => {
                    //   this.toastr.success('You have been successfully logged out!');
                    this.router.navigate(['login']);
                    this.notificationService.showNotification('top', 'right', 'info', '', '\<b>Your session is expired. Log In again !\</b>');

                    }, 2000);
                }else{

                    reject(response);        
                }
            }

          }, (error: any) => {
              console.log(error);
              if(error.status==401 && error.error.resultCode==-3){
                this.localStorageService.clearData();
                setTimeout(() => {
                //   this.toastr.success('You have been successfully logged out!');
                this.router.navigate(['login']);
                this.notificationService.showNotification('top', 'right', 'info', '', '\<b>Your session is expired. Log In again !\</b>');

                }, 400);
              }
              else if(error.status==502 || error.status==503 || error.status==501){
                this.router.navigate(['welcome']);
                this.notificationService.showNotification('top', 'right', 'info', '', '\<b>The services are temporarely unavailable. Try again later or Contact Us !\</b>');  
              }
              else{
                reject(error);
              }
          });
        });
      }

    /**
     * This method is used to retrieve service id
     * @param id_service string, service id
     * @returns 
     */
    getOnePackagesById(id_service: string): Promise<any> {

        return new Promise((resolve, reject) => {
          const route: string = "requester/service/one/"+id_service;
          this.api.get(route, this.getHeaders()).subscribe((response: any) => {
            if (response) {
                if(response.resultCode==0){
                    resolve(response);
                }else if(response.resultCode==-3){
                    this.localStorageService.clearData();
                    setTimeout(() => {
                    //   this.toastr.success('You have been successfully logged out!');
                    this.router.navigate(['login']);
                    this.notificationService.showNotification('top', 'right', 'info', '', '\<b>Your session is expired. Log In again !\</b>');
                    }, 800);
                }else{
                    reject(response);
                }
            }

          }, (error: any) => {
            //   console.log(error);
              if(error.status==401 && error.error.resultCode==-3){
                this.localStorageService.clearData();
                setTimeout(() => {
                //   this.toastr.success('You have been successfully logged out!');
                this.router.navigate(['login']);
                this.notificationService.showNotification('top', 'right', 'info', '', '\<b>Your session is expired. Log In again !\</b>');

                }, 200);
              }else{
                reject(error);
              }
          });
        });

      }


// permet d'enregistrer un package
    packageCreation(data: ColisPackage): Promise<any> {
        console.log(data.toString()) 
        return new Promise((resolve, reject) => {
            
            console.log("data.toString() ",data.toString());
            delete data.id;
            this.api.post('requester/service/add', data.toString(), this.getHeaders())
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    // this.packages.set(success.result.idService,data);
                    //this.toastr.success('You have been successfully Register your package!');               
                    resolve(success.result.idService);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                //this.toastr.success(error.message);
                console.log(error)
                reject(error);
            });
        })

    }

// permet d'enregistrer un transport de personne
    // transportPersonCreation(data: Person): Promise<any> {
    //     console.log(data.toString())
    //     return new Promise((resolve, reject) => {
            
    //         console.log("data.toString() ",data.toString());
    //         delete data.id;
    //         this.api.post('requester/service/add', data.toString(), this.getHeaders())
    //         .subscribe(success => {
    //             if(success.resultCode === 0)
    //             {              
    //                 console.log(success)  
    //                 // this.packages.set(success.result.idService,data);
    //                 //this.toastr.success('You have been successfully Register your package!');               
    //                 resolve(success.result.idService);
    //             }
    //             else
    //             {
    //                 reject(success);
    //             }
    //         }, error => {
    //             //this.toastr.success(error.message);
    //             reject(error);
    //         });
    //     })

    // }

    // permet d'enregistrer un package
    savePackage(data: ColisPackage, formData): Promise<any> {
        console.log(data.toString())

        const headers = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Accept': 'application/json'
        };

        formData.append('data', JSON.stringify(data.toString()));

        return new Promise((resolve, reject) => {
            
            console.log("data.toString() ",data.toString());
            delete data.id;
            this.api.post('requester/service/add/packageCreation', formData, headers)
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    console.log(success) 
                    resolve(success.result.idService);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                //this.toastr.success(error.message);
                console.log(error)
                reject(error);
            });
        })

    }

    // permet d'enregistrer un transport de personne
    transportPersonCreation(data: Person): Promise<any> { 
        console.log(data.toString())
        return new Promise((resolve, reject) => {
            
            console.log("data.toString() ",data.toString());
            delete data.id;
            this.api.post('requester/service/add/transportPersonCreation', data.toString(), this.getHeaders())
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    // this.packages.set(success.result.idService,data);
                    //this.toastr.success('You have been successfully Register your package!');               
                    resolve(success.result.idService);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                //this.toastr.success(error.message);
                reject(error);
            });
        })

    }


// permet d'enregistrer un transport de personne
    travelPackageCreation(data: TravelPackage): Promise<any> {
        console.log(data.toString())
        return new Promise((resolve, reject) => {
            
            console.log("data.toString() ",data.toString());
            delete data.id;
            this.api.post('requester/service/add', data.toString(), this.getHeaders())
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    // this.packages.set(success.result.idService,data);
                    //this.toastr.success('You have been successfully Register your package!');               
                    resolve(success.result.idService);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                //this.toastr.success(error.message);
                reject(error);
            });
        })

    }
    
    // permet d'update les infos d'un package
    updatePackage(nid: string, data: Package): Promise<any> {

        return new Promise((resolve, reject) => {

            this.api.post(`requester/service/${nid}`, data.toString(), this.getHeaders())
            .subscribe(success => {
                if(success && success.resultCode==0)
                {
                    this.packages.set(success.result.idService,data);
                    
                    //this.toastr.success('You have been successfully Register your package!');
                    resolve(success);
                }
                else reject(success);
            }, error => {
                reject(error);
            });
        });
    }

    acceptPackagePrice(idService:String , transaction: Transaction):Promise<any> {
        return new Promise<any>((resolve,reject)=>{
            this.api.post('requester/service/transaction/accept_price',
            {  idService,idTransaction:transaction.id},
                this.getHeaders()
            ).subscribe((result)=>{
                console.log(result);
                if(result && result.resultCode==0)
                {
                    let pck:Package= this.packageList.getValue().get(idService);
                    pck.idSelectedTransaction=transaction.id.toString();
                    pck.idSelectedProvider=transaction.idProvider.toString(),
                    pck.state=PackageState.SERVICE_IN_TRANSACTION_STATE;
                    this.transactionService.transactionList.getValue().get(transaction.id).price=pck.suggestedPrice;
                    this.transactionService.transactionList.getValue().get(transaction.id).state=TransactionState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT;
                    resolve(true);
                }
                reject(result);
            },(error)=>{
                console.log(error)
                reject(error)
            });
        })
    }

    updatePrice(idPackage:string,idTransaction:String,price:number)
    {
        return new Promise<any>((resolve,reject)=>{
            this.api.post("requester/service/transaction/update_price",
            {
                price,
                idTransaction
            },this.getHeaders()).subscribe((result)=>{
                if(result && result.resultCode==0) 
                {
                    this.packageList.getValue().get(idPackage).suggestedPrice=price;
                    this.transactionService.transactionList.getValue().get(idTransaction).price=price;
                   return resolve(true);
                }
                reject(result);
            },(error)=>reject(error));
        })
    }
    confirmRequesterPaymentToPlatform(transaction:Transaction):Promise<any>
    {
        return new Promise<any>((resolve,reject)=>{
            this.api.post("requester/service/make_paiement",
            { idTransaction:transaction.id },this.getHeaders()).subscribe(
                (result)=>{
                    if(result && result.resultCode==0)
                    {
                        this.transactionService.transactionList.getValue().get(transaction.id).state=TransactionState.SERVICE_PAIEMENT_DONE_AND_WAITING_START;
                        return resolve(true);
                    }
                    reject(result);
                },
                (error)=>reject(error)
            )
        });
    }
    startPackageTransport(transaction:Transaction):Promise<any>
    {
        return new Promise<any>((resolve,reject)=>{
            this.api.post("requester/service/start",{idTransaction:transaction.id},this.getHeaders()).subscribe(
                (result)=>{
                    if(result && result.resultCode==0)
                    {
                        this.transactionService.transactionList.getValue().get(transaction.id).state=TransactionState.SERVICE_RUNNING;
                        return resolve(true);
                    }
                    reject(result)
                },
                (error)=>reject(error)
            )
        })
    }

    endPackageTransport(transaction:Transaction):Promise<any>
    {
        return new Promise<any>((resolve,reject)=>{
            this.api.post("requester/service/end",{idTransaction:transaction.id},this.getHeaders()).subscribe(
                (result)=>{
                    if(result && result.resultCode==0)
                    {
                        this.transactionService.transactionList.getValue().get(transaction.id).state=TransactionState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT;
                        return resolve(true);
                    }
                    reject(result)
                },
                (error)=>reject(error)
            )
        })
    }

    

}
