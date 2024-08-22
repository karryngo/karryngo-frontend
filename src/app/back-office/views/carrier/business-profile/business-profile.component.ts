import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';
import services from '../../../../../assets/data/service.json';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';
import { Provider, Vehicle } from '../../../../shared/entity/provider';
import { error } from 'console';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-business-profile',
    templateUrl: './business-profile.component.html',
    styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {

    @ViewChild('closeButton') closeButton: ElementRef<HTMLElement>;
    

    toppings = new FormControl();
    cat = new FormControl();
    toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    selectedToppings = [];
    selectedCat = "";

    current_user: any;
    provider_profile: Provider

    // services = services;
    services = services;
    SERVICES = services;
    categories = ["KARRYNGO TRAVELER", "PERSONS", "TRANSPORTER", "VEHICLE RENTALS"];

    persons = [];
    transporters = [];
    rentals = [];
    set_coord = {latitude:0, longitude: 0}
    latitude: any;
    longitude: any;
    location_changed: boolean = false;
    list_vehicles: any[] = [];
    new_vehicles: any[] = [];
    saving_vehicle: boolean = false
    vehicle_saved: boolean = false

    fileUrl: string = environment.filesUrl;
    defaultImg: string = "assets/imgs/default-avatar.jpg";
    

    constructor(
        private provServ: ProviderService,
        private local_storage: UserlocalstorageService,
        private authService: AuthService,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void 
    {
        this.local_storage.dataUser.subscribe((data: any) => {
            console.log(data.user)
            this.current_user = data.user
        })
        this.find_profile();
    }

    //This method is used to get profile of provider
    async find_profile()
    {
        try {
            const rep = await this.provServ.find_profile(this.current_user._id);
            if(rep){
                console.log(rep.result)
                this.provider_profile = rep.result;
                this.set_coord.latitude = this.provider_profile.location.coordinates[0]
                this.set_coord.longitude = this.provider_profile.location.coordinates[1]
                this.list_vehicles = this.provider_profile.vehicles;
            }
        } catch (error) {
            console.log(error);
            if (error.error.resultCode==-3) {
                this.authService.logOut();
            }
        } 
    }

    service_exists(serv){
        for(let s of this.provider_profile.services)
            if (s == serv) {
                return true;
            }
        return false;
    }

    async add_service_skills()
    {
        // console.log(this.selectedToppings)
        try {
            const rep = await this.provServ.add_service_skills({services: this.selectedToppings}, this.current_user._id);
            if(rep){
                // console.log(rep.result)
                this.find_profile();
                this.selectedToppings = []
            }
        } catch (error) {
            console.log(error);
        } 
    }

    async remove_service(service){
        try {
            const rep = await this.provServ.remove_service_skills({service: service}, this.current_user._id);
            if(rep){
                // console.log(rep.result)
                this.find_profile();
            }
        } catch (error) {
            console.log(error);
        }
    }

    get_coord(event){
        // console.log(event)
        if(this.set_coord.latitude!=event.latitude || this.set_coord.longitude!=event.longitude)
            this.location_changed = true;
        this.latitude = event.latitude
        this.longitude = event.longitude
    }

    async update_location(){
        try {
            const rep = await this.provServ.update_location({location: [this.latitude, this.longitude]}, this.current_user._id);
            if(rep){
                // console.log(rep.result)
                this.find_profile();
                this.location_changed = false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    registerVehicle(ev: any){
        console.log(11111111111);
        console.log(ev);
        console.log(2222222222);
        this.new_vehicles.push(ev);
    }
    //Save Vehicle
    save_vehicle(){
        // const toSend = this.list_vehicles.filter(elt => elt._id == undefined);
        if (this.new_vehicles.length==0) {
            return
        }
        this.closeButton.nativeElement.click();
        this.saving_vehicle = true;
        const toSent = this.transformArray(this.new_vehicles);;
        console.log("toSent")
        console.log(this.new_vehicles)
        this.provServ.saveProviderVehicle(this.provider_profile._id, this.new_vehicles).then((res)=>{
            this.saving_vehicle = false;
            this.new_vehicles = [];
            this.vehicle_saved = true;
            this.find_profile();
        }).catch((err) => {
            this.saving_vehicle = false;
        })
    }
    //This method is used to remove a car
    removeCar(vehicle: Vehicle, i: number){
        if(vehicle._id!==undefined)
            this.provServ.deleteProviderVehicle(this.provider_profile._id, vehicle).subscribe((res)=>{
                console.log(res)
                this.list_vehicles.splice(i, 1);
            }, (error)=>{console.log(error)})
    }
    removeDocument(document: any, i: number){
        if(document.name!==undefined)
            this.provServ.removeDocument(this.provider_profile._id, document).subscribe((res)=>{
                console.log(res)
                this.provider_profile.documents.splice(i, 1);
            }, (error)=>{console.log(error)})
    }
    closeSavingAlert(){
        this.vehicle_saved = false;
    }
    transformArray(inputArray) {
        return inputArray.map(item => {
            return {
                type: item.field_type,
                marque: item.field_bran,
                name: item.field_name,
                placeNumber: item.field_placeNumber,
                description: item.field_description,
                photo: item.field_photo,
                plate_number: item.plate_number
            };
        });
    }

    openDocument(documentUrl: string, event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('trash-icon')) {
            return;
        }
        window.open(documentUrl, '_blank');
    }

}
