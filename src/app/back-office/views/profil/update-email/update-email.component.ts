import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/service/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-update-email',
    templateUrl: './update-email.component.html',
    styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

    emailForm: FormGroup;
    codeForm: FormGroup;
    submitting: boolean = false;
    submitted: boolean = false;
    codeSent: boolean = false;
    incorrectPassword: boolean = false;
    isDisabled = true;
    email: string;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
        this.codeForm = this.fb.group({
            code: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        this.submitted = true;
        if (this.emailForm.valid) {
            this.email = this.emailForm.value.email;
            this.requestEmailUpdate(this.email, this.emailForm.value.password);
        }
    }

    requestEmailUpdate(email: string, password: string) {
        this.submitting = true;
        this.userService.requestEmailUpdate(email, password).subscribe(
            response => {
                console.log('Email updated successfully:', response);
                this.submitting = false;
                this.codeSent = true;
            },
            error => {
                if (error.error.resultCode === -1) {
                    this.incorrectPassword = true;
                }
                console.error('Error updating email:', error);
                this.submitting = false;
            }
        );
    }

    onSubmitCode() {
        this.submitted = true;
        if (!this.email || !this.codeForm.valid) {
            return;
        }
        this.submitting = true;
        this.userService.updateEmail({ email: this.email, reset_code: this.codeForm.value.code }).subscribe(
            response => {
                console.log('Email updated successfully:', response);
                this.router.navigate(['profil/user'], { replaceUrl: true });
            },
            error => {
                console.error('Error updating email:', error);
                this.submitting = false;
            }
        );
    }

}
