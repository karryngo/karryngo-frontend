// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

// Wallet Routing
import { WalletRoutingModule } from './wallet-routing.module';
import { PaymentModule } from '../../../shared/components/payment/payment.module';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from '../../../shared/components/payment/payment.component';
import { TranslateModule } from '@ngx-translate/core';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [
    PaymentModule,
    CommonModule,
    FormsModule,
    WalletRoutingModule,
    TranslateModule.forChild(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    DepositComponent,
    WithdrawalComponent,
    PaymentMethodComponent,
    HistoryComponent,
    // PaymentComponent
  ],
})
export class WalletModule { }
