import { Component, OnInit, Input } from '@angular/core';
import { DiscussionMessage } from '../chat/chat.component';

export function parseDateToGoodFormat(dateString)
{
  let date = new Date(dateString);
  let dateOutput = "";
  if(date.toLocaleDateString()== new Date().toLocaleDateString()) dateOutput="Today ";
  else if(date.getFullYear()==new Date().getFullYear() && date.getMonth()==new Date().getFullYear() && date.getDay() ==  new Date().getDay()-1) dateOutput="Yesterday ";
  // else if(date.getDay() - (new Date().getDay())<7) dateOutput = `${date.getDay() - (new Date().getDay())} Days ago`
  else dateOutput = date.toLocaleDateString();

  dateOutput += ` At ${date.toLocaleTimeString().split(":")[0]}H:${date.toLocaleTimeString().split(":")[1]}Min`;
  return dateOutput;
}


@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  @Input() message:DiscussionMessage;
  constructor() { }

  ngOnInit(): void {
  }
  parseDate(date)
  {
    return parseDateToGoodFormat(date)
  }
}
