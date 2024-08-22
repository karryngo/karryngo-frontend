import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositComponent } from './deposit/deposit.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Wallet'
    },
    children: [
      {
        path: '',
        redirectTo: 'history'
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: { 
          title: 'History'
        }
      },
      {
        path: 'deposit',
        component: DepositComponent,
        data: {
          title: 'Deposit'
        }
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        data: {
          title: 'Withdrawal'
        }
      },
      {
        path: 'payment-method',
        component: PaymentMethodComponent,
        data: {
          title: 'Payment Method'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule {}
