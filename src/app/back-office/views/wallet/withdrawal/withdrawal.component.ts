import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { Provider, User } from '../../../../shared/entity/provider';
import { NotificationService } from '../../../../shared/service/notification/notification.service';

declare var $: any;

@Component({
  templateUrl: 'withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit{
  @ViewChild('myModal') public myModal: ModalDirective;
  
  balence: string = '000';
  userPhone: String = '';
  userCountry: String = '';
  cameroon: boolean = false;
  gabon: boolean = false;
  nigeria: boolean = false;
  southAfrica: boolean = false;


  constructor(private authService: AuthService,
              private notification: NotificationService) { }

  ngOnInit() {

    this.authService.currentUserSubject.subscribe((user: Provider) => {
      this.userPhone = user.adresse.phone;
      this.userCountry = user.adresse.country;
    });
    if (this.userCountry == 'Cameroon') {
      this.cameroon = true;
    }
    if (this.userCountry == 'Gabon') {
      this.gabon = true;
    }
    if (this.userCountry == 'Nigeria') {
      this.nigeria = true;
    }
    if (this.userCountry == 'South Africa') {
      this.southAfrica = true;
    }
  }
 
  showNotification(from, align, colortype, icon, text) {
    this.notification.showNotification(from, align, colortype, icon, text);
  }

  //Handle events
  handleEvents(ev: any){
      console.log(ev);
      this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>This service was not available for '+ev+'. Try later')
  }
}
