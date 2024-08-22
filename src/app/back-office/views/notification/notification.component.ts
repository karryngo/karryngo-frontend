import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../shared/entity/provider';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { NotifService } from '../../../shared/service/back-office/notif.service';
import { NotifType } from '../../../shared/entity/notif';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    notifs: any = [];
    current_user: Provider;
    NotifType = NotifType;

    selectedFW = new FormControl();
    frameworks: string[] = ['Angular', 'Reactjs', 'Vue'];
    action = "";

    constructor(
        private authService: AuthService,
        private notifService: NotifService
    ) { }

    ngOnInit(): void 
    {
        this.authService.currentUserSubject.subscribe((user: Provider) => {
            this.current_user = user;
        });
        this.get_notifications(this.current_user._id)
    }

    get_notifications(user_id){
        this.notifService.find_by_user_id(user_id)
        .then((r) => {
            console.log(this.NotifType.PROVIDER)
            this.notifs = r;
        }).catch((r) => {
            console.log(r)
        });
    }

    first_letter(str: string){
        return str.charAt(0)
    }

    doSomething(e){
        console.log(e.value)
        console.log(this.action)
    }

}
