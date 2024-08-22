import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColisPackage, Package, Person, TravelPackage } from '../../entity/package';
import { Offer, ServiceOfProvider, Zone } from '../../entity/provider';
import { PackageService } from './package.service';
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
export class CreateColisPackageService
{
    state:BehaviorSubject<PackageCreationState>=new BehaviorSubject<PackageCreationState>(PackageCreationState.SUBMIT_FORM);  
    foundProviders:ServiceOfProvider[]=[];
    foundOffers:Offer[]=[];
    package:ColisPackage=new ColisPackage();
    travel_package: TravelPackage=new TravelPackage();
    person:Person=new Person();
    constructor(protected packageService:PackageService,protected providerService:ProviderService) { }


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

    save():Promise<any>
    {
        // console.log(this.package)
        return new Promise<any>((resolve,reject)=>{
        
        this.packageService.packageCreation(this.package)
        .then((id)=>{
            this.package["id"]=id;
            resolve(null);
        })
        })
    }

    savePackage(formData: any):Promise<any>
    {
        // console.log(this.package)
        return new Promise<any>((resolve,reject)=>{
        
        this.packageService.savePackage(this.package, formData)
        .then((id)=>{
            this.package["id"]=id;
            resolve(null);
        })
        })
    }

    save_person_serv():Promise<any>
    {
        // console.log(this.package)
        return new Promise<any>((resolve,reject)=>{
        
        this.packageService.transportPersonCreation(this.person)
        .then((id)=>{
            this.person["id"]=id;
            resolve(null);
        })
        })
    }

    save_travel_package_serv():Promise<any>
    {
        console.log(this.travel_package)
        return new Promise<any>((resolve,reject)=>{
        
        this.packageService.travelPackageCreation(this.travel_package)
        .then((id)=>{
            this.travel_package["id"]=id;
            resolve(null);
        })
        })
    }

}
