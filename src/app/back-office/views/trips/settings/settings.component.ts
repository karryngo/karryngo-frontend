import {Component, OnDestroy} from '@angular/core';
import { NotificationService } from '../../../../shared/service/notification/notification.service';

@Component({
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent {

  constructor(
    private notification: NotificationService
  ){}

  showNotification() {
    this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>This service was not available now. Tray later.')
  }
}
