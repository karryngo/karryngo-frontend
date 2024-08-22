import { Component, OnInit } from '@angular/core';
import { PaymentTransactionService } from '../../../../../shared/service/payment/payment-transaction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-m-payment-transaction-details',
    templateUrl: './m-payment-transaction-details.component.html',
    styleUrls: ['./m-payment-transaction-details.component.css']
})
export class MPaymentTransactionDetailsComponent implements OnInit {
    dataLoaded: boolean = false;
    paymentTransaction: any = null;

    constructor( private route: ActivatedRoute, private paymentTransactionService: PaymentTransactionService) { }

    ngOnInit(): void {
        // const paymentId = this.route.snapshot.params['paymentId'];
        this.loadPayment()
    }

    loadPayment(): void {
        const paymentId = this.route.snapshot.params['paymentId'];
        this.paymentTransactionService.getPaymentWithUserAndService(paymentId).subscribe({
            next: (response: any) => {
                this.paymentTransaction = response.data!;
                console.log("response : ", this.paymentTransaction)
                this.dataLoaded = true;
            },
            error: (err) => {
                console.log(err);
                this.dataLoaded = true;
            }
        });
    }

}
