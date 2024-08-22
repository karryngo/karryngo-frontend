import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Provider, ServiceOfProvider, Zone, Offer } from '../../entity/provider';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';
import { ServiceOfProviderLocalStorageService } from '../localstorage/serviceofprovider-local-storage.service';
import { UserService } from '../user/user.service';
import { CreateColisPackageService } from './create-package.service';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

currentServiceOfProvider: BehaviorSubject<ServiceOfProvider> = new BehaviorSubject<ServiceOfProvider>(new ServiceOfProvider());
    currentUser:Provider=null;
    headers = {};

    listOfService: Map<String, ServiceOfProvider> = new Map<String, ServiceOfProvider>();
    listOffer: Map<String, Offer> = new Map<String, Offer>();


    constructor(private api: ApiService, 
        private userService: UserService,
        private authService:AuthService,
        private eventService:EventService,
        private tripCreationServ:CreateColisPackageService,
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

    create_offer(offer?: any){
        let data = offer;
        data.geo = {
            type: "Point",
            coordinates: [offer.latitude, offer.longitude]
        }
        console.log(offer)
        return new Promise<any>((resolve,reject)=>{
            this.api.post("offer/new", data, this.getHeaders())
            .subscribe((result)=>{
                if(result.resultCode==0) resolve(result);    
                else reject(result);
            },
            (error)=> reject(error))
        })
    }

    // Récupétere toutes les offres d'un provider
    get_provider_offers(provider_id?: any){
        return new Promise<any>((resolve,reject)=>{
            this.api.get("offer/provider/"+provider_id, this.getHeaders())
            .subscribe((success)=>{
                if(success.resultCode==0)
                {
                    console.log(success)
                    resolve(success.result);               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }

    // Récupérer une offre à partir de son identifiant
    get_offer_by_id(id?: any){
        return new Promise<any>((resolve,reject)=>{
            this.api.get("offer/get/"+id, this.getHeaders())
            .subscribe((success)=>{
                if(success.resultCode==0)
                {
                    console.log(success)
                    resolve(success.result);               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }

    // Mettre une offre à jour
    update_offer(id?: any, data?: any){
        return new Promise<any>((resolve,reject)=>{
            this.api.post("offer/update/"+id, data, this.getHeaders())
            .subscribe((success)=>{
                if(success.resultCode==0)
                {
                    console.log(success)
                    resolve(success.result);               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }


    // Récupérer les offres dans un rayon
    get_offers_from_area(latitude?: number, longitude?: number, area?: string){
        let data= {
            latitude: latitude,
            longitude: longitude,
            area: area
        }
        return new Promise<any>((resolve,reject)=>{
            this.api.post("offer/update", data, this.getHeaders())
            .subscribe((success)=>{
                if(success.resultCode==0)
                {
                    console.log(success)
                    resolve(success.result);               
                }
                else reject(success);
            },
            (error)=> reject(error))
        })
    }

    get_by_domain_and_location(data: any, radius):Promise<any> {
        console.log(data);
        return new Promise<any>((resolve,reject)=>{
            this.api.post("offer/get_by_domain_and_location/" + radius, data, this.getHeaders())
            .subscribe((result)=>{
                console.log(result)
                if(result.resultCode==0)
                {
                    console.log(result)
                    // let result:Offer[]=success.result.map((service:Record<string,any>)=>{
                    //     let offer:Offer=new Offer();
                    //     offer.hydrate(service.service);
                    //     if(!this.listOffer.has(offer._id)) this.listOffer.set(offer._id, offer);
                        
                    //     // let provider:Provider = new Provider();
                    //     // provider.hydrate(service.provider);
                    //     // this.userService.setUser(provider);

                    //     // if(provider.isCompany) offer.name=provider.companyName
                    //     // else offer.name=provider.getSimpleName();
                    //     return offer;
                    // }) 
                    // console.log(result)
                    this.tripCreationServ.find_offers(result.result);
                    resolve(result.result);               
                }
                else if(result.resultCode==-1) resolve(result);
            },
            (error)=> reject(error))
        })
    }



}