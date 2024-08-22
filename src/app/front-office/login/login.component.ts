import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { UserService } from '../../shared/service/user/user.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    submitted: boolean = false;
    loginForm: FormGroup;
    waitingRegistration: boolean = false;
    user: any;

    constructor(
        private router: Router,
        private authen: AuthService,
        private formLog: FormBuilder,
        private userData: UserService,
        private translate: TranslateService,
        private notification: NotificationService) {
    }

    ngOnInit(): void {
        this.user = localStorage.getItem('user-data');
        this.loginForm = this.formLog.group({
            'field_email': ['', [Validators.required, Validators.email]],
            'field_password': ['', [Validators.required, Validators.minLength(6)]]
        });
        this.waitingRegistration = false;
    }

    get f() {
        return this.loginForm.controls;
    }

    navigateToRegister() {
        this.router.navigate(['/registration']);
    }

    navigateToForgot() {
        this.router.navigate(['/forgot-password']);
    }

    onSubmit() {
        this.submitted = true;
        this.waitingRegistration = false;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.waitingRegistration = true;

        setTimeout(() => {
            this.authen.authLogin(this.loginForm.controls.field_email.value, this.loginForm.controls.field_password.value)
                .then((result) => {
                    console.log(result)
                    this.notification.showNotification('top', 'right', 'success', '', '\<b>Welcome to karryngo !');
                    this.submitted = false;

                })
                .catch((error) => {
                    this.waitingRegistration = false;
                    console.log("Error: ",error)

                    // if (error.result && !error.result.account_activated) {
                        
                    //     this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br>${this.translate.instant('login.not_activated')}`);
                    //     this.router.navigate(['/activate/enter-code/'+error.result.user_id]);
                    // }
                    if (error.resultCode && error.resultCode==-4) {
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br>${this.translate.instant('login.not_activated')}`);
                        this.router.navigate(['/activate/enter-code/'+error.result.user_id]);
                    } else if (error.resultCode && error.resultCode == -1) {
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br>${this.translate.instant('login.incorrect_password')}`);
                    } else if (error.resultCode && error.resultCode == -5) {
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br>${this.translate.instant('login.incorrect_email')}`);
                    } else {
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br>${this.translate.instant('login.server_error')}`);

                    }
                    this.submitted = false;
                });

        }, 3000);
        this.submitted = false;
    }

}
