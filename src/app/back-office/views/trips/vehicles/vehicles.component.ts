import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../../shared/service/back-office/vehicle.service';
declare var $: any;

@Component({
  templateUrl: 'vehicles.component.html',
  styleUrls : ['vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  brand: any;
  list_brands: any[] = [];
  files: File[] = [];

  constructor(
    private vehicleServ: VehicleService
  ) { }

  ngOnInit() {
    this.getListOfbrands();
  }

  showNotification(from, align, colortype, icon, text) {

    $.notify({
      icon: icon,
      message: text
    }, {
      type: colortype,
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }

  //Get list of brands
  getListOfbrands(){
    this.vehicleServ.getBrandOfVehicle().subscribe(rep=>{
      this.list_brands =rep;
    });
  }

  onSelect(event: any) {
    console.log(event);
    // this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
