import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentTransactionService } from '../../../../shared/service/payment/payment-transaction.service';

@Component({
    selector: 'app-m-payment-transactions',
    templateUrl: './m-payment-transactions.component.html',
    styleUrls: ['./m-payment-transactions.component.css']
})
export class MPaymentTransactionsComponent implements OnInit {
    dataLoaded: boolean = false;
    paymentTransactions: any[] = [];
    options = {page: 1, limit: 20}
    private getPaymentSubscription!: Subscription;

    constructor(private router: Router, private paymentTransactionService: PaymentTransactionService) { }

    ngOnInit(): void {
        this.getPaymentSubscriptions();
    }

    getPaymentSubscriptions() {
        this.getPaymentSubscription = this.paymentTransactionService.find(this.options.page, this.options.limit).subscribe({
            next: (response: any) => {
                // console.log(response)
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
        this.router.navigate(['/management/payment-transaction-details/', paymentTransaction._id]); 
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.options.page = this.options.page+1;
            this.getPaymentSubscriptions();
        }
    }

    ngOnDestroy(): void {
        if (this.getPaymentSubscription) {
            this.getPaymentSubscription.unsubscribe();
        }
    }

}
