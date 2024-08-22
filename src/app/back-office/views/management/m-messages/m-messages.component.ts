import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../../shared/service/contact/contact.service';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { InfiniteScrollingService } from '../../../../shared/service/scrolling/infinite-scrolling.service';

@Component({
    selector: 'app-m-messages',
    templateUrl: './m-messages.component.html',
    styleUrls: ['./m-messages.component.css']
})
export class MMessagesComponent implements OnInit {

    current_user: any;
    skip: number = 0;
    page: number = 30;
    public endLimit:number= this.page;
    messages: any[] = [];
    options: any = {skip: 0, limit: 20};
    loadingInquiries: boolean = true;
    
    constructor(
        private router: Router,
        private contactService: ContactService,
        private notification: NotificationService,
        private scrollService: InfiniteScrollingService,
        private local_storage: UserlocalstorageService,
    ) { }

    ngOnInit(): void 
    {
        this.local_storage.dataUser.subscribe((data: any) => {
            // console.log(data.user)
            this.current_user = data.user
        });
        this.get_messages();
        this.scrollService.getObservable().subscribe(status=>{
            if(status){
                console.log(status)
                this.endLimit=this.endLimit + this.page;
                this.skip=this.skip + this.page;
                this.get_messages();
            }
        })
    }

    get_messages() {
        this.contactService.getInquiries(this.options)
        .then((result) => {
            // console.log("ressss", result)
            this.messages = this.messages.concat(result);
            this.loadingInquiries = false;
            let clear=setInterval(()=>{
                let target=document.querySelector(`#target${this.endLimit}`);
                if(target){
                    clearInterval(clear);
                    this.scrollService.setObserver().observe(target); 
                }
            },2000)
        })
        .catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+error.error);
        });
    }

    deleteInquiry(id: string, index: number){
        this.contactService.delete(id).subscribe((result) => {
            this.messages.splice(index, 1);
        }, (error)=>{
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+error.error);
        })
    }

}
