// background-communication.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackgroundCommunicationService {
  private backgroundMessageSubject = new Subject<any>();

  // Observable for listening to background messages
  backgroundMessage$ = this.backgroundMessageSubject.asObservable();

  constructor() {
    // Call your method to listen to background messages here
    this.setupServiceWorkerCommunication();
    console.log(22222222222)
  }

  private setupServiceWorkerCommunication() {
    if ('serviceWorker' in navigator) {
      console.log("loading Service Worker: ");
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log("event: ", event);
        const message = event.data;
        if (message.type === 'onBackgroundMessage') {
          this.backgroundMessageSubject.next(message.payload);
        }
      });
    }
  }

  // Method to send a message to the background
  sendMessageToBackground(payload: any) {
    // You can modify this method if needed
    // For example, if you need to send messages to a specific client or clients
    // instead of broadcasting to all clients
    (self as any).clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      if (clients && clients.length) {
        clients.forEach((client) => {
          client.postMessage({
            type: 'fromService',
            payload: payload,
          });
        });
      }
    });
  }
}
