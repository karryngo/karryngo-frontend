import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-request0',
  templateUrl: './post-request0.component.html',
  styleUrls: ['./post-request0.component.scss']
})
export class PostRequest0Component implements OnInit {

  title = 'Select the type of request you need';
  post = 2;
  private closeResult: string;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  initTitle() {
    if (this.post === 1) {
      this.title = 'Select the type of request you need';
    } else {
      this.title = 'Register a trip';
    }
  }

  openModal(content){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
