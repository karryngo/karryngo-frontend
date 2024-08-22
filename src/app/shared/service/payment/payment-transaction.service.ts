import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentTransactionService {

    constructor(private http: HttpClient, private api: ApiService,) {}

    // Retrieve a list of user inquiries with pagination
    find(page: number = 1, limit: number = 10): Observable<any> {
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());

        return this.http.get<any>(environment.apiUrl+"/payment/getPaymentsWithAggregation", { params });
    }

    findInCountry(page: number = 1, limit: number = 10, countryId: string): Observable<any> {
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('countryId', countryId||null);

        return this.http.get<any>(environment.apiUrl+"/payment/getPaymentsWithAggregation", { params });
        // return this.api.get('payment/getPaymentsWithAggregation', { params })
    }

    getPaymentWithUserAndService(paymentId: string): Observable<any> {
        return this.http.get<any>(environment.apiUrl+"/payment/getPaymentWithUserAndService/"+paymentId);
    }

    // // Retrieve a user inquiry by ID
    // findById(id: string): Observable<ApiResponse<UserInquiry>> {
    //     return this.http.get<ApiResponse<UserInquiry>>(`${environment.apiUrl}/user-inquiries/${id}`);
    // }

    // // Delete a user inquiry by ID
    // delete(id: string): Observable<ApiResponse<UserInquiry>> {
    //     return this.http.delete<ApiResponse<UserInquiry>>(`${environment.apiUrl}/user-inquiries/${id}`);
    // }
}
