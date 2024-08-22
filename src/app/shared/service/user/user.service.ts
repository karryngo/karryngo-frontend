// import { Provider } from './../../entity/provider';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { GeneraleService } from '../generale/generale.service';
import { ParametersService } from '../../../shared/parameters/parameters.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Provider, User } from '../../entity/provider';
// import { AuthService } from '../auth/auth.service';
import io from 'socket.io-client'
import { UserlocalstorageService } from '../localstorage/userlocalstorage.service';
import { environment } from '../../../../environments/environment';


@Injectable({
providedIn: 'root'
})
export class UserService {


    usersSubject: Subject<User[]> = new Subject<User[]>();

    listUser: Map<string,User> = new Map<string,User>();

    fileUrl: string = environment.filesUrl;
    defaultImg: string = "assets/imgs/default-avatar.jpg";

    constructor(
        private api: ApiService,
        private generalService: GeneraleService,
        private parameters: ParametersService,
        private router: Router,
        private toastr: ToastrService,
        private localStorageService: UserlocalstorageService,
        //private login: AuthService
    ) { }


    getListUser():User[]
    {
        let r:User[]=[];
        this.listUser.forEach((value:User)=> r.push(value));
        return r;
    }

    emitUsersData() {
        this.usersSubject.next( this.getListUser());
    }

    emit_local_user(data: User){
        let user:Provider=new Provider();
        user.hydrate(data);
        this.localStorageService.setUserData({ 
            isLoggedIn: true,
            user: user
        });
    }


    //This method returns list of providers
    getListOfProviders(): Promise<User[]>{
        
        return new Promise<any>((resolve, reject) => {
        
            this.api.get(`users`, {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            }).subscribe(success => {

            if (success) {
                if (success.resultCode == 0) {
                
                const users: Provider[] = success.result;
                let list_users: Provider[] =  users.filter(elt => elt.isProvider);
                resolve(list_users);
                }
                else reject(success)

            }else reject(success);

            }, error => {
            reject(error);
            });
        
        });

    }

    // permet d'update les infos d'un user
    UpdateUser(user_id: string, country_id: string, data: any): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.post(`admin/account/set_manager/`+user_id+"/"+country_id, data, {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            }).subscribe(success => {
            if (success) {
                    if (success.resultCode == 0) {
                    let user:Provider=new Provider();
                    user.hydrate(success.result);
                    this.listUser.set(user._id.toString(),user);
                    this.emitUsersData();
                    resolve(user);
                }
                else reject(success)

            }
            else reject(success)
            }, error => {
            reject(error);
            })
        })
    }

    // request phone number update
    requestPhoneNumberUpdate(phoneNumber: string, password: string)
    {
        return this.api.post(`user/profile/requestPhoneNumberUpdate`, {phoneNumber, password}, {'Authorization': 'Bearer ' + this.api.getAccessToken()})
    }

    // request email update
    requestEmailUpdate(phoneNumber: string, password: string)
    {
        return this.api.post(`user/profile/requestEmailUpdate`, {phoneNumber, password}, {'Authorization': 'Bearer ' + this.api.getAccessToken()})
    }

    // request phone number update
    updatePhoneNumber(data: any)
    {
        return this.api.post(`user/profile/updatePhoneNumber`, data, {'Authorization': 'Bearer ' + this.api.getAccessToken()})
    }

    // Update email
    updateEmail(data: any)
    {
        return this.api.post(`user/profile/updateEmail`, data, {'Authorization': 'Bearer ' + this.api.getAccessToken()})
    }

    // permet d'update le profile d'un user
    Update_user_photo(user_id: string, data: any): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.post(`users/Update_user_photo/`+user_id, data).subscribe(success => {
            if (success) {
                    if (success.resultCode == 0) {
                    resolve(success.result);
                }
                else reject(success)

            }
            else reject(success)
            }, error => {
                reject(error);
            })
        })
    }
    Update_user_photo_(user_id: string, data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.api.post(`users/Update_user_photo/` + user_id, data, {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
                }).subscribe(
                (success: any) => {
                    if (success && success.resultCode === 0) {
                        resolve(success.result);
                    } else {
                        reject({
                            message: 'Update user photo failed',
                            resultCode: success ? success.resultCode : null,
                            error: success ? success.error : null,
                        });
                    }
                },
                (error) => {
                    reject({
                        message: 'Update user photo failed',
                        error: error,
                    });
                }
            );
        });
    }

    // permet d'update les infos d'un user
    update_user_info(user_id: string, data: any): Promise<any> 
    {
        return new Promise<any>((resolve, reject) => {
            this.api.post(`users/Update_user_info/`+user_id, data, {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            }).subscribe(success => {
            if (success) {
                    if (success.resultCode == 0) {
                    resolve(success.result);
                }
                else reject(success)

            }
            else reject(success)
            }, error => {
            reject(error);
            })
        })
    }

    // permet d enregistrer les pays y compris les choix des villes fait par le user
    saveCountriesAndCities(token: string, data: any): Promise<any> {

        return new Promise((resolve, reject) => {
        });
    }



    // Permet d enregistrer un document personnel du user (ID CARD, PROOF OF RESIDENCE, ...)
    saveUserDocument(token: string, data: any): Promise<any> {

        return new Promise((resolve, reject) => {

        const headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/hal+json'
        }
        });
    }

    // touts les types ID(card id, passporId)
    getAllIdType(): Promise<any> {
        return this.generalService.getAllElement(this.parameters.allTypeId);
    }

    setUser(user:User)
    {
        let userProfile: Provider=new Provider();
        userProfile.hydrate(user);
        console.log(userProfile)
        if(! this.listUser.has(userProfile._id.toString())) this.listUser.set(userProfile._id.toString(), userProfile)
    }

