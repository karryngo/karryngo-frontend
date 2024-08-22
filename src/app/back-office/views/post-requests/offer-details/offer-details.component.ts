import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-offer-details',
    templateUrl: './offer-details.component.html',
    styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

    @Input() provider:any;
    @Input() service:any;
    // @Input() provider:Provider;
    // @Input() service:ServiceOfProvider;

    userProfileImg = '../../../assets/img/user_image.jpg';

    constructor(private bsModalRef:BsModalRef) { }

    ngOnInit(): void {
    }

    cancelModel()
    {

        this.bsModalRef.hide();

    }


}
