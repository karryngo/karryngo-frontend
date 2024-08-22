import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  showNotification(from, align, colortype, icon, text) {
    // Differents from are 'top' and 'bottom'
    // Differents align are 'left','center' and 'right'
    // Differents color type are 'info','success','warning','danger' ...
    // Icons is type 'pe-7s-icon'

    $.notify({
      icon: icon,
      message: text
    }, {
      type: colortype,
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
