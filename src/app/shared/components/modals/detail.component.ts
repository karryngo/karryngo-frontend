import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ModalModule } from 'angular-bootstrap-md';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Discussion } from '../../entity/chat';
import { ColisPackage, Package, PackageState } from '../../entity/package';
import { Provider } from '../../entity/provider';
import { Transaction, TransactionState } from '../../entity/transaction';
import { AuthService } from '../../service/auth/auth.service';
import { TransactionService } from '../../service/back-office/transaction.service';
import { UserService } from '../../service/user/user.service';
import { ComfirmTransportComponentComponent } from './comfirm-transport-component/comfirm-transport-component.component';
import { ParcelDetailComponent } from './parcel-detail/parcel-detail.component';
import { PassengerDetailComponent } from './passenger-detail/passenger-detail.component';
import { ConfirmPaymentComponent } from './payment/confirm-payment/confirm-payment.component';
import { WaitPaymentComponent } from './payment/wait-payment/wait-payment.component';
import { TransportComponent } from './transport/transport.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  passenger: boolean;
  parcel: boolean;
  confirmPayment: boolean;
  waitPayment: boolean;
  transport: boolean;
  confirmTransport: boolean;

  //////////   Parcel Detail //////////
  isAnsware: boolean = false;

  // Parcel datas
  parcelName = 'Phone Samsung galxy S10';
  startLocation = 'Bangangté';
  endLocation = 'Yaoundé';
  parcelType = 'Small';
  vehiculType = 'Buss';
  volume:Number = 0;
  isFragile = true;
  isUrgent = false;

  // collectionDate: Date;
  collectionDate = '2021/12/12';
  description = 'This the description of my parcel';
  price = '5000';

  // Receiver datas
  receiverName = 'Cédric NGUENDAP';
  receiverLocation = 'Yaoundé';
  receiverPhone = '+237 244 521 451';

  // Sender datas
  senderName = 'Flambel SANOU';
  senderLocation = 'Bangangté';
  senderPhone = '+237 691 2247 472';

  /////-- --- --- ---- --- --- --/////////


  //////////   Passenger Detail //////////

  // passenger datas
  passengerName = 'SANOU KUE Flambel Junior';
  // startLocation = 'Bangangté';
  // endLocation = 'Yaoundé';
  nuberOfPlace = 4;
  // isUrgent = false;
  // collectionDate = '2021/12/12';
  passengerDescription = 'This the description of passenger profil';
  // price = 5000;

  // passenger more detail
  passengerEmail = 'passenger@email.com';
  passengerLocation = 'Bangangté';
  passengerPhone = '+237 691 2247 472';



  constructor(
    public router: Router,
    private userService:UserService,
    private modalService:BsModalService,
    private transactionService:TransactionService,
    private authService:AuthService,
    ) {
    this.passenger = false;//Proposition de prix (accepter ou refuser) pour passager
    this.parcel = false;//Proposition de prix (accepter ou refuser) pour paquet
    this.confirmPayment = false;//confirmer le paiement
    this.waitPayment = false;//en attente de paiement
    this.transport = false;//en transport (pour le requester)
    this.confirmTransport = false;//pas définis (doit être definis en transport pour le provider)
  }
  ngOnInit(): void {
    this.confirmTransport = true;
  }

  show(data:{pkg:ColisPackage,discuss:Discussion})
  {
    let pkg=data.pkg;
    this.parcelName=pkg.package_name.toString();
    this.startLocation=pkg.from.city.toString();
    this.endLocation = pkg.to.city.toString();
    this.parcelType = pkg.typeof.toString();
    // this.vehiculType = pkg.carTypeList[0].getStringVehicle();
    this.volume = pkg.size_depth.valueOf()*pkg.size_heigth.valueOf()*pkg.size_piece_length.valueOf();
    this.isFragile = pkg.is_weak.valueOf();
    this.isUrgent = pkg.is_urgent.valueOf();

    // collectionDate: Date;
    this.collectionDate = pkg.date_arrival.toString();
    this.description = pkg.description.toString();
    this.price = pkg.suggestedPrice.toString();

    // Receiver datas
    this.receiverName = pkg.receiver.name.toString();
    this.receiverLocation = pkg.to.city.toString();
    this.receiverPhone = pkg.receiver.contact.toString();

    // Sender datas
    this.userService.getUserById(pkg.idRequester)
    .then((requester:Provider)=>{
      this.senderName=requester.getSimpleName().toString();
      this.senderLocation=requester.adresse.city.toString();
      this.senderPhone=requester.adresse.mobilePhone.toString();
    })
    
    this.transactionService.getTransactionById(data.discuss.idTransaction)
    .then((transaction)=>{
      console.log("Transaction ",transaction)
      switch(transaction.state)
      {
        case TransactionState.INIT:
          this.modalService.show(ParcelDetailComponent,{
            initialState:{
              transaction:transaction,
              packageId:pkg.id,
              parcelName: this.parcelName,
              startLocation:this.startLocation,
              endLocation:this.endLocation,
              parcelType:this.parcelType,
              vehiculType:this.vehiculType,
              volume:this.volume,
              isFragile:this.isFragile,
              isUrgent:this.isUrgent,
              collectionDate:this.collectionDate,
              description:this.description,
              price:this.price,
              receiverName:this.receiverName,
              receiverLocation:this.receiverLocation,
              receiverPhone:this.receiverPhone,
              senderName:this.senderName,
              senderLocation:this.senderLocation,
              senderPhone:this.senderPhone
            }
          });
          break;
        case TransactionState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT:
          if(this.authService.currentUserSubject.getValue().id==data.pkg.idRequester)
          {
            this.modalService.show(ConfirmPaymentComponent,{
              initialState:{
                parcelName: this.parcelName,
                startLocation:this.startLocation,
                endLocation:this.endLocation,
                parcelType:this.parcelType,
                vehiculType:this.vehiculType,
                volume:this.volume,
                isFragile:this.isFragile,
                isUrgent:this.isUrgent,
                collectionDate:this.collectionDate,
                description:this.description,
                price:this.price,
                receiverName:this.receiverName,
                receiverLocation:this.receiverLocation,
                receiverPhone:this.receiverPhone,
                senderName:this.senderName,
                senderLocation:this.senderLocation,
                senderPhone:this.senderPhone,

                transaction:transaction,
                packageId:pkg.id,
                amount:this.price
              }
            });
          }
          else
          {
            this.modalService.show(WaitPaymentComponent)
          }
          break; 
        case TransactionState.SERVICE_PAIEMENT_DONE_AND_WAITING_START :
        case TransactionState.SERVICE_RUNNING :        
          if(this.authService.currentUserSubject.getValue().id==data.pkg.idRequester)
          {
            this.modalService.show(TransportComponent,{
              initialState:{
                transaction
              }
            })
          }
          else this.modalService.show(ComfirmTransportComponentComponent,{
            initialState:{
              transaction
            }
          })
          break;
        case TransactionState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT:
          this.modalService.show(TransportComponent,{
            initialState:{
              transaction
            }
          })
        case TransactionState.SERVICE_PROVIDER_PAIEMENT_DONE:
          //l'orsque le fournisseur attends le paiement
          break;
        case TransactionState.SERVICE_END:
          //l'orsque le service end
          break;
  
      }
    })
   
  }
}
