import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastService } from '../../../shared/service/back-office/toast.service';
// import { ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
    selector: 'app-notif',
    templateUrl: './notif.component.html',
    styleUrls: ['./notif.component.scss'],
    host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class NotifComponent implements OnInit {

    constructor(public toastService: ToastService) {}

    ngOnInit(): void {
    }
    showStandard() {
        this.toastService.show('I am a standard toast');
    }

    showSuccess() {
        this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
    }

    showDanger(dangerTpl) {
        this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
    }

    ngOnDestroy(): void {
        this.toastService.clear();
    }

    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
