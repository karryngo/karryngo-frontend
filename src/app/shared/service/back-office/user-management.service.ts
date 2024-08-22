import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';


@Injectable({
    providedIn: 'root'
})
export class UserManagementService {

    constructor(
        private api: ApiService,
    ) { }

    //recuperer la liste des utilisateurs en utilisant son firstname, son lastname ou son adresse email
    find_users_by_info_pattern(pattern: string, skip: number, limit: number, options: any): Promise<any> 
    {
        // const apiUrl = `admin/user/find_users_by_info_pattern/` + this.pattern + "/" + this.skip + "/" + this.limit;
        // console.log(apiUrl);
        return new Promise<any>((resolve, reject) => {
            this.api.post(`admin/user/find_users_by_info_pattern/` + pattern + "/"+ skip +"/"+ limit, options, {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
            })
            .subscribe(success => {
                resolve(success)
            }, error => {
            reject(error); 
            })
        })
    }

    add_user_privilege(data: any, user_id: any): Promise<any> {
        console.log(data)
        console.log(user_id)
        return new Promise((resolve, reject) => {
            this.api.post(`admin/user/add_user_privilege/${user_id}`, data, {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
            })
            .subscribe((result) => {
                console.log(result)
                if (result && result.resultCode == 0) {
                    resolve(result);
                }
                else resolve(false)
            }, (err)=>{
                reject(err);
            }) 
        })
    }

    remove_user_privilege(data: any, user_id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.post(`admin/user/remove_user_privilege/${user_id}`, data, {
                'Authorization': 'Bearer ' + this.api.getAccessToken(),
            })
            .subscribe((result) => {
                console.log(result)
                if (result && result.resultCode == 0) {
                    resolve(result);
                }
                else resolve(false)
            }, (err)=>{
                reject(err);
            }) 
        })
    }

}
