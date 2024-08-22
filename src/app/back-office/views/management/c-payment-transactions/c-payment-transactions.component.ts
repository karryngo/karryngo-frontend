    import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../../shared/entity/provider';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { CarrierService } from '../../../../shared/service/back-office/carrier.service';
import { CountryManagementService } from '../../../../shared/service/back-office/country-management.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { PaymentTransactionService } from '../../../../shared/service/payment/payment-transaction.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

    @Component({
        selector: 'app-c-payment-transactions',
        templateUrl: './c-payment-transactions.component.html',
        styleUrls: ['./c-payment-transactions.component.css']
    })
    export class CPaymentTransactionsComponent implements OnInit {

        list_providers: any[] = [];
        current_user: Provider;

        // Pagination
        criteria: any = {
            skip: 0,
            limit: 20,
            sort: 1,
            country_id: ""
        }
        dataSkip = this.criteria.skip;
        dataLength = this.criteria.limit;

        obj_loader: boolean = true;
        provider_profile: any;
        currentProvider: any; 
        modalRef: BsModalRef;

        dataLoaded: boolean = false;
        paymentTransactions: any[] = [];
        options = {page: 1, limit: 10}
        private getDataSubscription!: Subscription;
        gotUser: boolean = false;

        constructor(
            private countryManagementService: CountryManagementService,
            private userService:UserService,
            private authService:AuthService,
            private supplierServ: CarrierService,
            private modalServ: BsModalService, private paymentTransactionService: PaymentTransactionService,
            private router: Router
        ) { 
            this.authService.currentUserSubject.subscribe((user:any)=>{
                console.log(user)
                if (user._id && user._id!="" && !this.gotUser) {
                    this.gotUser = true;
                    this.getUserById(user._id);
                }
                this.current_user=user;
            })
        }

        ngOnInit(): void {
            
        }

        getUserById(id: string){
            this.userService.getUserById(id).then((res)=>{
                console.log(res)
                if (res.adresse.country) {
                    this.getCountryOfManager(id);
                }
            }).catch((err)=>{console.log(err)})
        }

        getCountryOfManager(user_id: string) {
            this.countryManagementService.getCountryOfManager(user_id).subscribe(async(res: any)=>{
                // console.log(res)
                
                console.log('1111111111 : ', res)
                // await this.getSumCountryProviders(res.data?.country?._id)
                this.getPaymentSubscriptions(res.data?.country?._id);
            }, (error)=>{
                console.log(error);
            })
        }

        getPaymentSubscriptions(countryId: string) {
            this.paymentTransactionService.findInCountry(this.options.page, this.options.limit, countryId).subscribe({
                next: (response: any) => {
                    console.log("responseeee : ", response)
                    if (response && response.data && response.data.payments) {
                        if (response.data.payments.length > 0) {
                            this.paymentTransactions = [...this.paymentTransactions, ...response.data.payments];
                        }
                    } else {
                        console.warn('No payments data received');
                    }
                    this.dataLoaded = true;
                },
                error: (error: any) => {
                    console.log(error);
                    this.dataLoaded = true;
                }
            });
        }
    
        navigateToDetails(paymentTransaction: any) {
            this.router.navigate(['/management/c-payment-transaction-details/', paymentTransaction._id]); 
        }

        ngOnDestroy(): void {
            if (this.getDataSubscription) {
                this.getDataSubscription.unsubscribe();
            }
        }

    }
