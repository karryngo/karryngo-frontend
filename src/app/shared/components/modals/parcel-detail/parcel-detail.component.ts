import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalModule } from 'angular-bootstrap-md';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Transaction } from '../../../entity/transaction';
import { DetailService } from '../../../service/back-office/detail.service';
import { PackageService } from '../../../service/back-office/package.service';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
  selector: 'app-parcel-detail',
  templateUrl: './parcel-detail.component.html',
  styleUrls: ['./parcel-detail.component.scss']
})

export class ParcelDetailComponent implements OnInit {
  increaseVal: FormControl;
  @Input() isAnsware: boolean;

  @Input() transaction: Transaction;
  @Input() packageId: string;
  // Parcel datas
  @Input() parcelName: string;
  @Input() startLocation: string;
  @Input() endLocation: string;
  @Input() parcelType: string;
  @Input() vehiculType: string;
  @Input() volume: number;
  @Input() isFragile: boolean;
  @Input() isUrgent: boolean;

  // collectionDate: Date;
  @Input() collectionDate: string;
  @Input() description: string;
  @Input() price: number;

  // Receiver datas
  @Input() receiverName: string;
  @Input() receiverLocation: string;
  @Input() receiverPhone: number;

  // Sender datas
  @Input() senderName: string;
  @Input() senderLocation: string;
  @Input() senderPhone: number;

  constructor(
    public router: Router,
    private formLog: FormBuilder,
    private detailService: DetailService,
    private packageService:PackageService,
    private notificationService:NotificationService,
    private modalService:BsModalService,
    ) { }

  ngOnInit(): void {
    this.increaseVal = new FormControl('');
  }

  accept() {
    this.isAnsware = true;
    this.packageService.acceptPackagePrice(this.packageId,this.transaction)
    .then((result)=>{
      this.isAnsware=false;
        this.modalService.hide(1);
        this.notificationService.showNotification("top","center",'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Service accepted')
    })
    .catch((error)=>{
      this.isAnsware=false;
      this.modalService.hide(1);
      this.notificationService.showNotification("top","center",'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+error.message)
    });
  }

  refuse() {
    this.isAnsware = true;
    this.detailService.setChoice(false);
  }

  increase() {
    if(this.increaseVal.value <0 ) return;
    this.isAnsware = true;
    this.packageService.updatePrice(this.packageId,
      this.transaction.id,this.increaseVal.value)
      .then((result)=>{
        this.isAnsware=false;
        this.modalService.hide(1);
        this.notificationService.showNotification("top","center",'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Price updated')
      })
      .catch((error)=>{
        this.isAnsware=false;
        this.modalService.hide(1);
        this.notificationService.showNotification("top","center",'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+error.message)
      });
  }
}
