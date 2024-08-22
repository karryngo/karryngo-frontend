import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-does-it-work',
  templateUrl: './how-does-it-work.component.html',
  styleUrls: ['./how-does-it-work.component.scss']
})
export class HowDoesItWorkComponent implements OnInit {
  user: any;

  constructor (private router: Router) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user-data');
    if (this.user) {
          this.router.navigate(['dashboard']);
    }
  }

}
