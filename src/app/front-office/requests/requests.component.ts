import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  user: any;

  constructor (private router: Router) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user-data');
    if (this.user) {
          this.router.navigate(['dashboard']);
    }
  }

}
