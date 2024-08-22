import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/service/user/user.service';
import { Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
    selector: 'app-update-phone-number',
    templateUrl: './update-phone-number.component.html',
    styleUrls: ['./update-phone-number.component.css']
})
export class UpdatePhoneNumberComponent implements OnInit {

    phoneForm: FormGroup;
    codeForm: FormGroup;
    submitting: boolean = false;
    submitted: boolean = false;
    codeSent: boolean = false;
    incorrectPassword: boolean = false;
    isDisabled = true;
    phoneNumber ;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.CentralAfricanRepublic, CountryISO.Cameroon, CountryISO.SouthAfrica, CountryISO.CôteDIvoire];

    constructor(private fb: FormBuilder, private userService: UserService,
        private router: Router,
    ) {
        this.phoneForm = this.fb.group({
            phoneNumber: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this.codeForm = this.fb.group({
            code: ['', [Validators.required]]
        });
    }
    ngOnInit(): void {
        
    }

    onSubmit() {
        if (this.phoneForm.valid) {
            this.phoneNumber = this.phoneForm.value.phoneNumber.e164Number;
            this.requestPhoneNumberUpdate(this.phoneNumber, this.phoneForm.value.password);
        }
    }

    requestPhoneNumberUpdate(phoneNumber: string, password: string) {
        this.submitting = true;
        this.userService.requestPhoneNumberUpdate(phoneNumber, password).subscribe(
            response => {
                console.log('Phone number updated successfully:', response);
                this.submitting = false;
                this.codeSent = true;
            },
            error => {
                if(error.error.resultCode == -1){
                    this.incorrectPassword = true;
                }
                console.error('Error updating phone number:', error);
                this.submitting = false;
            }
        );
    }

    onSubmitCode() {
        console.log(this.codeForm.value)
        this.submitting = true;
        if (!this.phoneNumber|| !this.codeForm.valid) {
            return
        }
        this.userService.updatePhoneNumber({phoneNumber: this.phoneNumber, reset_code: this.codeForm.value.code}).subscribe(
            response => {
                console.log('Phone number updated successfully:', response);
                // this.submitting = false;
                // this.userService.setUser(response.data);
                this.router.navigate(['profil/user'], { replaceUrl: true });
                // setTimeout(() => {
                //     this.router.navigate(['profil/user']);
                // }, 3000);
                // this.router.navigate(['profil/user'], { replaceUrl: true });
            },
            error => {
                console.error('Error updating phone number:', error);
                this.submitting = false;
            }
        );
    }

}
