import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceOfProvider } from '../../../../shared/entity/provider';
import { OfferService } from '../../../../shared/service/back-office/offer.service';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';

@Component({
    selector: 'app-my-offers',
    templateUrl: './my-offers.component.html',
    styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

    current_user: any;
    offers : any[];
    currentProvider: ServiceOfProvider;

    constructor(
        private offerService: OfferService,
        private notification: NotificationService,
        private router: Router,
        private provServ: ProviderService,
    ) { }

    ngOnInit(): void {
        this.current_user = JSON.parse(localStorage.getItem("user"));
        this.get_offers();
        this.getProfileProvider();
    }

    async getProfileProvider(){
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

    get_offers(){

        this.offerService.get_provider_offers(this.current_user._id).then((result:any)=>{
            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Your offerappears here')
            console.log(result)
            this.offers = result;
            setTimeout(() => {
            // this.router.navigate(['/my-services/business-profile']);
            // this.router.navigate(['/post-requests/trips/list-providers']);
            }, 600);
        }).catch((error) => {
            console.log(error);
            if(error.error.resultCode) this.notification.showNotification('top', 'center', 'primary', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.error.message);
            else this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        });
    }

    go_to_details(offer){
        console.log(offer)
    }

}
