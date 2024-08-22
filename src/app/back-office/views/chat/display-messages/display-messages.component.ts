import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { DiscussionMessage } from '../chat/chat.component';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html',
  styleUrls: ['./display-messages.component.css']
})
export class DisplayMessagesComponent implements OnInit {

  @Input() discussFils:DiscussionMessage[]=[];
  @ViewChildren("messageContainer") messageContainers: QueryList<ElementRef>;
  @ViewChild('window') window;
  
  constructor() { }

  ngOnInit(): void {
  }

  // //Scroll to bottom
  // scrollToBottom() {
  //   try {
  //     console.log('scrollToBottom called', this.window);
  //     // this.window.nativeElement.top = this.window.nativeElement.scrollHeight;
  //     // this.window.nativeElement.scrollTop = this.window.nativeElement.scrollHeight;
  //     this.window.nativeElement.scroll({
  //       top: this.window.nativeElement.scrollHeight,
  //       behavior: 'smooth'
  //     });
  //     // this.window.scrollIntoView();
  //   } catch (err) {}
  // }

  // ngAfterViewInit() {
  //   setTimeout(() => {      
  //     this.scrollToBottom(); // For messsages already present
  //     this.messageContainers.changes.subscribe((list: QueryList<ElementRef>) => {
  //       this.scrollToBottom(); // For messages added later
  //     });
  //   }, 1000);
  // }

}
