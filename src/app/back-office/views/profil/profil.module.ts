// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';
import { UserComponent } from './user.component';

// Modal module
import { ModalModule } from 'ngx-bootstrap/modal';

// Notifications Routing
import { ProfilRoutingModule } from './profil-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentModule } from '../../../shared/components/payment/payment.module';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UpdatePhoneNumberComponent } from './update-phone-number/update-phone-number.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { UpdateEmailComponent } from './update-email/update-email.component';

@NgModule({
  imports: [
    PaymentModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProfilRoutingModule,
    TranslateModule.forChild(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    NgxIntlTelInputModule 
  ],
  declarations: [
    UserComponent,
    DeleteAccountComponent,
    UpdatePhoneNumberComponent,
    UpdateEmailComponent,
  ]
})
export class ProfilModule { }
