import { Component, OnInit, ViewChild } from '@angular/core';
import { Provider, ServiceOfProvider, Vehicle, Zone } from '../../../../shared/entity/provider';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { SearchLocationComponent } from '../../../components/search-location/search-location.component';

@Component({
  selector: 'app-bizprofile',
  templateUrl: './bizprofile.component.html',
  styleUrls: ['./bizprofile.component.scss']
})
export class BizprofileComponent implements OnInit {

  @ViewChild("compagnyZone") compagnyWidgetZone: SearchLocationComponent;
  user: Provider;
  currentProvider: ServiceOfProvider;
  list_vehicles: Vehicle[] = [];
    
  selectedLocations: Zone[] = [];
  
  constructor(
    private providerService: ProviderService,
    private notifServ: NotificationService
  ) { }

  ngOnInit(): void {

    this.getBusinessProfile();
    this.user = this.providerService.currentUser;
    console.log(this.user);
  }

  //This method is used to get Business Profile
  getBusinessProfile(){
    if(localStorage.getItem("serviceofprovider")!=null){
      this.currentProvider = JSON.parse(localStorage.getItem("serviceofprovider"));
      console.log(this.currentProvider);
      this.selectedLocations = this.currentProvider.zones;
    }
  }

  // add a vehicle
  registerVehicle(ev: any){
    console.log(ev);
    this.list_vehicles.push(ev);
  }

  private getLocation() {
    // this.selectedLocations = [];
    this.selectedLocations = this.compagnyWidgetZone.selectedLocation;
    
  }

  //This method is used to remove
  removeZone(idZone: number){
    this.selectedLocations.splice(idZone, 1);
  }

  //This method is used to update Service
  updateService(){

    // this.providerService.becomeProvider(provider, service, providerType).then((result) => {
      
    //   this.notifServ.showNotification('top', 'center', 'success', 'pe-7s-gift', '\<b>Congratulations !\</b>\<br>Your request has been taken into account. You will be notified after verification of the information.')
    //   // this.router.navigate['/carrier/wait-acceptance'];
    //   // setTimeout(() => this.router.navigate['/carrier/wait-acceptance'], 4000);
      
    // }).catch((error) => {
    //   this.notifServ.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> ${error.message}`)
      
    // });
  }

}
