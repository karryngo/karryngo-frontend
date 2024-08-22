import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Package, PackageState } from '../entity/package';
import { Transaction, TransactionState } from '../entity/transaction';
import { PackageService } from '../service/back-office/package.service';
import { TransactionService } from '../service/back-office/transaction.service';

@Injectable({
  providedIn: 'root'
})
export class PackageGuard implements CanActivate, CanActivateChild {
  constructor(private packageService:PackageService,private transactionService:TransactionService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject)=>{
        let id:string= next.paramMap.get("id_package");
        this.packageService.findPackageById(id)
        .then((value:Package)=>{
          // switch(value.state)
          // {
          //   case PackageState.SERVICE_INIT_STATE:
          //     resolve(this.router.parseUrl('/details/'))
          //     break
          //   case PackageState.SERVICE_IN_DISCUSS_STATE:
          //     break
          //   case PackageState.SERVICE_IN_TRANSACTION_STATE:
          //     this.transactionService.getTransactionById(value.id)
          //     .then((trans:Transaction)=>{
          //       switch(trans.state)
          //       {
          //         case TransactionState.INIT:
          //           break;
          //         case TransactionState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT:
          //           break;
          //         case TransactionState.SERVICE_PAIEMENT_DONE_AND_RUNNING:
          //           break;
          //         case TransactionState.SERVICE_DONE_AND_END:
          //           break;
                  
          //       }
          //     })
          //     break;
          // }
         
        })
      })
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
