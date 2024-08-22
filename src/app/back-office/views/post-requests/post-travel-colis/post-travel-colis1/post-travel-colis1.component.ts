import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Provider, ServiceOfProvider } from '../../../../../shared/entity/provider';
import { User } from '../../../../../shared/entity/user';
import { AuthService } from '../../../../../shared/service/auth/auth.service';
import { CreateColisPackageService, PackageCreationState } from '../../../../../shared/service/back-office/create-package.service';
import { PackageService } from '../../../../../shared/service/back-office/package.service';
import { ProviderService } from '../../../../../shared/service/back-office/provider.service';
import { TransactionService } from '../../../../../shared/service/back-office/transaction.service';
import { NotificationService } from '../../../../../shared/service/notification/notification.service';
import { UserService } from '../../../../../shared/service/user/user.service';
import { HowProviderInfosComponent } from '../../how-provider-infos/how-provider-infos.component';
import { OfferDetailsComponent } from '../../offer-details/offer-details.component';

declare var $: any;

@Component({
  selector: 'app-post-travel-colis1',
  templateUrl: './post-travel-colis1.component.html',
  styleUrls: ['./post-travel-colis1.component.scss']
})
export class PostTravelColis1Component implements OnInit {

  serviceProviderList: ServiceOfProvider[] = [];
  offerList: any[] = [];
  providerList:Provider[]=[];
  selectedServiceProviderInfos: ServiceOfProvider = null;
  selectedUserProviderInfos: Provider = null;
  waitSelectedProvider: boolean = false;
  loadProvidersData: boolean = true;
  findProviderInfosMessage: String = '';
  currentUser: Provider = null;  
  message: string = '\<b>Error\</b>\<br>Someone was not going. This option is not available.';

  @ViewChild('myModal') modal;
  @ViewChild(MatSelectionList, {static: true}) private selectionList: MatSelectionList;

  constructor(
    private packageCreation:CreateColisPackageService,
    private userService:UserService,
    private authService:AuthService,
    private providerService:ProviderService,
    private router:Router,
    private modalService:BsModalService,
    private transactionService:TransactionService,
    private notification: NotificationService) { }

  ngOnInit():void {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);

    this.serviceProviderList=this.packageCreation.foundProviders; 
    this.offerList=this.packageCreation.foundOffers; 
    console.log(this.offerList)
    this.packageCreation.state.subscribe((state:PackageCreationState)=>{
      Promise.all(this.packageCreation.foundProviders.map((providerService:ServiceOfProvider)=>this.userService.getUserById(providerService.providerId)))
      .then((result)=>{
        this.loadProvidersData=state==PackageCreationState.PROVIDER_FOUND?false:true;
        console.log()
        this.providerList=result.slice()
      })      
    })
    // console.log("ProviderList ",this.providerList);
    this.authService.currentUserSubject.subscribe((user:Provider)=>{
      this.currentUser=user;
    })
    this.selectionList.selectionChange.subscribe((change)=>{
      if(this.selectionList.selectedOptions.selected.length>0) {
        this.selectedUserProviderInfos=this.selectionList.selectedOptions.selected[0].value;
        this.selectedServiceProviderInfos=this.serviceProviderList.find((service:ServiceOfProvider)=>service.providerId==this.selectedUserProviderInfos.id);
      }
      else {
        this.selectedUserProviderInfos=null;
        this.selectedServiceProviderInfos=null;
      }
    })
  }

  get_offer(provider_id: any){
    for (let offer of this.offerList){
      if(offer.provider_id == provider_id) return offer;
    }
  }

// Old modal version
  // showProviderDetail(pro:Provider) {
  //   // this.selectionList.selectedOptions.deselect(this.selectionList.selectedOptions.selected[0]);
  //   this.selectedServiceProviderInfos=this.serviceProviderList.find((service:ServiceOfProvider)=>service.providerId==pro.id);
  //   this.selectedUserProviderInfos=pro;

  //   this.modalService.show(HowProviderInfosComponent,{
  //     initialState:{
  //       service:this.selectedServiceProviderInfos,
  //       provider:this.selectedUserProviderInfos
  //     }
  //   })
  // }
  showProviderDetail(pro:Provider) {
    // this.selectionList.selectedOptions.deselect(this.selectionList.selectedOptions.selected[0]);
    this.selectedServiceProviderInfos=this.serviceProviderList.find((service:ServiceOfProvider)=>service.providerId==pro.id);
    this.selectedUserProviderInfos=pro;

    this.modalService.show(OfferDetailsComponent,{
      initialState:{
        service:this.selectedServiceProviderInfos,
        provider:this.selectedUserProviderInfos
      }
    })
     
  }

  
  confirmAction()
  {
    this.waitSelectedProvider=true;
    // this.providerService.setCurrentSelectedProvider(this.selectedProvider);
    this.packageCreation.save()
    .then(()=>{
        this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Package has been successfully saved.')
        return this.transactionService.startTransaction(
          this.selectedUserProviderInfos._id,
          this.currentUser._id,
          this.packageCreation.package.id,
          this.currentUser._id) 
      })    
      .then((result)=>{
        this.waitSelectedProvider=false;
        this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Provider has been successfully notified. Now you can finalize transaction in the chat menu')
        setTimeout(() => this.router.navigate(['chat/'+this.packageCreation.package.id]), 600);
      }).catch((error)=>{
        console.error("Error Transaction ",error)
        this.waitSelectedProvider=false;
        if(error && error.hasOwnProperty('resultCode')) this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+error.message)
        else this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br> Service not available. thank you try later')
      })
  }
}