//recuperer les informations d'un utilisateur
    // getUserById(id: String): Promise<any> {
    //     return new Promise<any>((resolve, reject) => {
    //         if (this.listUser.has(id.toString())) resolve(this.listUser.get(id.toString()));
    //         else {
    //             this.api.get(`user/profil/${id}`, {
    //                 'Authorization': 'Bearer ' + this.api.getAccessToken(),
    //             }).subscribe(success => {
    //                 if (success) {
    //                     if (success._id) {
    //                         let user:Provider=new Provider();
    //                         user.hydrate(success);
    //                         this.listUser.set(user._id.toString(),user);
    //                         this.emitUsersData();
    //                         resolve(user);
    //                     }
    //                     else reject(success)

    //                 }
    //                 else reject(success)
    //             }, error => {
    //                 console.log(error)
    //                 reject(error);
    //             })
    //         }
    //     })
    // }
    getUserById(id: String): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.listUser.has(id.toString())) resolve(this.listUser.get(id.toString()));
            else {
                this.api.get(`user/profil/${id}`, {
                    'Authorization': 'Bearer ' + this.api.getAccessToken(),
                }).subscribe(success => {
                    if (success) {
                        if (success.resultCode == 0) {
                            let user:Provider=new Provider();
                            user.hydrate(success.result);
                            this.listUser.set(user._id.toString(),user);
                            this.emitUsersData();
                            resolve(user);
                            }
                        else reject(success)

                    }
                    else reject(success)
                }, error => {
                    console.log(error)
                    reject(error);
                })
            }
        })
    }

    userExists(id: String): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.listUser.has(id.toString())) resolve(this.listUser.get(id.toString()));
            else {
                this.api.get(`user/userExists/${id}`, {
                    'Authorization': 'Bearer ' + this.api.getAccessToken(),
                }).subscribe(success => {
                    if (success) {
                        if (success.resultCode == 0) {
                            let user:Provider=new Provider();
                            user.hydrate(success.result);
                            this.listUser.set(user._id.toString(),user);
                            this.emitUsersData();
                            resolve(user);
                            }
                        else reject(success)

                    }
                    else reject(success)
                }, error => {
                    console.log(error)
                    reject(error);
                })
            }
        })
    }

    //recuperer les informations d'un utilisateur
    getUser(id: String): Promise<any> {

    return new Promise<any>((resolve, reject) => {
            this.api.get(`user/profil/${id}`, {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            }).subscribe(success => {
            if (success) {
                if (success.resultCode == 0) {
                let user:Provider=new Provider();
                user.hydrate(success.result);
                this.listUser.set(user._id.toString(),user);
                this.emitUsersData();
                resolve(user);
                }
                else reject(success)

            }
            else reject(success)
            }, error => {
            reject(error);
            })
        })
    }
    //recuperer les informations de l'utilisateur courant
    getcurrent_user(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.api.get(`requester/profil`, {
            'Authorization': 'Bearer ' + this.api.getAccessToken(),
            }).subscribe(success => {
            if (success) {
                    if (success.resultCode == 0) {
                    let user:Provider=new Provider();
                    user.hydrate(success.result);
                    this.listUser.set(user._id.toString(),user);
                    this.emitUsersData();
                    resolve(user);
                }
                else reject(success)

            }
            else reject(success)
            }, error => {
            reject(error);
            })
        })
    }

}
