import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColisPackage, Package, Person } from '../../entity/package';
import { Rental } from '../../entity/rental';
import { Offer, ServiceOfProvider, Zone } from '../../entity/provider';
import { PackageService } from './package.service';
import { RentService } from './rent.service';
import { ProviderService } from './provider.service';

export enum PackageCreationState
{
    SUBMIT_FORM,
    PROVIDER_FOUND,
    SUBMIT_PACKAGE_CREATION
}

@Injectable({
    providedIn: 'root'
})
export class CreateRentalService
{
    state:BehaviorSubject<PackageCreationState>=new BehaviorSubject<PackageCreationState>(PackageCreationState.SUBMIT_FORM);  
    foundProviders:ServiceOfProvider[]=[];
    foundOffers:Offer[]=[]; 
    rental: Rental=new Rental();
    constructor(
            protected packageService:PackageService,
            protected providerService:ProviderService,
            protected rentervice:RentService
        ) { }


    findProvider(data):Promise<any> {
        return new Promise<any>((resolve,reject)=>{
        this.providerService.findProvider(data)
        .then((result: any)=>{
            console.log(result)
            this.foundProviders= result.providers;
            this.foundOffers= result.offers;
            this.state.next(PackageCreationState.PROVIDER_FOUND);
            resolve(null);
        })
        .catch((error)=> {
            this.state.next(PackageCreationState.PROVIDER_FOUND);
            reject(error)
        })
        })
    }
    // findProvider():Promise<any> {
    //     return new Promise<any>((resolve,reject)=>{
    //     this.providerService.findProvider(this.package.from,this.package.to)
    //     .then((result:ServiceOfProvider[])=>{
    //         this.foundProviders= result;
    //         this.state.next(PackageCreationState.PROVIDER_FOUND);
    //         resolve(null);
    //     })
    //     .catch((error)=> {
    //         this.state.next(PackageCreationState.PROVIDER_FOUND);
    //         reject(error)
    //     })
    //     })
    // }

    find_offers(offers):Promise<any> {
        return new Promise<any>((resolve,reject)=>{
            try {
                this.foundOffers = offers;
                this.state.next(PackageCreationState.PROVIDER_FOUND);
                resolve(null);
            } catch (error) {
                this.state.next(PackageCreationState.PROVIDER_FOUND);
                reject(error)
            }
        })
    }

    // save():Promise<any>
    // {
    //     // console.log(this.package)
    //     return new Promise<any>((resolve,reject)=>{
        
    //     this.packageService.packageCreation(this.rental)
    //     .then((id)=>{
    //         this.Rental["id"]=id;
    //         resolve(null);
    //     })
    //     })
    // }

    // save_person_serv():Promise<any>
    // {
    //     // console.log(this.package)
    //     return new Promise<any>((resolve,reject)=>{
        
    //     this.packageService.transportPersonCreation(this.person)
    //     .then((id)=>{
    //         this.Rental["id"]=id;
    //         resolve(null);
    //     })
    //     })
    // }
    save_rent_serv():Promise<any>
    {
        return new Promise<any>((resolve,reject)=>{
        
            this.rentervice.rentCreation(this.rental)
            .then((id)=>{
                this.rental["id"]=id;
                resolve(null);
            })
        })
    }

}
