import { NotificationService } from './../notification/notification.service';
import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from '../../../../environments/environment';
import { PackageService } from '../back-office/package.service';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class FcmService {

    public serviceIdSubject = new Subject<any>();
    backgroundMessage$ = this.serviceIdSubject.asObservable();
    private deviceIdKey = 'device_token';

    constructor(private notificationService: NotificationService, private packageService: PackageService, private authService: AuthService) { 
        this.requestPermission();
        this.listen();
        this.setupServiceWorkerCommunication()
    }

    requestPermission() {
        const messaging = getMessaging();
        getToken(messaging, { vapidKey: environment.firebase.vapidKey}).then(
        (currentToken) => {
            if (currentToken) { 
                this.notificationService.get_user_token(currentToken, this.getDeviceId()); 
                console.log("Hurraaa!!! we got the token.....");
                console.log(currentToken);
                // console.log(this.getDeviceId());
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
    }

    listen() {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            if(payload.data.service_id) this.serviceIdSubject.next(payload.data.service_id);
        });
    }

    private setupServiceWorkerCommunication() {
        if ('serviceWorker' in navigator) {
            console.log("loading Service Worker: ");
            navigator.serviceWorker.addEventListener('message', (event) => {
                console.log("event: ", event.data);
                // let notification = event.data.payload;
                const message = event.data;
                if (message.type === 'onBackgroundMessage') {
                    // this.backgroundMessageSubject.next(message.payload);
                    const notification = message.payload
                    // if(notification.data.service_id) this.packageService.getOnePackagesById(notification.data.service_id)
                    if(notification.data.service_id) this.serviceIdSubject.next(notification.data.service_id);

                    if (message.payload.data.type=="PROVIDER_PROFILE_APPROVED") {
                        console.log("You have been accepted as provider")
                        this.authService.logOut();
                    }
                }
                else if (message.data.type=="PROVIDER_PROFILE_APPROVED") {
                    console.log("You have been accepted as provider")
                    this.authService.logOut();
                }
            });
        }
    }

    getDeviceId(): string {
        let deviceId = localStorage.getItem(this.deviceIdKey);
        if (!deviceId) {
            deviceId = uuidv4();
            localStorage.setItem(this.deviceIdKey, deviceId);
        }
        return deviceId;
    }


}
