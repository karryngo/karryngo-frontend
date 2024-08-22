import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Package, PackageState } from '../../../../shared/entity/package';
import { Transaction } from '../../../../shared/entity/transaction';
import { PackageService } from '../../../../shared/service/back-office/package.service';
import { TransactionService } from '../../../../shared/service/back-office/transaction.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { getUiIconFromStatusPackage } from '../../../../shared/utils/ui.utils';

declare var $: any;

@Component({
  selector: 'app-post-request-colis',
  templateUrl: './post-request-colis.component.html',
  styleUrls: ['./post-request-colis.component.scss']
})
@Injectable()
export class PostRequestColisComponent implements OnInit {

  title = 'New Parces request ';
  titleInterface: string;
  interface1 = true;
  interface2 = false;
  interface3 = false;
  visible = true;
  visiblePrev = false;
  packageList: {pkg:Package,transaction:Transaction}[]=[];

  constructor(
    private router: Router,
    public packageService: PackageService,
    private transactionService:TransactionService,
    private notification: NotificationService
  ) { }

  ngOnInit() {

    //  this.packageService.packageList.subscribe((packages:Map<String,Package>)=>{
    //   // console.log()
    //   Array.from(packages.values())
    //   .forEach((pkg:Package)=>{
    //     if(pkg.state==PackageState.SERVICE_IN_TRANSACTION_STATE)
    //     {
    //       this.transactionService.getTransactionById(pkg.idSelectedTransaction)
    //       .then((transaction:Transaction)=>{
    //         this.packageList.push({
    //           pkg,
    //           transaction
    //         });
    //       })
    //       .catch((error)=>{
    //         this.packageList.push({
    //           pkg,
    //           transaction:new Transaction()
    //         })
    //       })
    //     }
    //     else this.packageList.push(({
    //       pkg,
    //       transaction:new Transaction()
    //     }))
    //   })
    //  });
    // console.log(this.posts);
    // this.packageService.getPackages();
    // this.initPage();
    // this.packageService.getAllPackagesUser();
    // this.posts = JSON.parse(localStorage.getItem('packages-list'));
    // console.log('poste variable', this.posts);
  }


  showNotification() {
    this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>This service was not available now. Tray later.');
  }
  showStatutPackage(infos:{pkg:Package,transaction:Transaction})
  {
    return getUiIconFromStatusPackage(infos.pkg,infos.transaction);
  }

}
