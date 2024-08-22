import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CProvidersComponent } from './c-providers.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule, WavesModule, ModalModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
    CProvidersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AlertModule.forRoot(),
        TranslateModule,
        WavesModule,
        IconsModule,
        ModalModule.forRoot(),
        RouterModule
    ],
    exports: [CProvidersComponent]
})
export class CProvidersModule { }
