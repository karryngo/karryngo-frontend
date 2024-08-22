import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

    token: string;
    user_id: string;
    activationStatus: string;
    activating: boolean=true;
    activationForm: FormGroup;
    submitted: boolean = false;
    not_found = ""

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private notification: NotificationService,
        private router:Router,
        private translate: TranslateService,
        private formLog: FormBuilder,
    ) { }

    ngOnInit(): void {

        this.activationForm = this.formLog.group({
            'email': ['', [Validators.required, Validators.email]]
        });

        this.route.params.subscribe(params => {
            this.token = params['token'];
            this.user_id = params['user_id'];
            this.activateAccount()
        });
    }

    get f() {
        return this.activationForm.controls;
    }

    activateAccount(): void {
        this.authService.activateAccount(this.token, this.user_id).then(
            (response) => {
                // Account activation successful
                this.activationStatus = 'success';
                this.activating = false;
                this.router.navigate(["login"])
                this.notification.showNotification('top', 'right', 'success', 'pe-7s-close-circle', '\<b>Congratulations !\</b>\<br>Your account was successfully Activated.');
            },
            (error) => {
                console.log(error)
                // Account activation failed
                this.activationStatus = 'error';
                this.activating = false;
                if (error.resultCode && error.resultCode == -1) {
                    this.not_found = "No account found with the provided email address."
                    this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.activation_no_account_found'));
                }
                else if (error.resultCode && error.resultCode == -4) {
                    this.not_found = "Your Account is already activated."
                    this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.activation_already_activated'));
                } else {
                    console.log('error 2: ' + error);
                    this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.server_error'));
                }
            }
        );
    }

    activation_email(){
        // console.log(this.activationForm.controls.email.value)
        this.submitted = true;
        // stop here if form is invalid
        if (this.activationForm.invalid) {
            return;
        }
        this.authService.activation_email(this.activationForm.controls.email.value)
        .then((result) => { 
            console.log(result);
            this.notification.showNotification('top', 'right', 'success', 'pe-7s-close-circle', '\<b>Success!\</b>\<br>'+ this.translate.instant('activation.activation_email_sent'));
            // this.notification.showNotification('top', 'right', 'success', 'pe-7s-close-circle', '\<b>Congratulations !\</b>\<br>Your account was successfully Activated.');
            this.submitted = false;
            this.activationForm.reset()
            let element: HTMLElement = document.getElementsByClassName('dis')[0] as HTMLElement;
            element.click();
        })
        .catch((error) => {
            console.log("Error: ",error)
            // let element: HTMLElement = document.getElementsByClassName('email')[0] as HTMLElement;
            // element.click();
            // this.activationForm.reset();
            if (error.resultCode && error.resultCode == -1) {
                this.not_found = "No account found with the provided email address."
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.activation_no_account'));
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>there was a problem, try again later.');
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                // this.submitted = false;
            }
            else if (error.resultCode && error.resultCode == -4) {
                this.not_found = "Your Account is already activated."
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.activation_already_activated'));
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>there was a problem, try again later.');
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                // this.submitted = false;
            } else {
                console.log('error 2: ' + error);
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.server_error'));
                // this.submitted = false;
            }
            let element: HTMLElement = document.getElementsByClassName('dis')[0] as HTMLElement;
            element.click();
        });
    }

}
