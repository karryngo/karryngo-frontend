import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
    {
        path: '',
        component: ConversationComponent,
        data: {
            title: 'Notifications'
        },
    }
];

@NgModule({
    declarations: [ConversationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSelectModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ConversationModule { }
