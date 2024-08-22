// comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
    private apiUrl = 'your_api_url'; // Replace with your API endpoint

    constructor(private api: ApiService, private http: HttpClient) {}

    postComment_(comment: Comment): Observable<any> {
        return this.http.post(this.apiUrl, comment);
    }

    // postComment(comment: any): Promise<any> {
    postComment(comment: any) {
        return this.api.post(`comment/save`, comment, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
        // return new Promise((resolve, reject) => {
        //     this.api.post(`service/comment`, comment, { 'Authorization': 'Bearer ' + this.api.getAccessToken()})
        //     .subscribe((result) => {
        //         console.log(result)
        //         if (result && result.resultCode == 0) {
        //             resolve(result);
        //         }
        //         else resolve(false)
        //     }, (err)=>{
        //         reject(err);
        //     }) 
        // })
    }

    find_by_user_id(userId: string) {
        return this.api.get(`comment/find_by_user_id/`+userId, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    find_by_service_id(serviceId: string) {
        return this.api.get(`comment/find_by_service_id/`+serviceId, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }

    find_by_user_and_service(data: any) {
        return this.api.post(`comment/find_by_user_and_service`, data, { 'Authorization': 'Bearer ' + this.api.getAccessToken()});
    }
}
