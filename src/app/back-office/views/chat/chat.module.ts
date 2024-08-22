import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { ChatComponent } from './chat/chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ReceivedMessageComponent } from './received-message/received-message.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { TypingZoneComponent } from './typing-zone/typing-zone.component';
import { ListUserMessageComponent } from './list-user-message/list-user-message.component';
import { ItemUserMessageComponent } from './item-user-message/item-user-message.component';
import { CommonModule } from '@angular/common';
import { DisplayMessagesComponent } from './display-messages/display-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    ChatRoutingModule,
    ChartsModule,
    CommonModule,
    NgxIntlTelInputModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [ ChatComponent, ReceivedMessageComponent, SendMessageComponent, TypingZoneComponent, ListUserMessageComponent, ItemUserMessageComponent, DisplayMessagesComponent ]
})
export class ChatModule { }
