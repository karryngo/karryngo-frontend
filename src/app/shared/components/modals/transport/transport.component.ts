import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Transaction, TransactionState } from '../../../entity/transaction';

@Component({
  selector: 'app-transport',
  templateUrl: 'transport.component.html',
  styleUrls: ['transport.component.scss']
})
export class TransportComponent implements OnInit {
  message: string = '';
  @Input() transaction:Transaction

  constructor () {}
  ngOnInit(): void {
    switch(this.transaction.state)
    {
      case TransactionState.SERVICE_PAIEMENT_DONE_AND_WAITING_START:
        this.message="The transport of the package has not yet started"
        break;
      case TransactionState.SERVICE_RUNNING:
        this.message="the transport of your package is in progress"
        break;
      case TransactionState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT:
        this.message="the transport is finished. the carrier's payment has started"
        break;
    }
  }
}
