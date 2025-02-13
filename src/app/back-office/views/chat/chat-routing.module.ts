import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    data: {
      title: 'Chat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})
export class ChatRoutingModule {}
