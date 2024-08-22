import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './back-office/containers';
import { LoginComponent } from './front-office/login/login.component';
import { RegisterComponent } from './front-office/register/register.component';
import { GoogleMapsModule } from '@angular/google-maps'

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing-module';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { UserService } from './shared/service/user/user.service';

// Angular Material Components
import { MatCheckboxModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

/////
import { RouterModule } from '@angular/router';
import { AppBootStrapModule } from './shared/app-boot-strap/app-boot-strap.module';
import { ToastrModule } from 'ngx-toastr';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


/// Front Office
import { NavBarComponent } from './front-office/static-elements/nav-bar/nav-bar.component';
import { FooterComponent } from './front-office/static-elements/footer/footer.component';
import { FullIntroComponent } from './front-office/static-elements/full-intro/full-intro.component';
import { WelcomeComponent } from './front-office/welcome/welcome.component';
import { HowDoesItWorkComponent } from './front-office/how-does-it-work/how-does-it-work.component';
import { RequestsComponent } from './front-office/requests/requests.component';
import { AboutUsComponent } from './front-office/about-us/about-us.component';
import { ForgotPasswordComponent } from './front-office/forgot-password/forgot-password.component';

//// Back Office

// Shared
// import { BlankPageComponent } from './shared/blank-page/blank-page.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './shared/components/terms-and-conditions/terms-and-conditions.component';

import { TestPagesComponent } from './test-pages/test-pages.component';
import { VerifyEmailComponent } from './front-office/verify-email/verify-email.component';
// import { ProgressIndeterminateComponent } from './shared/components/progress-indeterminate/progress-indeterminate.component';
import { ChatModule } from './shared/components/chat/chat.module';
import { ProgressIndeterminateModule } from './shared/components/progress-indeterminate/progress-indeterminate.module';
// import { InputFileUploadListComponent } from './back-office/components/input-file-upload-list/input-file-upload-list.component';
import { SearchLocationModule } from './back-office/components/search-location/search-location.module';
import { PaymentModule } from './shared/components/payment/payment.module';
import { LabTest2Component } from './lab-test/lab-test-2/lab-test-2.component';
import { DetailService } from './shared/service/back-office/detail.service';
import { DetailModule } from './shared/components/modals/detail.module';
import { PostRequest0Component } from './front-office/post-request/post-request0.component';
// import { UserlocalstorageService } from './shared/service/localstorage/userlocalstorage.service';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { RealtimeService } from './shared/service/realtime/realtime.service';
import { ChatRealtimeService } from './shared/service/back-office/chat-realtime.service';
import { EventService } from './shared/service/event/event.service';
import { TransactionRealtimeService } from './shared/service/back-office/transaction-realtime.service';
import { UpdatePasswordComponent } from './front-office/update-password/update-password.component';
// import { DashboardCountryComponent } from './back-office/views/dashboard-country/dashboard-country.component';
import { ViewServicesComponent } from './front-office/view-services/view-services.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TrackingComponent } from './shared/components/tracking/tracking.component';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BlankPageComponent } from './shared/blank-page/blank-page.component';
import { NewPasswordComponent } from './front-office/new-password/new-password.component';
import { NotifModule } from './back-office/components/toast/notif.module';
import { ActivationComponent } from './front-office/activation/activation.component';

// firebase
import { initializeApp } from "firebase/app";
import { environment } from '../environments/environment';
import { TokenExpirationInterceptor } from './shared/service/auth/token-expiration.interceptor';
initializeApp(environment.firebase);
// end firebase

// import { ChartModule } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { ActivationEnterCodeComponent } from './front-office/activation-enter-code/activation-enter-code.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';

registerLocaleData(localeFr, 'fr');

export function setTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  exports: [TrackingComponent],
  imports: [

    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
        DetailModule,
    PaymentModule,
    NgxIntlTelInputModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TranslateModule.forRoot({ //Translate Module
			loader: {
				provide: TranslateLoader,
				useFactory: setTranslateLoader,
				deps: [ HttpClient ]
			}
		}),
    ChartsModule,
    // ChartModule,
    ChartModule,
    BrowserAnimationsModule,
    // ChatModule,
    // NgSelectModule,
    ProgressIndeterminateModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true
    }),


    // NgModule,
    AppBootStrapModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // material import
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    SearchLocationModule,
    GoogleMapsModule,
    NotifModule,
    // DetailModule,
  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    LoginComponent,
    // RegisterComponent,
    NavBarComponent,
    FooterComponent,
    FullIntroComponent,
    WelcomeComponent,
    VerifyEmailComponent,
    // LoginComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    TestPagesComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    RegisterComponent,
    HowDoesItWorkComponent,
    RequestsComponent,
    BlankPageComponent,
    LabTest2Component,
    PostRequest0Component,
    ViewServicesComponent,
    TrackingComponent,
    NewPasswordComponent,
    ActivationComponent,
    ActivationEnterCodeComponent,
    PaginationComponent,
    // ListServicesComponent,
    // MykarryComponent,
  ],
  providers: [
    {
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
  // EventService,
  // UserService, 
  // TransactionRealtimeService,
  // RealtimeService,
  // ChatRealtimeService,
  // DetailService,
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
