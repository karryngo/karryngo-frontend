import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { Provider, User } from '../../entity/provider';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { UserLocalStorageData, UserlocalstorageService } from '../localstorage/userlocalstorage.service';
import * as EventEmitter from 'events';
import { EventService } from '../event/event.service';
import { NotificationService } from '../notification/notification.service';
import { delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser: Provider = new Provider();
    currentUserSubject: BehaviorSubject<Provider> = new BehaviorSubject<Provider>(this.currentUser);
    isLoggedIn = false;
    success: number = 0;
    er1: number = -1;
    er2: number = -2;
    er3: number = -3;
    er4: number = -4;

    tokenSubscription = new Subscription()

    constructor(
    // private firebaseAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private user: UserService,
    private localStorageService: UserlocalstorageService,
    private eventService: EventService,
    private notificationService: NotificationService
    ) {

    // this.registResult = false;
    // this.loginResult = false;
    this.localStorageService.dataUser.subscribe((userData: UserLocalStorageData) => {
        this.isLoggedIn = userData.isLoggedIn;
        this.currentUser = userData.user;
        this.emitCurrentUser();
    });

    }


    // resetPassword is used to reset your password.
    resetPassword(email: string): Promise<any> {
        const param = {
            'email': email,
        };
        const header = {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json'
        };

        return new Promise((resolve, reject) => {
            this.api.post('auth/forget-password', param, header).subscribe(response => {
                if (response.resultCode === this.success) {
                    this.toastr.success('Email sended');
                    this.notificationService.showNotification('top', 'center', 'success', '', response.message+ '. Plaese also check your spam folder');
                    this.router.navigate(['/new-password/66b4b1a3e6e165d8524426d5/'+environment.resetCode]);
                } else if (response.resultCode === this.er1) {
                    this.toastr.success('User not found');
                    this.notificationService.showNotification('top', 'center', 'danger', 'pe-7s-close-circle',
                    '\<b>Sorry !\</b>\<br>Failed to send email. ' + response.message);
                } else {
                    console.log(response);
                    reject(response);
                }
            }, error => {
                this.toastr.success('\<b>Sorry !\</b>\<br>Failed to send email!');
                console.log(error);
                reject(error);
            });
        });
    }

    // This method is used to update password
    updatePassword(token: string, password: string): Promise<any> {
    const param = {
        'password': password,
    };
    const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };

    return new Promise((resolve, reject) => {
        this.api.post('auth/updatePassword', param, header)
        .subscribe(response => {
            if (response.resultCode === this.success) {
            this.toastr.success('Password Updated');
            this.notificationService.showNotification('top', 'center', 'success', '', response.message);
            this.router.navigate(['/login']);
            }
            else if (response.resultCode === this.er1) {
            this.notificationService.showNotification('top', 'center', 'danger', 'pe-7s-close-circle',
            '\<b>Sorry !\</b>\<br>Your password reset link is invalid. Please request a new password reset link.', 5000);
            this.router.navigate(['/forgot-password']);
            reject(response);
            }
            else if (response.resultCode === this.er2) {
            this.notificationService.showNotification('top', 'center', 'danger', 'pe-7s-close-circle',
            '\<b>Sorry !\</b>\<br>Your password reset link is invalid. Please request a new password reset link.', 5000);
            this.router.navigate(['/forgot-password']);
            reject(response);
            }
            else if (response.resultCode === this.er3) {
            this.notificationService.showNotification('top', 'center', 'danger', 'pe-7s-close-circle',
            'Sorry! Your password reset link has expired. Please request a new password reset link.', 5000);
            this.router.navigate(['/forgot-password']);
            reject(response);
            }
        }, error => {
            this.toastr.success('You have failed to update your password!');
            this.router.navigate(['/forgot-password']);
            reject(error);
        });
    });
    }

    // This method is used to reset your password.
    initializePassword(password: string): Promise<any> {
        
    const param = { 'password': password };
        
        return new Promise((resolve, reject) => {

        this.api.post('auth/reset-password', param).subscribe(response => {
            
            if (response.resultCode === this.success) {
                this.toastr.success('Password Updated');
                this.notificationService.showNotification('top', 'center', 'success', '', response.message);
                this.router.navigate(['/login']);

            }else if (response.resultCode === this.er1) {
                this.notificationService.showNotification('top', 'center', 'danger', 'pe-7s-close-circle',
                '\<b>Sorry !\</b>\<br>Your password is not correct', 5000);
                this.router.navigate(['/login']);
                reject(response);
            }

            }, error => {
            this.toastr.success('You have failed to update your password!');
            this.router.navigate(['/login']);
            reject(error);
            });
        });
    }

    resetDataUser(user: Provider) {
    this.localStorageService.setUserData({
        isLoggedIn: this.isLoggedIn,
        user
    })
    }

    emitCurrentUser() {
        this.currentUserSubject.next(this.currentUser);
    }

    // logOut function is used to sign out .
    logOut(message = 'You have been successfully logged out!') {
        this.eventService.logoutEvent.next(true);
        // this.eventService.loginEvent.next(false);
        this.localStorageService.clearData();
        setTimeout(() => {
            this.toastr.success(message);
            this.router.navigate(['login']); 
            // this.notificationService.showNotification('top', 'right', 'success', '', '\<b>You\'re logged out !\</b>');
            this.notificationService.showNotification('top', 'right', 'success', '', '<b>'+message+'</b>');

        }, 2000);
    }

    expirationCounter(timeout) { 
        console.log('expirationCounter called with timeout:', timeout);
        this.tokenSubscription.unsubscribe();
        this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
            console.log('EXPIRED!!');
            // this.eventService.logoutEvent.next(true);
            // this.router.navigate(["login"]);
            this.logOut("Token expired, please login.");
        });
    }

    // Create an account on the drupal platform
    createAccount(data: User): Promise<any> {
        console.log(data)
    return new Promise((resolve, reject) => {

        const headers = {
        'Content-Type': 'application/json',
        };

        this.api.post('auth/requester', data.toString(), headers)
        .subscribe((response: any) => {
            console.log('Response auth ', response)
            if (response) {
            if (response.resultCode == 0) {
                resolve(response);
                return;
            }
            reject(response);
            return 0;
            }
        }, (error: any) => {
            if (error) {
            // this.toastr.error(error.message);
            // console.log('Error message: ', error.message);
            reject(error);
            }
        });
    });

    }


    // Login into your account
    // authLogin(email?: string, password?: string): Promise<any> {
    // const param = {
    //     'email': email,
    //     'password': password,
    // };
    // const header = {
    //     'Content-Type': 'application/json',
    //     // 'Accept': 'application/json'
    // };

    // return new Promise((resolve, reject) => {
    //     // console.log("Lgoin")
    //     this.api.post('auth/login', param, header)
    //     .subscribe(response => {
    //         console.log(response)
    //         if (response.resultCode == 0) {
    //             let token: any = jwt_decode(response.result.token)
    //             console.log(token)
    //             const userToken = token.user;
    //             // console.log(JSON.parse(token.data));
    //             this.api.setAccessToken(response.result.token);
    //             this.user.getUserById(userToken._id).then((data) => { 
    //             console.log(data);
    //             this.localStorageService.setUserData({
    //                 isLoggedIn: true, 
    //                 user: data
    //             });
    //             this.router.navigate(['mykarryngo']);
    //             this.toastr.success('You have been successfully logged In!');
    //             this.eventService.loginEvent.next(true);
    //             const jwtToken = JSON.parse(atob(response.result.token.split('.')[1]))
    //             const expires = new Date(jwtToken.exp * 1000);
    //             const timeout = expires.getTime() - Date.now();
    //             this.expirationCounter(timeout)
    //             resolve(response);
    //             });
    //         }
    //         else {
    //         reject(response)
    //         }
    //     }, error => {
    //         // this.toastr.success('You have failed to logged In!');
    //         reject(error.error);

    //         // if (error && error.error === 'invalid_grant') {
    //         //   this.toastr.success('Invalid credentials ! Please check your informations and try again.');
    //         // }

    //     });
    // });
    // }
    authLogin(email?: string, password?: string): Promise<any> {
        const param = {
            'email': email,
            'password': password,
        };
        const header = {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json'
        };
    
        return new Promise((resolve, reject) => {
            // console.log("Lgoin")
            this.api.post('auth/login', param, header)
            .subscribe(response => {
                // console.log(response)
                if (response.resultCode == 0) {
                    if (!response.result.account_activated) {
                        reject(response);
                    }
                    else{
                        let token: any = jwt_decode(response.result.token)
                        const userToken = JSON.parse(token.data);
                        // console.log(JSON.parse(token.data));
                        this.api.setAccessToken(response.result.token);
                        this.user.getUserById(userToken.id).then((data) => { 
                            console.log(data);
                            this.localStorageService.setUserData({
                                isLoggedIn: true,
                                user: data
                            });
                            this.router.navigate(['mykarryngo']);
                            this.toastr.success('You have been successfully logged In!');
                            this.eventService.loginEvent.next(true);

                            const jwtToken = JSON.parse(atob(response.result.token.split('.')[1]))
                            const expires = new Date(jwtToken.exp * 1000);
                            const timeout = expires.getTime() - Date.now();
                            this.expirationCounter(timeout)
                            
                            resolve(response);
                        });
                    }
                }
                else {
                    reject(response)
                }
            }, error => {
                // this.toastr.success('You have failed to logged In!');
                reject(error.error);
    
                // if (error && error.error === 'invalid_grant') {
                //   this.toastr.success('Invalid credentials ! Please check your informations and try again.');
                // }
    
            });
        });
    }

    showNotification(from, align, colortype, icon, text) {

        $.notify({
            icon: icon,
            message: text
        }, {
            type: colortype,
            timer: 2000,
            placement: {
            from: from,
            align: align
            }
        });
    }

    // Login into your account
    reset_password(password?: string, id?: any, code?: any): Promise<any> {
        const param = {
            'password': password,
            'id': id,
            'code': code
        };
        console.log(param)
        const header = {
        'Content-Type': 'application/json',
        };

        return new Promise((resolve, reject) => {
        this.api.post('auth/reset-password', param, header)
            .subscribe(response => {
            console.log(response)
            if (response.resultCode == 0) {                
                    resolve(response);
            }
            else {
                reject(response)
            }
            }, error => {
            reject(error.error);
            });
        });
    }

    // Activate account 
    activate(email?: string, id?: any, code?: number): Promise<any> {
        const param = {
            'email': email,
            'id': id,
            'code': code
        };
        // console.log(param)
        const header = {
            'Authorization': 'Bearer ' + this.api.getAccessToken()
        };

        return new Promise((resolve, reject) => {
        this.api.post('auth/activate', param, header)
            .subscribe(response => {
            console.log(response)
            if (response.resultCode == 0) {
                this.user.getUser(id).then((data) => { 
                    // console.log(data);
                    this.localStorageService.setUserData({
                        isLoggedIn: true,
                        user: data
                    });
                    this.router.navigate(['mykarryngo']);
                    this.toastr.success('You have been successfully logged In!');
                    this.eventService.loginEvent.next(true);
                    resolve(response);
                    });
            }
            else {
                reject(response)
            }
            }, error => {
            reject(error.error);
            });
        });
    }


    // Activate account 
    activation_email(email: any): Promise<any> {
        // const header = {
        //     'Authorization': 'Bearer ' + this.api.getAccessToken()
        // };

        return new Promise((resolve, reject) => {
            this.api.post('auth/activation_email', {email: email})
                .subscribe(response => {
                    // console.log(response)
                    // this.router.navigate(['mykarryngo']);
                    this.toastr.success('Activation email, check your inbox!');
                    this.eventService.loginEvent.next(true);
                    resolve(response);
                }, error => {
                reject(error.error);
                });
        });
    }
    
    // New activate account
    activateAccount(token: string, user_id: string){
        const requestBody = { token: token, user_id: user_id };
        // return this.api.post('auth/activate', requestBody)
        return new Promise((resolve, reject) => {
            this.api.post('auth/activate', requestBody)
                .subscribe(response => {
                    console.log(response)
                    if (response.resultCode == 0) {
                        resolve(response);
                        // // this.router.navigate(['login']);
                        // let user:Provider=new Provider();
                        // user.hydrate(response.result);
                        // console.log(user)
                        // this.localStorageService.setUserData({
                        //     isLoggedIn: true,
                        //     user: user
                        // });
                        // this.router.navigate(['mykarryngo']);
                        // this.toastr.success('You have been successfully logged In!');
                        // this.eventService.loginEvent.next(true);
                        // resolve(response);
                    }
                    else {
                        reject(response)
                    }
                }, error => {
                reject(error.error);
                });
            });
    }

    // Activate account with code
    activateWithCode(code: string, user_id: string): Promise<any> {
        const requestBody = { code: code, user_id: user_id };
        return new Promise((resolve, reject) => {
            this.api.post('auth/activateWithCode', requestBody)
            .subscribe(response => {
                console.log(response)
                if (response.resultCode == 0) {
                    resolve(response);
                }
                else {
                    reject(response)
                }
            }, error => {
            reject(error.error);
            });
        });
    }

    verifyPassword(user_id?: string, password?: string): Promise<any> {
        const param = {
            'user_id': user_id,
            'password': password,
        };
        // console.log(param)
        const header = {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json'
        };
    
        return new Promise((resolve, reject) => {
            // console.log("Lgoin")
            this.api.post('auth/verify_password', param, header)
            .subscribe(response => {
                console.log(response)
                // resolve(response);
                // if (response.resultCode == 0) {
                //     let token: any = jwt_decode(response.result.token)
                //     const userToken = JSON.parse(token.data);
                //     // // console.log(JSON.parse(token.data));
                //     // this.api.setAccessToken(response.result.token);
                //     // this.user.getUserById(userToken.id).then((data) => { 
                //     //     console.log(data);
                //     //     this.localStorageService.setUserData({
                //     //         isLoggedIn: true,
                //     //         user: data
                //     //     });
                //     //     this.router.navigate(['mykarryngo']);
                //     //     this.toastr.success('You have been successfully logged In!');
                //     //     this.eventService.loginEvent.next(true);
                //     //     resolve(response);
                //     // });
                // }
                // else {
                //     reject(response)
                // }
            }, error => {
                reject(error.error);
            });
        });
    }

    deleteAccount(email: string): Promise<any> {
        let data = {
            "email": email
        }
        console.log('Account deleted successfully.');
        const header = {
            'Content-Type': 'application/json',
            // 'Accept': 'application/json'
        };
        return new Promise((resolve, reject) => {
            // console.log("Lgoin")
            this.api.post('auth/delete_account', data, header)
            .subscribe(response => {
                console.log(response)
                // resolve(response);
                // if (response.resultCode == 0) {
                //     let token: any = jwt_decode(response.result.token)
                //     const userToken = JSON.parse(token.data);
                //     // // console.log(JSON.parse(token.data));
                //     // this.api.setAccessToken(response.result.token);
                //     // this.user.getUserById(userToken.id).then((data) => { 
                //     //     console.log(data);
                //     //     this.localStorageService.setUserData({
                //     //         isLoggedIn: true,
                //     //         user: data
                //     //     });
                //     //     this.router.navigate(['mykarryngo']);
                //     //     this.toastr.success('You have been successfully logged In!');
                //     //     this.eventService.loginEvent.next(true);
                //     //     resolve(response);
                //     // });
                // }
                // else {
                //     reject(response)
                // }
            }, error => {
                reject(error.error);
            });
        });
    }

}
