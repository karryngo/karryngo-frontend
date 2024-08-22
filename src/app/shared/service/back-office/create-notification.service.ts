import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notif } from '../../../shared/entity/notif';

@Injectable({
    providedIn: 'root'
})
export class CreateNotificationService {

    notifications: Notif[] = [];
    notification_subject: Subject<any> = new Subject<any>();
    // unreadProjetList:{Notification}[] =[];

    constructor() { }

    emit_notification(){
        this.notification_subject.next(this.notifications);
    }
}
