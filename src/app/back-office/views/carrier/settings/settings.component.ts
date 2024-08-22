import { Provider, ServiceOfProvider } from './../../../../shared/entity/provider';
// import { UserService } from 'app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Package, PackageState } from '../../../../shared/entity/package';
import { Transaction } from '../../../../shared/entity/transaction';
import { PackageService } from '../../../../shared/service/back-office/package.service';
import { TransactionService } from '../../../../shared/service/back-office/transaction.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { getUiIconFromStatusPackage } from '../../../../shared/utils/ui.utils';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {

  packageList: {pkg:Package,transaction:Transaction}[]=[];
  providers: Provider[] = [];
  user: Provider;
  currentProvider: ServiceOfProvider;

  constructor(
    private userServ: UserService,
    private toastr: ToastrService,
    private router: Router,
    private provServ: ProviderService,
    public packageService: PackageService,
    private transactionService:TransactionService,
  ) { }

  ngOnInit() {
    
    if(localStorage.getItem("user")==null){
      this.router.navigate(['login']);
      return;
    }
    
    this.user = JSON.parse(localStorage.getItem("user"));
    // console.log(this.user);
    // this.getProvidersList();
    this.getProfileProvider();
  }

  // //This method is used to get list of providers
  // getProvidersList(){
  //   this.userServ.getListOfProviders().then((rep: Provider[])=>{
  //     this.providers = rep;
  //   }).catch(err=>{
  //     this.toastr.error("An error occurs when trying to load providers. Please try again later");
  //   });
  // }

  //This method is used to get profile of provider
  async getProfileProvider()
  {
    try {
      const rep = await this.provServ.getServiceOfProviderFromApi();
      if(rep){
        if(localStorage.getItem("serviceofprovider")!=null){
          this.currentProvider = JSON.parse(localStorage.getItem("serviceofprovider"));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //This method is used to list packages carrier history
  getPackageList(){
    this.packageService.packageList.subscribe((packages:Map<String,Package>)=>{
      // console.log()
      Array.from(packages.values())
      .forEach((pkg:Package)=>{
        if(pkg.state==PackageState.SERVICE_IN_TRANSACTION_STATE)
        {
          this.transactionService.getTransactionById(pkg.idSelectedTransaction)
          .then((transaction:Transaction)=>{
            this.packageList.push({
              pkg,
              transaction
            });
          })
          .catch((error)=>{
            this.packageList.push({
              pkg,
              transaction:new Transaction()
            })
          })
        }
        else this.packageList.push(({
          pkg,
          transaction:new Transaction()
        }))
      })
     });
  }

  showStatutPackage(infos:{pkg:Package,transaction:Transaction})
  {
    return getUiIconFromStatusPackage(infos.pkg,infos.transaction);
  }

}
