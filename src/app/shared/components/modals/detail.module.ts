// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal module
import { ModalModule } from 'ngx-bootstrap/modal';

// Notifications Routing


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParcelDetailComponent } from './parcel-detail/parcel-detail.component';
import { PassengerDetailComponent } from './passenger-detail/passenger-detail.component';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { ConfirmPaymentComponent } from './payment/confirm-payment/confirm-payment.component';
import { WaitPaymentComponent } from './payment/wait-payment/wait-payment.component';
import { TransportComponent } from './transport/transport.component';
import { ComfirmTransportComponentComponent } from './comfirm-transport-component/comfirm-transport-component.component';
import { ProgressIndeterminateModule } from '../progress-indeterminate/progress-indeterminate.module';


@NgModule({
    imports: [
      DetailRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      AlertModule.forRoot(),
      ModalModule.forRoot(),
      ProgressIndeterminateModule
    ],
    declarations: [
      ParcelDetailComponent,
      PassengerDetailComponent,
      DetailComponent,
      ConfirmPaymentComponent,
      WaitPaymentComponent,
      TransportComponent,
      ComfirmTransportComponentComponent
    ],
    exports:[
      DetailComponent
    ],
    entryComponents:[
      ComfirmTransportComponentComponent
    ]
  })
export class DetailModule {

}
