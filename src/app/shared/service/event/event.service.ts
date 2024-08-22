import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Provider } from '../../entity/provider';
import { RealTimeMessage } from '../realtime/realtime-protocole';

@Injectable(
  {
    providedIn:"root"
  }
)
export class EventService {
  loginEvent = new BehaviorSubject<boolean>(false)
  loginRealtimeEvent = new BehaviorSubject<boolean>(false);
  findPackageEvent = new BehaviorSubject<string>("");
  findTransactionEvent = new BehaviorSubject<{idTransaction?:string,idProjet?:string}>({});
  logoutEvent = new BehaviorSubject<boolean>(false);
  reloadEvent = new BehaviorSubject<boolean>(false);
  newMessageEvent = new BehaviorSubject<RealTimeMessage>(null)

  constructor()
  {
    // console.log(performance.getEntriesByType("navigation"))
  }
}
