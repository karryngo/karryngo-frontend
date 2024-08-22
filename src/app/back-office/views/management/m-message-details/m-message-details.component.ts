import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../../shared/service/contact/contact.service';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';

@Component({
    selector: 'app-m-message-details',
    templateUrl: './m-message-details.component.html',
    styleUrls: ['./m-message-details.component.css']
})
export class MMessageDetailsComponent implements OnInit {

    message_id: any;
    message: any;
    constructor(
        private notification: NotificationService,
        private route: ActivatedRoute,
        private contactService: ContactService,
        private local_storage: UserlocalstorageService,
    ) { }

    ngOnInit(): void {
        this.message_id = this.route.snapshot.paramMap.get('message_id');
        this.get_message_by_id(); 
    }

    get_message_by_id() {
        this.contactService.getById(this.message_id)
        .then((result) => {
            console.log(result[0])
            this.message = result[0];
        })
        .catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+error.error);
        });
    }

}
