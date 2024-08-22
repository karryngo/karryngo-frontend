import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DetailService } from '../../../service/back-office/detail.service';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.scss']
})
export class PassengerDetailComponent {
  // passenger datas
  passengerName = 'SANOU KUE Flambel Junior';
  startLocation = 'Bangangté';
  endLocation = 'Yaoundé';
  nuberOfPlace = 4;
  isUrgent = false;
  collectionDate = '2021/12/12';
  passengerDescription = 'This the description of passenger profil';
  price = 5000;

  // passenger more detail
  passengerEmail = 'passenger@email.com';
  passengerLocation = 'Bangangté';
  passengerPhone = '+237 691 2247 472';

  //Receiver
  receiverName: string = "";
  receiverLocation: string = "";
  receiverPhone: string = "";

  // // Parcel datas
  // passengerName: string = this.detailService.getPassengerDetail().passengerName;
  // startLocation = this.detailService.getPassengerDetail();
  // endLocation = this.detailService.getPassengerDetail();
  // nuberOfPlace = this.detailService.getPassengerDetail();
  // isUrgent = this.detailService.getPassengerDetail();
  // collectionDate = this.detailService.getPassengerDetail();
  // passengerDescription = this.detailService.getPassengerDetail();
  // price = 5000;

  // // passenger more detail
  // passengerEmail = this.detailService.getPassengerDetail();
  // passengerLocation = this.detailService.getPassengerDetail();
  // passengerPhone = this.detailService.getPassengerDetail();

  constructor(public router: Router,
    // private detailService: DetailService
  ) { }

  increase(){

  }

  refuse(){}

  accept(){}

}
