import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/service/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/service/auth/auth.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-activation-enter-code',
    templateUrl: './activation-enter-code.component.html',
    styleUrls: ['./activation-enter-code.component.css']
})
export class ActivationEnterCodeComponent implements OnInit {
    user_id: string;
    activationForm: FormGroup;
    codeForm: FormGroup;
    submitted: boolean = false;
    not_found = ""
    isLoading: boolean = false;

    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private formBuilder: FormBuilder,
        private authService: AuthService, private notification: NotificationService, private translate: TranslateService, private formLog: FormBuilder,
    ) { 
        this.activationForm = this.formBuilder.group({
            activationCode: ['', Validators.required]
        });
        this.codeForm = this.formLog.group({
            'email': ['', [Validators.required, Validators.email]]
        });
    }

    ngOnInit(): void {
        // Retrieving the user id parameter
        this.user_id = this.route.snapshot.paramMap.get('user_id');
        console.log('ID:', this.user_id);
        this.getUserById(this.user_id);
    }
    
    get f() {
        return this.codeForm.controls;
    }

    onSubmit() {
        if (this.activationForm.valid) {
            this.isLoading = true;
            const activationCode = this.activationForm.value.activationCode;
            console.log('Activation Code:', activationCode);
            // Here you can perform any additional actions, such as submitting the form to a server
            this.authService.activateWithCode(activationCode, this.user_id).then(
                (response) => {
                    // Account activation successful
                    // this.activationStatus = 'success';
                    // this.activating = false;
                    this.router.navigate(["login"])
                    this.notification.showNotification('top', 'right', 'success', 'pe-7s-close-circle', '\<b>Congratulations !\</b>\<br>Your account was successfully Activated.');
                    this.isLoading = false;
                },
                (error) => {
                    console.log(error)
                    // Account activation failed
                    // this.activationStatus = 'error';
                    // this.activating = false;
                    if (error.resultCode && error.resultCode == -1) {
                        // this.not_found = "No account found with the provided email address."
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.activation_incorrect_code'));
                    }
                    else if (error.resultCode && error.resultCode == -4) {
                        // this.not_found = "Your Account is already activated."
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.activation_already_activated'));
                    } else {
                        console.log('error 2: ' + error);
                        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+ this.translate.instant('activation.server_error'));
                    }
                    this.isLoading = false;
                }
            );
        }
    }

    getUserById(user_id: string){
        this.userService.userExists(user_id).then((data) => { 
            console.log(data);
        }).catch((error) => {
            console.log(error)
            this.router.navigate(['/login']);
        });
    }

    activation_email(){
        // console.log(this.codeForm.controls.email.value)
        this.submitted = true;
        // stop here if form is invalid
        if (this.codeForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.activation_email(this.codeForm.controls.email.value)
        .then((result) => { 
            console.log(result);
            this.notification.showNotification('top', 'right', 'success', 'pe-7s-close-circle', '\<b>Success!\</b>\<br>'+ this.translate.instant('activation.activation_email_sent'));
            // this.notification.showNotification('top', 'right', 'success', 'pe-7s-close-circle', '\<b>Congratulations !\</b>\<br>Your account was successfully Activated.');
            this.submitted = false;
            this.codeForm.reset()
            let element: HTMLElement = document.getElementsByClassName('dis')[0] as HTMLElement;
            element.click();
            this.isLoading = false;
        })
        .catch((error) => {
            console.log("Error: ",error)
            // let element: HTMLElement = document.getElementsByClassName('email')[0] as HTMLElement;
            // element.click();
            // this.codeForm.reset();
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
            this.isLoading = false;
            let element: HTMLElement = document.getElementsByClassName('dis')[0] as HTMLElement;
            element.click();
        });
    }
    

}
