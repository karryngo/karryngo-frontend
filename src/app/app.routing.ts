import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './back-office/containers';


/// Front Office
import { WelcomeComponent } from './front-office/welcome/welcome.component';
import { HowDoesItWorkComponent } from './front-office/how-does-it-work/how-does-it-work.component';
import { RequestsComponent } from './front-office/requests/requests.component';
import { AboutUsComponent } from './front-office/about-us/about-us.component';
import { ForgotPasswordComponent } from './front-office/forgot-password/forgot-password.component';
import { LoginComponent } from './front-office/login/login.component';
import { RegisterComponent } from './front-office/register/register.component';



// Shared
import { BlankPageComponent } from './shared/blank-page/blank-page.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './shared/components/terms-and-conditions/terms-and-conditions.component';
import { TestPagesComponent } from './test-pages/test-pages.component';


//// Back Office
import { VerifyEmailComponent } from './front-office/verify-email/verify-email.component';
import { ParcelDetailComponent } from './shared/components/modals/parcel-detail/parcel-detail.component';
import { PassengerDetailComponent } from './shared/components/modals/passenger-detail/passenger-detail.component';
import { LabTest2Component } from './lab-test/lab-test-2/lab-test-2.component';
import { AuthGuard } from './back-office';
import { RedirectAuthGuard } from './shared/guard/redirect-auth.guard';
import { DetailComponent } from './shared/components/modals/detail.component';
import { PackageGuard } from './shared/guard/package.guard';
import { PostRequest0Component } from './front-office/post-request/post-request0.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './front-office/update-password/update-password.component';
import { ViewServicesComponent } from './front-office/view-services/view-services.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'test',
    component: TestPagesComponent
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent
  },
  {
    path: 'network',
    component: HowDoesItWorkComponent
  },
  {
    path: 'index',
    component: WelcomeComponent
  },
  {
    path: 'welcome/services/:slug',
    component: ViewServicesComponent
  },
  /*{
    path: 'chat',
    component: ChatComponent
  },*/
  {
    path: 'requests',
    component: PostRequest0Component
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate:[RedirectAuthGuard]
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    canActivate:[RedirectAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[RedirectAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[RedirectAuthGuard]
  },
  {
    path: 'registration',
    component: RegisterComponent,
    canActivate:[RedirectAuthGuard]
  },
  {
    path: 'parcel-detail',
    component: ParcelDetailComponent,
  },
  {
    path: 'passenger-detail',
    component: PassengerDetailComponent,
  },
  
  {
    path: 'details',
    component: DetailComponent,
    data: {
      title: 'Details'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./shared/components/modals/detail.module').then(m => m.DetailModule)
      },
    ]
    },
  {
    path: 'lab-test-2',
    component: LabTest2Component,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'carrier',
        loadChildren: () => import('./back-office/views/carrier/carrier.module').then(m => m.CarrierModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('./back-office/views/trips/trips.module').then(m => m.TripsModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./back-office/views/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./back-office/views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'mykarryngo',
        loadChildren: () => import('./back-office/views/mykarry/mykarry.module').then(m => m.MykarryModule)
      },
      {
        path: 'dashboard-country',
        loadChildren: () => import('./back-office/views/dashboard-country/dashboard-country.module').then(m => m.DashboardCountryModule)
      },
      {
        path: 'post-requests',
        loadChildren: () => import('./back-office/views/post-requests/post-requests.module').then(m => m.PostRequestsModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./back-office/views/profil/profil.module').then(m => m.ProfilModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('./back-office/views/wallet/wallet.module').then(m => m.WalletModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./back-office/views/map/map.module').then(m => m.MapModule)
      },
      {
        path: 'management',
        loadChildren: () => import('./back-office/views/management/management.module').then(m => m.ManagementModule)
      },
    ]
  },
  {
    path: '**',
    component: BlankPageComponent
  },
  {
    path: 'blanck',
    component: BlankPageComponent
  },
];

@NgModule({
  imports: [ 
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes,{
    useHash: true
  }) ],
  exports: [ ]
})
export class AppRoutingModule {}
