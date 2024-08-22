import { Component } from '@angular/core';

declare var $: any;

@Component({
    selector: 'm-providers',
    templateUrl: 'm-providers.component.html',
    styleUrls: ['m-providers.component.scss']
})
export class MProvidersComponent {

    constructor() { }


    showNotification(from, align, colortype, icon, text) {
        $.notify({ icon: icon,  message: text }, {
            type: colortype,
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
    }

    //Handle events
    handleEvents(ev: any){
        console.log(ev);
        this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>This service was not available for '+ev+'. Try later.')
    }
}