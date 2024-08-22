import {Component, Input, OnDestroy} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Transaction } from '../../../../entity/transaction';
import { PackageService } from '../../../../service/back-office/package.service';
import { TransactionService } from '../../../../service/back-office/transaction.service';
import { NotificationService } from '../../../../service/notification/notification.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: 'confirm-Payment.component.html',
  styleUrls: ['confirm-Payment.component.scss']
})
export class ConfirmPaymentComponent {
  currency: string = 'XAF';
  isAnsware:boolean=false;
  @Input() amount:any;
  @Input() transaction:Transaction;
  @Input() packageId:String;

  constructor(private packageService:PackageService,
    private transactionService:TransactionService,
    private modalService:BsModalService,
    private notificationService:NotificationService){}
  confirm()
  {
    this.isAnsware=true;
    this.packageService.confirmRequesterPaymentToPlatform(this.transaction)
    .then((result)=>{
      this.isAnsware=false;
      this.modalService.hide(1);
      this.notificationService.showNotification("top","center",'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>The payment for the service has been taken into account')
    })
    .catch((error)=>{
      this.isAnsware=false;
      this.modalService.hide(1);
      this.notificationService.showNotification("top","center",'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+error.message)
    });
  }
}
