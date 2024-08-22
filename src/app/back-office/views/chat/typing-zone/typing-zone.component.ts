import { ChatService } from './../../../../shared/service/back-office/chat.service';
import { Provider } from './../../../../shared/entity/provider';
import { Discussion } from './../../../../shared/entity/chat';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-typing-zone',
  templateUrl: './typing-zone.component.html',
  styleUrls: ['./typing-zone.component.css']
})
export class TypingZoneComponent implements OnInit {

  @Input() discuss: any;
  @Output() sendNewMessage:EventEmitter<String>=new EventEmitter<String>();
  @Output() sendInfoPackage:EventEmitter<String>=new EventEmitter<String>();
  @Output() payPackage:EventEmitter<String>=new EventEmitter<String>();
  formInput:FormControl=new FormControl("",[Validators.required,Validators.minLength(1)]);
  is_provider: boolean;
  keyTranslated: any = "";
  
  constructor(
    private readonly translateService: TranslateService
  ) { }

  ngOnInit(): void {

    this.keyTranslated = this.translateService.instant('chat.typing_zone.type_message');
    if(localStorage.getItem("user")!=null){
      const user: Provider = JSON.parse(localStorage.getItem("user"));
      // this.is_provider = user._id == this.discuss._id;
      // console.log(this.discuss);
      // console.log(this.is_provider);
    }    
  }
  
  sendMessage():void
  {
    // console.log("Input  ",this.formInput.value)
    if(!this.formInput.valid) return;
    this.sendNewMessage.emit(this.formInput.value);
    this.formInput.setValue("");
  }

  //This method is used to send info service
  sendInfoService(){
    this.sendInfoPackage.emit();
  }
  
  //This method is used to perform payment
  sendPayment(){
    this.payPackage.emit();
  }
}
