import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentTransactionService } from '../../../../../shared/service/payment/payment-transaction.service';

@Component({
    selector: 'app-c-payment-transaction-details',
    templateUrl: './c-payment-transaction-details.component.html',
    styleUrls: ['./c-payment-transaction-details.component.css']
})
export class CPaymentTransactionDetailsComponent implements OnInit {

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
