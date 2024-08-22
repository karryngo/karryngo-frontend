import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
    
    current_user: any;
    password: string = '';
    deleteReason: string = '';

    constructor(
        private authService: AuthService, 
        private local_storage: UserlocalstorageService,
        public router: Router,
        private notification: NotificationService) { }


    ngOnInit(): void {
        this.local_storage.dataUser.subscribe((data: any) => {
            console.log(data.user)
            this.current_user = data.user
            console.log(this.current_user)
        })
    }

    deleteAccount() {
        // // Vérifier le mot de passe et supprimer le compte
        // if (this.authService.verifyPassword(this.current_user._id, this.password)) {
        //     this.authService.deleteAccount();
        //     this.router.navigate(['/']); // Rediriger vers une page appropriée après la suppression
        // } else {
        //     // Gérer le cas où le mot de passe est incorrect
        // }
        this.authService.verifyPassword(this.current_user._id, this.password).then(
            (result) => {
                console.log(result)
                if (result.result) {
                    this.authService.deleteAccount(result.result.adresse.email).then(
                    () => {
                        this.notification.showNotification('top', 'center', 'info', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>Account successfully deleted.');
                        this.router.navigate(['/']); // Redirect to a suitable page after deletion
                    },
                    (error) => {
                        console.error('Error deleting account:', error);
                        // Handle the error, such as displaying an error message to the user
                    }
                    );
                } else {
                    // Handle incorrect password
                }
            },
            (error) => {
                console.error('Error verifying password:', error.message);
                this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>'+error.message+'\</b>\<br>');
                // Handle the error, such as displaying an error message to the user
            }
        );
    }

}
