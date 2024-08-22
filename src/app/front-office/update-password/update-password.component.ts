import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { MustMatch } from '../../shared/service/_helpers/must-match.validator';
// import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
    submitted: boolean = false;
    waitingUpdate: boolean = false;
    user: any;
    token: string = '';
    source = { title: 'ENTER YOUR EMAIL ADDRESS AND RESET YOUR PASSWORD', btnText: 'Send' };
    updateForm: FormGroup;

    constructor(private router: Router,
        public notification: NotificationService,
        private authen: AuthService,
        private formLog: FormBuilder) {
            this.token = this.getSponsorId();
            // console.log(this.token)
        }

    ngOnInit(): void {
        this.user = localStorage.getItem('user-data');
        if (this.user) {
            this.router.navigate(['dashboard']);
        }
        this.updateForm = this.formLog.group({
            'field_password': ['', [Validators.required, Validators.minLength(6)]],
            'field_password2': ['', Validators.required],

        }, {
            validator: MustMatch('field_password', 'field_password2')
        });
    }

    navigateToLogin() {
        this.router.navigate(['/login']);
    }

    navigateToRegister() {
        this.router.navigate(['/register']);
    }

    SubmitForm(event?: any) {
        
        this.submitted = true;
        this.waitingUpdate = false;
        // stop here if form is invalid
        if (this.updateForm.invalid) {
            return;
        }

        this.waitingUpdate = true;

        
        this.authen.initializePassword(this.updateForm.controls.field_password.value).then((result) => {

            this.notification.showNotification('top', 'right', 'success', '', '\<b>Now you can login !');
            this.submitted = false;

        }).catch((error) => {
            if (error.resultCode && error.resultCode == -1) {
                this.waitingUpdate = false;
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>Email or password is incorrect.');
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                this.submitted = false;
            } else {
                console.log('error 2: ' + error);
                this.waitingUpdate = false;
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>No connection\</b>\<br>Check your internet connection.');
                this.submitted = false;

            }
        });

        this.submitted = false;
    }

    
    getSponsorId() {
        let href = this.router.url;
        let tab = href.split('?');
        let tab2 = tab[1].split('=');
        // console.log(tab2[1]);
        return tab2[1];
    }
    get f() {
        return this.updateForm.controls;
    }
}
