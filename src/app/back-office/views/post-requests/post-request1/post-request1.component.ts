import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-request1',
  templateUrl: './post-request1.component.html',
  styleUrls: ['./post-request1.component.scss']
})
export class PostRequest1Component implements OnInit {

  title = 'Select the type of request you need';
  post = 2;

  constructor() { }

  ngOnInit() {
  }

  initTitle() {
    if (this.post === 1) {
      this.title = 'Select the type of request you need';
    } else {
      this.title = 'Register a trip';
    }
  }
}
