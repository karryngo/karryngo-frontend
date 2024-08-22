import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionServiceLabel, TransactionServiceState } from '../../../../shared/entity/transaction';
import { PackageService } from '../../../../shared/service/back-office/package.service';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { InfiniteScrolling } from './handleInfiniteScrolling';

@Component({
    selector: 'app-awarded-services',
    templateUrl: './awarded-services.component.html',
    styleUrls: ['./awarded-services.component.css']
})
export class AwardedServicesComponent implements OnInit {

    services: any=[];
    skip: number = 0;
    page: number = 6;
    public endLimit:number= this.page;
    public albumData:any=[];
    current_user: any;
    TransactionServiceLabel = TransactionServiceLabel;
    TransactionServiceState = TransactionServiceState;
    state: any;
    selectedCat = TransactionServiceState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT;
    status = TransactionServiceLabel[this.selectedCat];
    stat  = new FormControl();

    constructor(
        private packageService: PackageService,
        private scrollService: InfiniteScrolling,
        private notification: NotificationService,
        private local_storage: UserlocalstorageService,
    ) { }

    ngOnInit(): void {
        this.local_storage.dataUser.subscribe((data: any) => {
            console.log(data.user)
            this.current_user = data.user
        });
        
        this.selectionChange(this.TransactionServiceState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT);
        
            
        // this.find_profile(this.current_user._id)
        this.scrollService.getObservable().subscribe(status=>{
            // console.log(status)
            if(status){
                this.endLimit=this.endLimit + this.page;
                this.skip=this.skip + this.page;
                this.get_by_selected_provider(this.current_user._id);
            }
        })
    }

    get_by_selected_provider(user_id)
    {
        this.packageService.get_by_selected_provider(user_id, this.state, this.skip, this.page)
        .then((result:any)=>{
            this.services = this.services.concat(result);
            // console.log("eeeeeeeeeeeeeeeeeeeeee",result);
            let clear=setInterval(()=>{
                let target=document.querySelector(`#target${this.endLimit}`);
                if(target){
                    // console.log("element found")
                    clearInterval(clear);
                    this.scrollService.setObserver().observe(target);
                }
            },2000)

        }).catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        });
    }

    // onChange(state){
    //     console.log(state)
    //     this.services = [];
    //     this.state = state;
    //     this.skip=0;
    //     this.endLimit = this.page;
    //     this.get_by_selected_provider(this.current_user._id);
    // }
    selectionChange(state){
        localStorage.setItem('state', state);
        this.state = state;
        this.status = TransactionServiceLabel[this.selectedCat];
        this.skip=0;
        this.services = [];
        this.endLimit = this.page;
        this.get_by_selected_provider(this.current_user._id);
    }

}
