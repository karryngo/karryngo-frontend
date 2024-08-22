import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
    {
        path: '',
        component: NotificationComponent,
        data: {
            title: 'Notifications'
        },
    }
];


@NgModule({
    declarations: [
        NotificationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSelectModule,
        TranslateModule,
        ReactiveFormsModule
    ]
})
export class NotificationModule { }
