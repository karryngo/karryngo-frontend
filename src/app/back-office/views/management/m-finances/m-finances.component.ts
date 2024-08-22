import { CarrierService } from './../../../../shared/service/back-office/carrier.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'm-finances',
  templateUrl: 'm-finances.component.html',
  styleUrls: ['m-finances.component.scss']
})
export class MFinancesComponent implements OnInit {

  constructor(
    private supplierServ: CarrierService
  ) {}

  ngOnInit(){
    // this.getListOfCountries();
    this.getFinances();
  }

  //This method is used to call finances
  async getFinances(){
    const filter = {
      time: moment().format("YYYY").toString(),
      period: "year",
      statut: "all",
    };

    
    try {
      const reponse = await this.supplierServ.getFinancialStatement(filter.statut, filter.period, filter.time);
      console.log(reponse);
    } catch (error) {
      console.log(error);
    }
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
}
