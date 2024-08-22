import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../service/language/language.service';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

    langue;

    constructor(
        private translate: TranslateService,
        private language: LanguageService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if(this.route.snapshot.paramMap.get('lingua'))
        {
            this.langue = this.route.snapshot.paramMap.get('lingua');
            this.chooseLang(this.langue);
        }
    }

    //This method is used to choose language
    chooseLang(langue: any){
        // console.log(this.selected_lang);
        this.language.selectLanguage(langue);
        this.translate.use(langue);
    }

}
