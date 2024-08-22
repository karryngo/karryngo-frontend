import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    public languageSubject = new Subject<any>();
    backgroundMessage$ = this.languageSubject.asObservable();

    constructor(
        private translate: TranslateService,
    ) { 
        this.getLanguage();
    }

    selectLanguage(lang){
        // this.language.selected_lang = lang;
        this.setLanguage(lang);
        localStorage.setItem("lang", lang);
    }

    getLanguage(){
        // return this.language.selected_lang;
        var lang;
        if (!localStorage.getItem("lang")) {
            // console.log(this.translate.getBrowserLang())
            lang = this.translate.getBrowserLang();
        } else {
            lang = localStorage.getItem("lang");
            this.setLanguage(lang);
        }
        return lang;
    }

    getLanguage2(){
        if (!localStorage.getItem("lang")) {
            console.log(this.translate.getBrowserLang())
            return this.translate.getBrowserLang();
        }
        return localStorage.getItem("lang");
    }

    setLanguage(lang: string){
        this.languageSubject.next(lang);
    }
}
