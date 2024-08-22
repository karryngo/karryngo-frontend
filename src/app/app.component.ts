import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './shared/service/api/api.service';
import { UserlocalstorageService } from './shared/service/localstorage/userlocalstorage.service';
import { FcmService } from './shared/service/fcm/fcm.service';
// import { BackgroundCommunicationService } from '../background-communication.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    title = 'karryngo';

    constructor(
        private router: Router,
        private translate: TranslateService,
        private api: ApiService,
        public fcmService: FcmService
    ) { }

    ngOnInit() {
        
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
            return;
            }
            window.scrollTo(0, 0);
        });

        this.initLanguage();
    }

    
    //Initialize Language
    private initLanguage(){
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();

        if (browserLang !== undefined) {
            this.translate.setDefaultLang(browserLang);
            this.translate.use(browserLang);
            localStorage.setItem('karry_lang', browserLang);
        } else {
            this.translate.use('en'); // Set your language here
            this.translate.setDefaultLang('en');
        }
    }

}
