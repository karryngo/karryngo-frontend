import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/service/language/language.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    user: any;
    langues: { icon: string; name: string; id:string; }[] = [];
    selected_lang: string;

    constructor(
        private translate: TranslateService,
        private language: LanguageService
    ) { }

    ngOnInit() {

        this.build_languages();
        if (localStorage.getItem('user')!=null) 
        this.user = JSON.parse(localStorage.getItem('user'));

        // this.selected_lang = this.translate.getBrowserLang()
        // console.log(this.selected_lang);
        this.selected_lang = this.language.getLanguage();
        this.translate.use(this.selected_lang);
    }


    //This method is used to define and set languages list
    private build_languages(){
        this.langues = [
        {"icon": "flag-icon-us", "name": "English", "id":"en"},
        {"icon": "flag-icon-fr", "name": "French", "id":"fr"},
        ];
    }

    //This method is used to choose language
    chooseLang(ev: any){
        // console.log(this.selected_lang);
        this.language.selectLanguage(this.selected_lang);
        this.translate.use(this.selected_lang);
    }

}
