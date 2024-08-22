import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../shared/service/contact/contact.service';
import { NotificationService } from '../../shared/service/notification/notification.service';

@Component({
	selector: 'app-about-us',
	templateUrl: './about-us.component.html',
	styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

	user: any;

	contactForm: FormGroup;
	submitted: boolean = false;
	waiting_transmission: boolean = false;
	messageColor: String = '';
	contactMessage: String = '';
	constructor (
			private router: Router,
			private formBuilder: FormBuilder,
			private contact_serv: ContactService,
			private notification: NotificationService
		) {}

	ngOnInit(): void {
		this.user = localStorage.getItem('user-data');
		if (this.user) {
			this.router.navigate(['dashboard']);
		}

		this.contactForm = this.formBuilder.group({
            'message': ['', Validators.required],
            'name': ['', Validators.required],
            'email': ['', [Validators.required, Validators.email]],
            'subject': ['', Validators.required]
        })
	}

	get f() {
        return this.contactForm.controls;
    }

	onSubmit() {
        this.submitted = true;
        this.waiting_transmission = false;
        
        // let user:User=this.setFormData();
        // console.log(user);

        // stop here if form is invalid
        if (this.contactForm.invalid) {
            return;
        }
        this.waiting_transmission = true;
     
        
        	this.contact_serv.send_message(this.contactForm.value)
            .then((result) => {
				console.log("ressss", result)
                this.messageColor = 'green';
                this.contactMessage = 'Success';
                // this.router.navigate(['login']);
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                this.notification.showNotification('top', 'center', 'success', 'pe-7s-like2', '\<b>succes !\</b>\<br>Your registration went well. Please log in to begin.');
                this.submitted = false;
				this.contactForm.reset()

            })
            .catch((error) => {
                console.log(error);
                this.waiting_transmission = false;
                this.messageColor = 'red';
                this.contactMessage = error.error;
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>'+this.contactMessage);
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>This identifier already exist');
                this.submitted = false;
            });

    }


	// renvoi a la page de creation de compte
	registration() {
		this.router.navigate(['/register']);
	}


}
