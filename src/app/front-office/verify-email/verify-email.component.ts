import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
// import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  user: any;
  constructor(
    // public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user-data');
    if (this.user) {
        this.router.navigate(['dashboard']);
    }
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  sendVerifMail(){
    // this.authService.SendVerificationMail();
  }
}

