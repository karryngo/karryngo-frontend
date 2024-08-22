import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifComponent } from './notif.component';
// import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [NotifComponent],
    imports: [
        CommonModule,
        NgbModule
    ],
    exports: [
        NotifComponent
    ],
    bootstrap: [NotifComponent]
})
export class NotifModule { }
