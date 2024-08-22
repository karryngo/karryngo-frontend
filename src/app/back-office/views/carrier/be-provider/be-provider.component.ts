// import { ENTER, COMMA } from '@angular/cdk/keycodes';
// import { ElementRef, OnInit, TemplateRef } from '@angular/core';
// import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {MatChipInputEvent} from '@angular/material/chips';
// import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
// import { Router } from '@angular/router';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';
// import { Address, Provider, ServiceOfProvider, Zone } from '../../../../shared/entity/provider';
// import { ProviderService } from '../../../../shared/service/back-office/provider.service';
// import { ZoneService } from '../../../../shared/service/zone/zone.service';
// import {MatDialog} from '@angular/material';

// declare var $: any;

@Component({
  templateUrl: 'be-provider.component.html',
  
  styleUrls: ['be-provider.component.scss']
})
export class BeProviderComponent {
  
  user: any;

  constructor(private router: Router) {

      if(localStorage.getItem("user")!=null){
        // this.router.navigate(["/carrier/be-provider-form"]);

        this.user = JSON.parse(localStorage.getItem("user"));
        if(this.user.isProvider && this.user.isAcceptedProvider){
          this.router.navigate(["/carrier/be-carrier"]);
        }else if(this.user.isProvider && !this.user.isAcceptedProvider){
          this.router.navigate(["/carrier/wait-acceptance"]);
        }else{
          this.router.navigate(["/carrier/be-provider-form"]);
        }
        // console.log("Is exist");
      }else{
        // console.log("another");
      }
  }
  
}
  