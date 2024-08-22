import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ServiceOfProvider, Provider } from '../../../../shared/entity/provider';

@Component({
    selector: 'app-how-provider-infos',
    templateUrl: './how-provider-infos.component.html',
    styleUrls: ['./how-provider-infos.component.css']
})
export class HowProviderInfosComponent implements OnInit {
    @Input() provider: any;
    @Input() offer: any;
    userProfileImg = '../../../assets/img/user_image.jpg';
    
    constructor(private bsModalRef:BsModalRef) { }

    ngOnInit(): void {
    }

    cancelModel()
    {
        this.bsModalRef.hide();
    }

}
