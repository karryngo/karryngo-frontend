import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MProvidersComponent } from './m-providers/m-providers.component';
import { MFinancesComponent } from './m-finances/m-finances.component';
import { MCountriesComponent } from './m-countries/m-countries.component';
import { MCostomersComponent } from './m-costomers/m-costomers.component';
import { MServicesComponent } from './m-services/m-services.component';
import { MTvaComponent } from './m-tva/m-tva.component';
import { MCountryDetailsComponent } from './m-country-details/m-country-details.component';
import { CountryAdminGuard, ManagementGuard, SuperAdminGuard } from '../../../shared/guard/super-admin.guard';
import { MMessagesComponent } from './m-messages/m-messages.component';
import { MMessageDetailsComponent } from './m-message-details/m-message-details.component';
import { MCountryProvidersComponent } from './m-country-providers/m-country-providers.component';
import { MCountryServicesComponent } from './m-country-services/m-country-services.component';
import { MCountryStatisticsComponent } from './m-country-statistics/m-country-statistics.component';
import { MServiceStatisticsComponent } from './m-service-statistics/m-service-statistics.component';
import { MProviderStatisticsComponent } from './m-provider-statistics/m-provider-statistics.component';
import { MUserProfileComponent } from './m-costomers/m-user-profile/m-user-profile.component';
import { MCountryProviderStatisticsComponent } from './m-country-provider-statistics/m-country-provider-statistics.component';
import { MPaymentTransactionsComponent } from './m-payment-transactions/m-payment-transactions.component';
import { MPaymentTransactionDetailsComponent } from './m-payment-transactions/m-payment-transaction-details/m-payment-transaction-details.component';
import { CPaymentTransactionsComponent } from './c-payment-transactions/c-payment-transactions.component';
import { CPaymentTransactionDetailsComponent } from './c-payment-transactions/c-payment-transaction-details/c-payment-transaction-details.component';

const routes: Routes = [
    {
    path: '',
    data: {
        title: 'Management' 
    },
        children: [
            // {
            //   path: '',
            //   redirectTo: 'be-carrier'
            // },
            {
                path: 'costomers',
                canActivate:[SuperAdminGuard],
                component: MCostomersComponent,
                data: {
                    title: 'Manage Costomers',
                    page: 'm-costomers'
                }, 
                },
            {
            path: 'countries',
            canActivate:[SuperAdminGuard],
            component: MCountriesComponent,
            data: {
                title: 'Manage Countrie',
                page: 'm-countries'
            }
            },
            {
            path: 'country-details/:country_id',
            component: MCountryDetailsComponent,
            data: {
                title: 'Manage Country details',
                page: 'm-countries-details'
            }
            },
            {
            path: 'finances',
            component: MFinancesComponent,
            data: {
                title: 'Manage Costomers',
                page: 'm-finances'
            },
            },
            {
                path: 'providers',
                canActivate:[ManagementGuard],
                component: MProvidersComponent,
                data: {
                    title: 'Manage Providers',
                    page: 'm-providers'
                },
            },
            {
            path: 'services',
            canActivate:[SuperAdminGuard],
            component: MServicesComponent,
            data: {
                title: 'Manage services',
                page: 'm-services'
            },
            },
            {
            path: 'tva',
            component: MTvaComponent,
            data: {
                title: 'Manage tva',
                page: 'm-tva'
            },
            },
            {
                path: 'messages',
                canActivate:[SuperAdminGuard],
                component: MMessagesComponent,
                data: {
                    title: 'Manage messages',
                    page: 'm-messages'
                },
            },
            {
                path: 'payment-transactions',
                canActivate:[SuperAdminGuard],
                component: MPaymentTransactionsComponent,
                data: {
                    title: 'Payment Transactions',
                    page: 'm-payment'
                },
            },
            {
                path: 'c-payment-transactions',
                canActivate:[CountryAdminGuard],
                component: CPaymentTransactionsComponent,
                data: {
                    title: 'Country Payment Transactions',
                    page: 'm-payment'
                },
            },
            {
                path: 'payment-transaction-details/:paymentId',
                canActivate:[SuperAdminGuard],
                component: MPaymentTransactionDetailsComponent,
                data: {
                    title: 'Payment Transactions Details',
                    page: 'm-payment-details'
                },
            },
            {
                path: 'c-payment-transaction-details/:paymentId',
                canActivate:[CountryAdminGuard],
                component: CPaymentTransactionDetailsComponent,
                data: {
                    title: 'Payment Transactions Details',
                    page: 'm-payment-details'
                },
            },
            {
                path: 'message-details/:message_id',
                canActivate:[SuperAdminGuard],
                component: MMessageDetailsComponent,
                data: {
                    title: 'Manage message details',
                    page: 'm-message-details'
                },
            },
            {
                path: 'country-providers',
                canActivate:[CountryAdminGuard],
                component: MCountryProvidersComponent
            },
            {
                path: 'country-services',
                canActivate:[CountryAdminGuard],
                component: MCountryServicesComponent
            },
            {
                path: 'country-statistics',
                canActivate:[CountryAdminGuard],
                component: MCountryStatisticsComponent
            },
            {
                path: 'country-provider-statistics',
                canActivate:[CountryAdminGuard],
                component: MCountryProviderStatisticsComponent
            },
            {
                path: 'service-statistics',
                canActivate:[ManagementGuard],
                // canActivate:[SuperAdminGuard],
                component: MServiceStatisticsComponent
            },
            {
                path: 'provider-statistics',
                canActivate:[ManagementGuard],
                // canActivate:[SuperAdminGuard],
                component: MProviderStatisticsComponent
            },
            {
                path: 'user-profile/:user_id',
                canActivate:[SuperAdminGuard],
                component: MUserProfileComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementRoutingModule { }
