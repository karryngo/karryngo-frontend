import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider } from '../../../../shared/entity/provider';
import { User } from '../../../../shared/entity/user';

@Component({
  selector: 'app-item-user-message',
  templateUrl: './item-user-message.component.html',
  styleUrls: ['./item-user-message.component.css']
})
export class ItemUserMessageComponent implements OnInit {
  @Input() idDiscuss:String;
  @Input() img: String;
  @Input() user:Provider=new Provider();
  @Input() online:boolean=false;
  @Input() date: string;
  @Input() service: string;
  @Input() active:boolean=false;
  @Output() selected:EventEmitter<String>=new EventEmitter<String>();
  lang: string = localStorage.getItem('karry_lang') !== null ? localStorage.getItem('karry_lang'): 'en';

  constructor() { }

  ngOnInit(): void {

  }

  selectUser()
  {
    this.selected.emit(this.idDiscuss);
  }
}
