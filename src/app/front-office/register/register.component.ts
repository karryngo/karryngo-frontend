import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user/user.service';
import { AuthService } from '../../shared/service/auth/auth.service';
// import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MustMatch } from '../../shared/service/_helpers/must-match.validator';
import { User } from '../../shared/entity/provider';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { LocationService } from '../../shared/service/location/location.service';
import { SearchLocationComponent } from '../../back-office/components/search-location/search-location.component';
import { TranslateService } from '@ngx-translate/core';
import { carPhoneNumberValidator } from '../../shared/validators/car-phone-number.validator';

declare var $: any;


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public static currentUser: User = new User();
    submitted: boolean = false;
    registerForm: FormGroup;
    registrationMessage: String = '';
    waitingRegistration: boolean = false;
    messageColor: String = '';
    user: any;
    i = 0; // my variable to condition the number of execution of the submit at 01 time
    @ViewChild('fromZone') fromZoneWidget: SearchLocationComponent;
    languages = ["fr", "en"]
    sexes = ["M", "F"]
    
    //Tel fields
    separateDialCode: boolean = false;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.SouthAfrica, CountryISO.Cameroon, CountryISO.CentralAfricanRepublic];
    countries: any = [];
    cities: any = [];
    country_code: any;
    validPhone = false;

    constructor(private formBuilder: FormBuilder,
        private auth: AuthService,
        private userService: UserService,
        private router: Router,
        private formLog: FormBuilder,
        private translate: TranslateService,
        private locationService: LocationService,
        private notification: NotificationService) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            'field_firstname': ['', Validators.required],
            'field_surname': ['', Validators.required],
            'field_username': ['',],
            // 'field_language': ['', Validators.required],
            'user_agree': [false, Validators.requiredTrue],
            'field_country': ['', Validators.required],
            'field_phone': ['', [Validators.required, carPhoneNumberValidator()]],
            // 'field_accontType': ['', Validators.required],
            'field_city': ['', Validators.required],
            // 'field_address': ['', Validators.required],
            'field_password': ['', [Validators.required, Validators.minLength(6)]],
            'field_password2': ['', Validators.required],
            'field_email': ['', [Validators.required, Validators.email]],
            'field_language': ['', [Validators.required]],
            'sex': ['', [Validators.required]],

        }, {
            validator: MustMatch('field_password', 'field_password2')
        });
        // this.registerForm.controls.field_phone?.valueChanges.subscribe(value => {
        //     console.log('Phone number changed:', value);
        //     let isValid = carPhoneNumberValidator(this.registerForm.controls.field_phone.value)
        //     console.log(isValid)
        //     this.invalidPhone = isValid;
        // });
        this.registerForm.controls['field_phone'].valueChanges.subscribe(value => {
            console.log('Value:', value);
            console.log('Form Errors:', this.registerForm.controls['field_phone'].errors);
            // let isValid = carPhoneNumberValidator(this.registerForm.controls.field_phone.value)
            // console.log(isValid)
        });
        this.get_countries();
    }
    // err(){
    //     let isValid = carPhoneNumberValidator(this.registerForm.controls.field_phone.value)
    //     this.validPhone = isValid;
    // }

    get f() {
        return this.registerForm.controls;
    }

    navigateToLogin() {
        this.router.navigate(['login']);
    }

    navigateToVerifyEmail() {
        this.router.navigate(['verify-email-address']);
    }

    /////

    setFormData():User {
        let user:User=new User();
        
        delete user["_id"];
        user.firstname = this.registerForm.controls.field_firstname?.value;
        user.lastname = this.registerForm.controls.field_surname?.value;
        user.adresse.email = this.registerForm.controls.field_email?.value;
        user.password = this.registerForm.controls.field_password?.value;
        user.adresse.country = this.registerForm.controls.field_country?.value.name;
        user.adresse.country_id = this.registerForm.controls.field_country?.value._id;
        // user.adresse.country_id = this.registerForm.get('field_country').value._id;
        user.language = this.registerForm.controls.field_language?.value;
        user.sex = this.registerForm.controls.sex?.value;

        user.adresse.city = this.registerForm.controls.field_city?.value;
        user.username = this.registerForm.controls.field_username?.value;
        user.adresse.phone = this.registerForm.controls.field_phone?.value.e164Number;

        return user;
    }

    onSubmit() {
        this.registerForm.controls.field_city.setValue(this.fromZoneWidget?.selectedLocation[0]?.city);
        // this.f.field_country.setValue(this.f.field_country.value.name);
        // this.f.country_id.setValue(this.f.field_country.value._id);
        // console.log(this.registerForm.value)
        // this.validPhone = this.registerForm.controls.field_phone.errors.invalidCarPhoneNumber? false: true;
        // console.log(this.validPhone)
        // let isValid = carPhoneNumberValidator(this.registerForm.controls.field_phone.value)
        // console.log(isValid)
        const invalidFields = [];
        Object.keys(this.registerForm.controls).forEach(field => {
            const control = this.registerForm.get(field);
            if (control && control.invalid) {
                invalidFields.push(field);
            }
        });
        // console.log(invalidFields)
        this.submitted = true;
        this.waitingRegistration = false;
        
        // stop here if form is invalid
        if (this.registerForm.invalid && !this.validPhone) {
            // if ((invalidFields.length == 1)&&(invalidFields[0]=="field_phone") ) {
            //     let isValid = carPhoneNumberValidator(this.registerForm.controls.field_phone.value)
            //     this.invalidPhone = isValid;
            //     if(!isValid) return; 
            // }
            return;
        }
        this.waitingRegistration = true;
     
        setTimeout(() => {
            let user:User=this.setFormData();
        this.auth.createAccount(user)
            .then((result) => {
                console.log(result)
                this.messageColor = 'green';
                this.registrationMessage = 'Success';
                this.router.navigate(['activate/enter-code', result.result._id]);
                // this.router.navigate(['login']);
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                this.notification.showNotification('top', 'center', 'success', 'pe-7s-like2', '\<b>'+this.translate.instant('signup.success')+' !\</b>\<br>'+this.translate.instant('signup.registration_successful'));
                this.submitted = false;

            })
            .catch((error) => {
                console.log(error);
                this.waitingRegistration = false;
                this.messageColor = 'red';
                this.registrationMessage = error.error.description;
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>'+this.translate.instant('signup.error')+' !\</b>\<br>'+this.translate.instant('signup.user_exists'));
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>This identifier already exist');
                this.submitted = false;
            });
        
        }, 3000);

    }

    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            console.log(res);
            this.countries = res.result;
        })
    }

    get_cities(val){
        let country = this.f.field_country.value;
        console.log(country)
        this.country_code = country.code2;
        // this.f.field_country.setValue(this.f.field_country.value.name);
        console.log(country)
        // this.locationService.find_cities_by_country("CM")
        // .then((res) => {
        //     console.log(res);
        //     this.cities = res.result;
        // })
    }

}
