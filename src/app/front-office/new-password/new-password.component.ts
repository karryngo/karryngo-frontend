import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { MustMatch } from '../../shared/service/_helpers/must-match.validator';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

    submitted: boolean = false;
    passForm: FormGroup;
    waitingRegistration: boolean = false;
    id?: String;
    code?: String;
    resetCode = environment.resetCode;
    showCode: boolean = false;
    incorrectCode: boolean = false;
    
    constructor(
        private formLog: FormBuilder,
        private authen: AuthService,
        private notification: NotificationService,
        private route: ActivatedRoute,
        private router:Router,
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.code = this.route.snapshot.paramMap.get('code');
        if(this.code == this.resetCode){
            this.showCode = true;
        } else {
            this.passForm.patchValue({ code: this.code });
        }
        this.passForm = this.formLog.group({
            'code': ['', [Validators.required]],
            'password': ['', [Validators.required]],
            'password2': ['', [Validators.required, Validators.minLength(6)]]
        }, {
            validator: MustMatch('password', 'password2')
        });
        this.waitingRegistration = false;
    }

    get f() {
        return this.passForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.waitingRegistration = false;
        // stop here if form is invalid
        if (this.passForm.invalid) {
            return;
        }
        this.waitingRegistration = true;

            this.authen.reset_password(this.passForm.controls.password.value, this.id, Number(this.passForm.controls.code.value))
                .then((result) => {
                    console.log(result);
                    this.notification.showNotification('top', 'right', 'success', '', '\<b>Password recovered successfully !');
                    this.submitted = false;
                    this.router.navigate(['login']);

                })
                .catch((error) => {
                    this.waitingRegistration = false;
                    console.log("Error: ",error)
                    if(error.resultCode){
                        if (error.resultCode == -1) {
                            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>there was a problem, try later or contact us.');
                            // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                            this.submitted = false;
                        } else if(error.resultCode == 1001){
                            this.incorrectCode = true;
                        } else {
                            console.log('error 2: ' + error);
                            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                            // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>No connection\</b>\<br>Check your internet connection.');
                            this.submitted = false;
    
                        }
                    }
                    
                });
    }

}
