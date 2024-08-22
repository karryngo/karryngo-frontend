import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Provider, ServiceOfProvider, Zone } from '../../entity/provider';
import { User } from '../../entity/user';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';
import { ServiceOfProviderLocalStorageService } from '../localstorage/serviceofprovider-local-storage.service';
import { UserlocalstorageService } from '../localstorage/userlocalstorage.service';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    currentServiceOfProvider: BehaviorSubject<ServiceOfProvider> = new BehaviorSubject<ServiceOfProvider>(new ServiceOfProvider());
    currentUser:Provider=null;
    headers = {};

    listOfService: Map<String, ServiceOfProvider> = new Map<String, ServiceOfProvider>();


    constructor(private api: ApiService,
        private router: Router,
        private toastr: ToastrService,
        private userService: UserService,
        private authService:AuthService,
        private eventService:EventService,
        private localStorageService: UserlocalstorageService,
        private serviceOfProviderLocalStorage:ServiceOfProviderLocalStorageService,
    ) {
        this.headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        };

        this.serviceOfProviderLocalStorage.dataService.subscribe((dataService:ServiceOfProvider)=>
        {
        this.currentServiceOfProvider.next(dataService);
        });
        
        this.authService.currentUserSubject.subscribe((user:Provider)=>{
        this.currentUser=user;
        })
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

    // getProvider(id: String): Promise<any> {
    //   return new Promise((resolve, reject) => {
    //     if (this.listOfProvider.has(id)) return resolve(this.listOfProvider.get(id));
    //     this.userService.getUserById(id)
    //       .then((success) => {
    //         let provider: Provider = new Provider();
    //         if (success.resultCode == 0) {
    //           provider.hydrate(success.result);
    //           this.listOfProvider.set(provider._id, provider);
    //           resolve(provider);
    //         }
    //         else reject(success);
    //       })
    //       .catch((error) => reject(error));
    //   })
    // }

    getServiceOfProviderFromApi(): Promise<any> {
        return new Promise((resolve, reject) => {
        let sub=this.authService.currentUserSubject.subscribe((user:Provider)=>{
            this.api.get(`provider/service/${user._id}`, this.getHeaders()).subscribe((result) => {
            if (result && result.resultCode == 0) {
                // console.log(result);
                let currentServiceOfProvider = new ServiceOfProvider();
                currentServiceOfProvider.hydrate(result.result);
                // console.log("Service ",result,currentServiceOfProvider)
                this.serviceOfProviderLocalStorage.setData(currentServiceOfProvider);
                // this.currentServiceOfProvider.next(currentServiceOfProvider)
                resolve(true);
            }
            else resolve(false)
            }, (err)=>{
            reject(err);
            })
        })
        sub.unsubscribe()      
        })
    }

    find_profile(user_id: any): Promise<any> {
        return new Promise((resolve, reject) => {
        let sub=this.authService.currentUserSubject.subscribe((user:Provider)=>{
            this.api.get(`provider/find_profile/${user_id}`, this.getHeaders())
            .subscribe((result) => {
                console.log(result)
                if (result && result.resultCode == 0) {
                    resolve(result);
                }
                else resolve(false)
            }, (err)=>{
                reject(err);
            })
        })
            sub.unsubscribe()      
        })
    }

    add_service_skills(data: any, user_id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.post(`provider/add_service_skills/${user_id}`, data, this.getHeaders())
            .subscribe((result) => {
                console.log(result)
                if (result && result.resultCode == 0) {
                    resolve(result);
                }
                else resolve(false)
            }, (err)=>{
                reject(err);
            }) 
        })
    }

    update_location(data: any, user_id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.post(`provider/update_location/${user_id}`, data, this.getHeaders())
            .subscribe((result) => {
                console.log(result)
                if (result && result.resultCode == 0) {
                    resolve(result);
                }
                else resolve(false)
            }, (err)=>{
                reject(err);
            }) 
        })
    }

    // permet d'ajouter des vehicules au profile d'un provider
    saveProviderVehicle( providers_id: string, data: any): Promise<any> {
        console.log(data) 
        return new Promise((resolve, reject) => {
            this.api.post(`provider/add_vehicle/${providers_id}` , data, this.getHeaders())
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    resolve(success);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                console.log(error)
                reject(error);
            });
        })
    }
    saveProviderDocuments( providers_id: string, document: FormData){
        const headers = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Accept': 'application/json'
        };
        return this.api.post(`provider/addDocument/${providers_id}`, document, headers);
    }

    // permet d'ajouter des vehicules au profile d'un provider
    deleteProviderVehicle( providers_id: string, vehicle: any){
        return this.api.post(`provider/delete_vehicle/${providers_id}`, vehicle, this.getHeaders());
    }
    removeDocument( providers_id: string, document: any){
        return this.api.post(`provider/removeDocument/${providers_id}`, document, this.getHeaders());
    }

    remove_service_skills(data: any, user_id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.post(`provider/remove_service_skills/${user_id}`, data, this.getHeaders())
            .subscribe((result) => {
                console.log(result)
                if (result && result.resultCode == 0) {
                    resolve(result);
                }
                else resolve(false)
            }, (err)=>{
                reject(err);
            }) 
        })
    }

    // permet d'enregistrer les documents du provider
    seveProviderDocuments( data: any): Promise<any> {
        console.log(data) 
        return new Promise((resolve, reject) => {
            this.api.post("files/provider/save_documents", data)
            .subscribe(success => {
                if(success.resultCode === 0)
                {              
                    console.log(success)  
                    resolve(success);
                }
                else
                {
                    reject(success);
                }
            }, error => {
                console.log(error)
                reject(error);
            });
        })

    }

    becomeProvider(provider: Provider, service: ServiceOfProvider, providerType: number, formData: FormData): Promise<any> {
        const headers = {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            'Accept': 'application/json'
        };
        console.log(headers);
        let data = {
            type: providerType,
            ...provider.toString(),
            ...service.toString()
        }
        formData.append('data', JSON.stringify(data));
        return new Promise<any>((resolve, reject) => {
        this.api.post('auth/provider',
            formData, headers)
            .subscribe((result) => {
            if (result && result.resultCode == 0) {
                provider._id = result.result.idService;
                let cprovider:Provider= this.authService.currentUserSubject.value;
                cprovider.hydrate(provider);
                cprovider.isAcceptedProvider=false;
                cprovider.isProvider=true;
                this.serviceOfProviderLocalStorage.setData(service);
                this.userService.getcurrent_user().then((data) => { 
                    console.log(data);
                    this.localStorageService.setUserData({ isLoggedIn: true, user: data });
                    this.router.navigate(['mykarryngo']);
                    this.toastr.success('aaa');
                    this.eventService.loginEvent.next(true);
                    resolve(data);
                });
                // this.authService.resetDataUser(cprovider);
            }
            else reject(result);
            }, (error: any) => reject(error))
        });
    }

    // findProvider(startLocalisation:Zone, endLocalisation:Zone):Promise<any>
    // {
    //     return new Promise<any>((resolve,reject)=>{
    //         this.api.post("provider/service/find",{
    //         start:startLocalisation.toString(),
    //         end:endLocalisation.toString()
    //         },
    //         this.getHeaders()).subscribe((success)=>{
    //         if(success.resultCode==0)
    //         {
    //             console.log(success)
    //             let result:ServiceOfProvider[]=success.result.providers.map((service:Record<string,any>)=>{
    //             let serviceOfProvider:ServiceOfProvider=new ServiceOfProvider();
    //             serviceOfProvider.hydrate(service.service);
    //             if(!this.listOfService.has(serviceOfProvider._id)) this.listOfService.set(serviceOfProvider._id,serviceOfProvider);
                
    //             let provider:Provider = new Provider();
    //             provider.hydrate(service.provider);
    //             this.userService.setUser(provider);

    //             if(provider.isCompany) serviceOfProvider.name=provider.companyName
    //             else serviceOfProvider.name=provider.getSimpleName();
    //             return serviceOfProvider;
    //             }) 
    //             resolve(result);               
    //         }
    //         else reject(success);
    //         },
    //         (error)=> reject(error))
    //     })
    // }

    findProvider(data):Promise<any>
    {
        return new Promise<any>((resolve,reject)=>{
            this.api.post("offer/get_by_domain_and_location_with_providers/10000000",data,
            this.getHeaders()).subscribe((success)=>{
                if(success.resultCode==0)
                {
                    console.log(success)
                    var offers = success.result.offers
                    let result:ServiceOfProvider[]=success.result.providers.map((service:Record<string,any>)=>{
                        let serviceOfProvider:ServiceOfProvider=new ServiceOfProvider();
                        serviceOfProvider.hydrate(service.service);
                        if(!this.listOfService.has(serviceOfProvider._id)) this.listOfService.set(serviceOfProvider._id,serviceOfProvider);
                        
                        let provider:Provider = new Provider();
                        provider.hydrate(service.provider);
                        this.userService.setUser(provider);

                        if(provider.isCompany) serviceOfProvider.name=provider.companyName
                        else serviceOfProvider.name=provider.getSimpleName();
                        return serviceOfProvider;
                    }) 
                    resolve({providers: result, offers: offers});               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }


    find_provider_by_id(provider_id: any):Promise<any>
    {
        return new Promise<any>((resolve,reject)=>{
            this.api.get("provider/find/" + provider_id, this.getHeaders())
            .subscribe((success)=>{
                if(success.resultCode==0)
                {
                    // console.log(success)
                    let result:ServiceOfProvider = success.result[0];
                    console.log(result)
                    resolve(result);               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }

    find_providers_by_ids(providers_id: any):Promise<any>
    {
        return new Promise<any>((resolve,reject)=>{
            this.api.get("providers/find/[\"" + providers_id + "\"]", this.getHeaders())
            .subscribe((success)=>{
                if(success.resultCode==0)
                {
                    // console.log(success)
                    let result:ServiceOfProvider = success.result[0];
                    console.log(result)
                    resolve(result);               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }

    getProviderStats(data: any)
    {
        return this.api.post("admin/getProviderStats", data, this.getHeaders())
    }

    getProviderStatistics(data: any)
    {
        return this.api.post("admin/getProviderStatistics", data, this.getHeaders())
    }

    getTotalProviders()
    {
        return this.api.get("admin/getTotalProviders", this.getHeaders())
    }

    getProviderSkills(data: any)
    {
        return this.api.post("admin/getProviderSkills", data, this.getHeaders())
    }

}