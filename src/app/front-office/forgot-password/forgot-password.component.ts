import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
// import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    submitted: boolean = false;
    waitingSendMail: boolean = false;
    user: any;
    source = { title: 'ENTER YOUR EMAIL ADDRESS AND RESET YOUR PASSWORD', btnText: 'Send' };
    forgotForm: FormGroup;

    constructor(private router: Router,
        public notification: NotificationService,
        private authen: AuthService,
        private formLog: FormBuilder) { }

    ngOnInit(): void {
        this.user = localStorage.getItem('user-data');
        if (this.user) {
            this.router.navigate(['dashboard']);
        }
        this.forgotForm = this.formLog.group({
            'field_email': ['', [Validators.required, Validators.email]],

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
        this.waitingSendMail = false;
        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            return;
        }
        this.waitingSendMail = true;

        setTimeout(() => {
            this.authen.resetPassword(this.forgotForm.controls.field_email.value)
                .then((result) => {
                    this.notification.showNotification('top', 'right', 'success', '', '\<b>Welcome to karryngo !');
                    this.submitted = false;

                })
                .catch((error) => {
                    if (error.resultCode && error.resultCode == -1) {
                        this.waitingSendMail = false;
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>Email or password is incorrect.');
                        // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                        this.submitted = false;
                    } else {
                        console.log('error 2: ' + error);
                        this.waitingSendMail = false;
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>No account find with this email address.');
                        // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                        // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>No connection\</b>\<br>Check your internet connection.');
                        this.submitted = false;

                    }
                });

        }, 3000);
        this.submitted = false;
    }

    get f() {
        return this.forgotForm.controls;
    }
}
