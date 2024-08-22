import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../../entity/vehicle';
import { Subject } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class VehicleService {

    public static currentVehicle: Vehicle = new Vehicle();
    params: any;

    vehicles: Map<String, Vehicle> = new Map<String, Vehicle>();
    vehicleData: any;
    posts: any[];
    vehicleSubject:Subject<Vehicle[]>=new Subject<Vehicle[]>();

    constructor(
        private api: ApiService,
        private toastr: ToastrService
    ) { 
        // this.getAllVehiclesUser();
    }

    getBrandOfVehicle(){
        return this.api.getBrands();
    }

    emitVehicle()
    {
        this.vehicleSubject.next(this.getVehicleList().slice());
    }
    findLocalVehiclesById(id: String): Vehicle {
        if (this.vehicles.has(id)) return this.vehicles.get(id);
        return null;
    }

    // Set the vehicle informations.
    setVehicleInformations(currentVehicle: any) {
        localStorage.setItem('vehicle-data', JSON.stringify(currentVehicle));
        console.log('response vehicle',currentVehicle)
    }

    /*
   *  get the vehicle informations.
   */
    getVehicleInformations() {
        return JSON.parse(localStorage.getItem('vehicle-data'));
    }


    /*
    *  Get local vehicle data.
    */
    getLocalStorageVehicle() {
        this.vehicleData = JSON.parse(localStorage.getItem('vehicle-data'));
    }
    getVehicleList() {
        let list: Vehicle[] = [];
        this.vehicles.forEach((value,key)=>list.push(value))
        // for (const key in this.vehicles) {
        //     list.push(this.vehicles.get(key));
        // }
        console.log("List ",list)
        return list;
    }

    parseVehicleToApi(data: Vehicle): Record<string, any> {
        return {
            'type': data.field_type,
            'name': data.field_name,
            'marque': data.field_bran,
            'photo': data.field_photo,
            'placeNumber': data.field_placeNumber,
            'description': data.field_description,
        }
    };
    parseVehicleFromApi(v:Record<string,any>):Vehicle
    {
        let data=new Vehicle();
        data.field_id=v._id;
        data.field_type=v.type;
        data.field_name=v.name;
        data.field_bran=v.marque;
        data.field_photo=v.photo;
        data.field_placeNumber=v.placeNumber;
        data.field_description=v.description;
        return data;
    }

    getAllVehiclesUser(): Promise<any> {

        return new Promise((resolve, reject) => {
            const headers = {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
                'Content-Type': 'application/json',
                // 'Accept': 'application/json'
            };
            this.api.get('provider/service/vehicle/list', headers)
                .subscribe((response: any) => {
                    console.log("Response Vehicule", response)
                    if (response) {
                        resolve(response);
                        localStorage.setItem('vehicles-list', JSON.stringify(this.posts));
                        this.saveAllVehiclesUser(response);
                        response.result.forEach((v)=>{
                           this.vehicles.set(v._id,this.parseVehicleFromApi(v)) 
                        })
                        this.emitVehicle();
                    }
                    return response;

                }, (error: any) => {

                    if (error) {
                        console.log(error);
                        this.toastr.success(error.message);
                        reject(error);
                    }
                });
        });
    }


    /*
  *  save to local the vehicles list object of user.
  */
    saveAllVehiclesUser(vehicleList: any) {
        localStorage.setItem('vehicle-list', JSON.stringify(vehicleList));
        // console.log(localStorage.getItem('vehicle-list'));
    }


    // permet d'enregistrer un vehicle
    vehicleCreation(data: Vehicle): Promise<any> {
        return new Promise((resolve, reject) => {

            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('access-token'),
                'Content-Type': 'application/json',
            };
            this.params = this.parseVehicleToApi(data);

            this.api.post('provider/service/vehicle/add', this.params, headers)
                .subscribe(success => {
                    if (success.resultCode === 0) {
                        this.vehicles.set(success.result.idVehicle, data);
                        this.setVehicleInformations(success.result);
                        this.emitVehicle();
                        //this.toastr.success('You have been successfully Register your vehicle!');
                        //this.toastr.success('You have been successfully add your vehicle!');
                        resolve(success);
                    }
                    else {
                        reject(success);
                    }
                }, error => {
                    //this.toastr.success(error.message);
                    reject(error);
                });
            /**/
        });
    }


    // permet d'update les infos d'un vehicle
    updateVehicle(nid: string, data: Vehicle): Promise<any> {

        return new Promise((resolve, reject) => {

            const headers = {
                'Authorization': 'Bearer ' + + localStorage.getItem('access-token'),
                'Content-Type': 'application/json'
            };
            console.log("Header ", headers);
            this.api.post(`requester/service/${nid}`, this.parseVehicleToApi(data), headers)
                .subscribe(success => {
                    if (success && success.resultCode == 0) {
                        this.vehicles.set(success.result.idService, data);
                        this.setVehicleInformations(success.result);
                        //this.toastr.success('You have been successfully Register your vehicle!');
                        resolve(success);
                    }
                    else reject(success);
                }, error => {
                    reject(error);
                });
        });
    }

}
