
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

declare var $: any;

@Component({
  
  selector: 'm-costomers',
  templateUrl: 'm-costomers.component.html',
  styleUrls: ['m-costomers.component.scss'],
})

export class MCostomersComponent {


  @ViewChild('services') public services: ModalDirective;
  @ViewChild('details') public details: ModalDirective;

  constructor() { }

  showNotification(from, align, colortype, icon, text) {

    $.notify({
      icon: icon,
      message: text
    }, {
      type: colortype,
      timer: 300,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
