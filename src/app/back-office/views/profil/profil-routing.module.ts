import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UpdatePhoneNumberComponent } from './update-phone-number/update-phone-number.component';
import { UpdateEmailComponent } from './update-email/update-email.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Profil'
        },
        children: [
            {
                path: '',
                redirectTo: 'user'
            },
            { 
                path: 'user',
                component: UserComponent,
                data: {
                    title: 'User'
                }
            },
        ]
    },
    { 
        path: 'delete-account',
        component: DeleteAccountComponent,
        data: {
            title: 'Delete Account'
        }
    },
    { 
        path: 'update-phone-number',
        component: UpdatePhoneNumberComponent,
        data: {
            title: 'Phone number update'
        }
    },
    { 
        path: 'update-email',
        component: UpdateEmailComponent,
        data: {
            title: 'Email update'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfilRoutingModule {}
