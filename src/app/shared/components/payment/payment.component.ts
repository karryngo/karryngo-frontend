import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider, User } from '../../../shared/entity/provider';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    // @Input() data?: any;
    @Output() events = new EventEmitter<string>();

    PhoneNumberFormat = PhoneNumberFormat;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.SouthAfrica, CountryISO.Cameroon, CountryISO.CentralAfricanRepublic];
    phoneForm: FormGroup;

    userPhone: string = '';
    userCountry: string = '';
    om_other: string;
    momo_other: string;
    cameroon: boolean = false;
    gabon: boolean = false;
    nigeria: boolean = false;
    southAfrica: boolean = false;
    my_number: boolean = false;
    separateDialCode: boolean = false;
    submitted: boolean = false;

    constructor(private authService: AuthService, private fb: FormBuilder) { 
        this.phoneForm = this.fb.group({
            // Define other form controls if needed
            field_phone: ['', [Validators.required]], // Make sure 'field_phone' matches the formControlName in the template
            my_number: []
        });
    }

    myNumber(){
        this.phoneForm.get('my_number').setValue(true);
    }
    
    otherNumber(){
        this.phoneForm.get('my_number').setValue(false);
    }

    get f() {
        return this.phoneForm.controls;
    }

    ngOnInit() {

        this.authService.currentUserSubject.subscribe((user: Provider) => {
            this.userPhone = user.adresse.phone;
            this.userCountry = user.adresse.country;
        });
        if (this.userCountry == 'Cameroon') {
            this.cameroon = true;
        }
        if (this.userCountry == 'Gabon') {
            this.gabon = true;
        }
        if (this.userCountry == 'Nigeria') {
            this.nigeria = true;
        }
        if (this.userCountry == 'South Africa') {
            this.southAfrica = true;
        }
    }

    onEvent(data: string) {
        this.submitted = true;
        if(!this.phoneForm.valid)
            return
        this.events.emit(this.phoneForm.value);
    }
}
