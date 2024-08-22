import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')!=null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  registration() {
    this.router.navigate(['register']);
  }

  login() {
    this.router.navigate(['login']);
  }

}
