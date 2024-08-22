import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'app/shared/services/auth.service';
// import { UserService } from 'app/shared/services/user.service';
// import { User } from 'app/shared/services/user';


declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // user: any[];
  // users: any[];

  firstName: string = "Flambel";
  lastName: string = "SANOU";
  name = this.firstName + " " + this.lastName;
  userAddress: string = "Mandja";
  userCity: string = "Bangangte";
  userCountry: string = "Cameroon";
  userZip: string = "0000";
  userPhone: string = "(+237) 691 224 472";
  userCoverImg: string = "assets/img/userCoverImg1.png";
  userProfileImg: string = "assets/img/faces/face-0.jpg";
  userName: string = "Flambel55";
  userEmail: string = "flambel55@gmail.com";
  userLabel: string = "if we are satisfied with our present, we have no future.";

  message: string = "\<b>Error\</b>\<br>Someone was not going. This option is not available.";

  constructor(
    // private userService: UserService,
    // public authService: AuthService,
    public router: Router,
    public ngZone: NgZone) {
    // this.user["name"] = `${this.userService.user.firstName} ${this.userService.user.lastName}`;

  }

  ngOnInit() {
    // this.users = [this.userService.user];
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
