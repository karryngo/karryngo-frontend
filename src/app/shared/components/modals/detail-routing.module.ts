import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParcelDetailComponent } from './parcel-detail/parcel-detail.component';
import { PassengerDetailComponent } from './passenger-detail/passenger-detail.component';
import { ConfirmPaymentComponent } from './payment/confirm-payment/confirm-payment.component';
import { WaitPaymentComponent } from './payment/wait-payment/wait-payment.component';
import { TransportComponent } from './transport/transport.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Details'
    },
    children: [
      {
        path: 'parcel-detail',
        component: ParcelDetailComponent,
        data: {
          title: 'Parcel details'
        }
      },
      {
        path: 'passenger-detail',
        component: PassengerDetailComponent,
        data: {
          title: 'Passenger details'
        }
      },
      {
        path: 'confirm-payment',
        component: ConfirmPaymentComponent,
        data: {
          title: 'Confirm payment'
        }
      },
      {
        path: 'wait-payment',
        component: WaitPaymentComponent,
        data: {
          title: 'Passenger Payments'
        }
      },
      {
        path: 'transport',
        component: TransportComponent,
        data: {
          title: 'Transport'
        }
      }
    ],
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DetailRoutingModule { }
