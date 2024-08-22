import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Zone } from '../../entity/provider';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  zoneSubject:Subject<Zone[]>=new Subject<Zone[]>();
  zones:Zone[]=[];
  headers={}

  constructor(private apiService:ApiService) {
    this.headers={
      'Authorization': 'Bearer ' + this.apiService.getAccessToken(),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    console.log("Construct service");
    let zone1:Zone=new Zone();
    zone1.city="Bangangte";
    zone1.country="Cameroun";
    zone1.name="Marché B";

    let zone2:Zone=new Zone();
    zone2.city="Yaoundé";
    zone2.country="Cameroun";
    zone2.name="Mvan";

    let zone3:Zone=new Zone();
    zone3.city="Yaoundé";
    zone3.country="Cameroun";
    zone3.name="Poste Centrale";


    let zone4:Zone=new Zone();
    zone4.city="Douala";
    zone4.country="Cameroun";
    zone4.name="Bonamoussadi";

    this.zones.push(zone1);
    this.zones.push(zone2);
    this.zones.push(zone3);
    this.zones.push(zone4);
    this.emitZone();


    // this.getZonesFromAPi()
    // .then((data)=>{

    // });
  }
  emitZone()
  {
    this.zoneSubject.next(this.zones.slice());
  }

  getZonesFromAPi():Promise<any>
  {
    return new Promise<any>((resolve,reject)=>{
      this.apiService.get("",this.headers).subscribe(
        (result)=>{
          resolve(result);
        },
        (error)=>{
          reject(error);
        }
      )
    })
  }

  findNewZone(zone:String)  
  {

  }
}
