import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceOfProvider } from '../../../../shared/entity/provider';
import { OfferService } from '../../../../shared/service/back-office/offer.service';
import { PackageService } from '../../../../shared/service/back-office/package.service';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { InfiniteScrolling } from './handleInfiniteScrolling';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-find-services',
    templateUrl: './find-services.component.html',
    styleUrls: ['./find-services.component.css']
})
export class FindServicesComponent implements OnInit {

    latitude: any;
    longitude: any;
    services: any[] = [];
    offers: any = [];
    offer_ids: any = [];
    loaded: boolean = false;
    data: any;
    current_user: any;
    currentProvider: ServiceOfProvider;
    curScrollPos = 0;
    endReached = false;
    math = Math;

    skip: number = 0;
    // limit: number = 0;
    page: number = 6;
    public endLimit:number= this.page;
    public albumData:any=[];
    servicesLoaded : boolean = false;
    loadingData: boolean = true;

    private getDataSubscription!: Subscription;


    constructor(
        private packageService: PackageService,
        private notification: NotificationService,
        private offer_service: OfferService,
        private local_storage: UserlocalstorageService,
        private router: Router,
        private provServ: ProviderService,
        private scrollService:InfiniteScrolling
    ) { }

    ngOnInit() 
    {
        this.local_storage.dataUser.subscribe((data: any) => {
            console.log(data.user)
            this.current_user = data.user
        })
        ;
        
        // this.get_provider_offers(this.current_user._id)
        this.find_profile()
            
        // this.find_profile(this.current_user._id)
        this.scrollService.getObservable().subscribe(status=>{
            console.log(status)
            if(status){
                this.endLimit=this.endLimit + this.page;
                this.skip=this.skip + this.page;
                this.find_package_services_by_user_location(this.data, 1000000);
            }
        })
        
    }

    find_package_services_by_location(data: any, radius)
    {
        // let data = {
        //     latitude: 34.8606581,
        //     longitude: 10.3497895
        // }
        this.packageService.find_package_services_by_location(data, radius)
        .then((result:any)=>{
            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Your offer was created successfully')
            console.log("ZZZZZZZZZZZZ")
            console.log(result)
            this.services = this.services.concat(result);
            console.log(this.services);
            
            let clear=setInterval(()=>{
                let target=document.querySelector(`#target${this.endLimit}`);
                if(target){
                    // console.log("element found")
                    clearInterval(clear);
                    this.scrollService.setObserver().observe(target);
                }
            },2000)
            // this.services = result ;
            setTimeout(() => {
            // this.router.navigate(['/carrier/list-of-my-offers']);
            // this.router.navigate(['/post-requests/trips/list-providers']);
            }, 600);
        }).catch((error) => {
            // console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        });
    }

    find_package_services_by_user_location(data: any, radius: number) {
        this.loadingData = true;
        this.servicesLoaded = false;
        this.getDataSubscription = this.packageService.find_package_services_by_user_location(data, radius, this.skip, this.page)
            .subscribe({
                next: (result: any) => {
                    this.services = this.services.concat(result.result);
                    if (!this.servicesLoaded) this.servicesLoaded = true;
                    let clear = setInterval(() => {
                        let target = document.querySelector(`#target${this.endLimit}`);
                        if (target) {
                            console.log("element found")
                            clearInterval(clear);
                            this.scrollService.setObserver().observe(target);
                        }
                    }, 1000);
                    this.loadingData = false;
                },
                error: (error) => {
                    console.log(error);
                    this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Sorry</b><br>${error.message}`);
                    this.loadingData = false;
                    this.servicesLoaded = true;
                }
            });
    }
    loadMoreData() {
        this.skip += this.page;
        this.find_package_services_by_user_location(this.data, 1000000);
    }

    // find_package_services_by_user_location(data: any, radius)
    // {
    //     this.getDataSubscription = this.packageService.find_package_services_by_user_location(data, radius, this.skip, this.page)
    //     .then((result:any)=>{
    //         this.services = this.services.concat(result);
    //         if(!this.servicesLoaded) this.servicesLoaded = true; 
    //         let clear=setInterval(()=>{
    //             let target=document.querySelector(`#target${this.endLimit}`);
    //             if(target){
    //                 console.log("element found")
    //                 clearInterval(clear);
    //                 this.scrollService.setObserver().observe(target);
    //             }
    //         },2000)

    //     }).catch((error) => {
    //         console.log(error);
    //         this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
    //     });
    //     this.loadingData = false;
    // }

    get_provider_offers(user_id)
    {
        var coordiates = []; 
        var types = [];
        this.offer_service.get_provider_offers(user_id)
        .then((result:any)=>{
            console.log(result)
            this.offers = result ;
            result.forEach(element => {
                coordiates.push(element.geo.coordinates);
                types.push(element.type);
            });
            // return this.find_profile(coordiates, types);
        })
        // .then((result:any)=>{
        //     console.log(result)
        //     this.offers = result ;

        //     let coordiates = []; 
        //     let types = [];
        //     result.forEach(element => {
        //         coordiates.push(element.geo.coordinates);
        //         types.push(element.type);
        //     });
        //     this.getLocation(coordiates, types);
        // })
        .catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        });
    }

    //This method is used to get profile of provider
    async find_profile()
    {
    try {
        const rep = await this.provServ.find_profile(this.current_user._id);
        if(rep){
            console.log(rep.result)
            this.data = {
                // coordiates: coordiates,
                types: rep.result.services,
                latitude: rep.result.location.coordinates[0],
                longitude: rep.result.location.coordinates[1]
            }
        }
        console.log(this.data)
        this.find_package_services_by_user_location(this.data, 1000000);
    } catch (error) {
        console.log(error);
    } 
    }

    getLocation(coordiates, types) 
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                this.longitude = position.coords.longitude;
                this.latitude = position.coords.latitude;
                this.data = {
                    coordiates: coordiates,
                    types: types,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                // this.find_package_services_by_location(this.data, 1000000)
                this.find_package_services_by_user_location(this.data, 1000000)
                this.callApi(this.longitude, this.latitude);
                // console.log(this.longitude)
                // this.loaded == true;
            });
        } else {
        console.log("No support for geolocation")
        }
    }
    
    callApi(Longitude: number, Latitude: number){
        const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
        //Call API
    }

    // onScroll(e){
    //     console.log(e)
    // }

    updateScrollPos(e) {
        console.log(e);
        this.curScrollPos = e.pos;
        this.endReached = e.endReached;
    }
    
    @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // this.data.page = this.data.page+1;
            this.skip=this.skip + this.page;
            this.find_package_services_by_user_location(this.data, 1000000);
        }
    }

    ngOnDestroy(): void {
        if (this.getDataSubscription) {
            this.getDataSubscription.unsubscribe();
        }
    }

    // getAlbumData(endLimit:number){
    //     this.dataService.getAlbumData(endLimit).subscribe(response=>{
    //         console.log(response);
    //         this.albumData=this.albumData.concat(response);
    //         console.log(this.albumData);
    //         let clear=setInterval(()=>{
    //             let target=document.querySelector(`#target${endLimit}`);
    //             if(target){
    //                 console.log("element found")
    //                 clearInterval(clear);
    //                 this.scrollService.setObserver().observe(target);
    //             }
    //         },2000)
    //     },
    //     err=>{
    //     console.log(err);
    //     })
    // }

}
