import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Transaction, TransactionState } from '../../../entity/transaction';
import { PackageService } from '../../../service/back-office/package.service';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
  selector: 'app-comfirm-transport-component',
  templateUrl: './comfirm-transport-component.component.html',
  styleUrls: ['./comfirm-transport-component.component.css']
})
export class ComfirmTransportComponentComponent implements OnInit {

  message: string = 'this is the notification text.';
  @Input() transaction:Transaction
  isAnsware:boolean=false
  // if it is true, the transport wasn't bigin
  transporStand: boolean = false;
  // if it is true, the transport has bigin
  transportStart: boolean = true;
  // if it is true, the transport is ended
  transportEnd: boolean = false;
  // if it is true, the transport is stoped
  transporStop: boolean = false;

  constructor (private packageService:PackageService, private notificationService:NotificationService,private modalService:BsModalService) {}
  ngOnInit(): void {
    this.transporStand=this.transaction.state==TransactionState.SERVICE_PAIEMENT_DONE_AND_WAITING_START;
    this.transportStart=this.transaction.state==TransactionState.SERVICE_RUNNING;
    this.transportEnd=this.transaction.state==TransactionState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT;
  
    // console.log(this.transporStand,this.transportStart,this.transportEnd)
  }

  startTransport() {
    this.isAnsware=true;
    // Service start fonction implemented befor next line
    

    this.packageService.startPackageTransport(this.transaction)
    .then((result)=>{
      this.isAnsware=false;
      this.modalService.hide(1);
      this.notificationService.showNotification("top","center",'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>package transport started')
    })
    .catch((error)=>{
      this.isAnsware=false;
      this.modalService.hide(1);
      this.notificationService.showNotification("top","center",'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+error.message)
    });
  }

  endTransport() {
    // Service end fonction implemented befor next line
    this.isAnsware=true;
    this.packageService.endPackageTransport(this.transaction)
    .then((result)=>{
      this.isAnsware=false;
      this.modalService.hide(1);
      this.notificationService.showNotification("top","center",'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>package transport ended')
    })
    .catch((error)=>{
      this.isAnsware=false;
      this.modalService.hide(1);
      this.notificationService.showNotification("top","center",'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+error.message)
    });
  }

  stopTransport() {
    // Service stop fonction implemented befor next line

    this.transportStart = false;
    this.transporStop = true;
    this.transportEnd = false;
    this.transporStand = false;
  }


}
