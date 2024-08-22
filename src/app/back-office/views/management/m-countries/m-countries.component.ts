import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ElementRef, OnInit, TemplateRef } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { LocationService } from '../../../../shared/service/location/location.service';
declare var $: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'm-countries',
    templateUrl: 'm-countries.component.html',
    styleUrls: ['m-countries.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class MCountriesComponent {

    countries: any = [];
    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private locationService: LocationService,
        private router: Router,){
        
    }

    ngOnInit(): void 
    {
        this.get_countries();
    }


    // add a service

    showNotification(from, align, colortype, icon, text) {

        $.notify({
        icon: icon,
        message: text
        }, {
        type: colortype,
        timer: 300,
        placement: {
            from: from,
            align: align
        }
        });
    }

    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            console.log(res);
            this.countries = res.result;
        })
    }

    open_country(country){
        // console.log(country)
        this.router.navigate(["/management/country-details/" + country._id])
    }
}
