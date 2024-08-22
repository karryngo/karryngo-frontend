import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Discussion, Message  } from '../../../shared/entity/chat';
import { ChatService } from '../../../shared/service/back-office/chat.service';
import { UserService } from '../../../shared/service/user/user.service';
import { generateId } from '../../../shared/entity/entity';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { ChatRealtimeService } from '../../../shared/service/back-office/chat-realtime.service';
import { Provider } from '../../../shared/entity/provider';
import { ConversationService } from '../../../shared/service/back-office/conversation.service';

declare var $: any;

export interface DiscussionItem
{
    idDiscuss?:String,
    user?:Provider,
    lastMessage?:Message,
    online?:boolean,    
}
export interface DiscussionMessage
{
    from?:Provider,
    to?:Provider,
    senderIsAuthUser?:boolean,
    message?:Message 
}

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    encapsulation:ViewEncapsulation.None
})
export class ChatComponent implements OnInit {

    discusionList:Discussion[]=[];
    userDiscussionList:DiscussionItem[]=[];
    selectedDiscussion:Observable<Discussion>=new Observable<Discussion>();
    messageToDisplay:DiscussionMessage[]=[];

    conversations: any[] = [];
    
    constructor(private chatService:ChatService,
    private userService: UserService,
    private convService: ConversationService,
    private authService:AuthService,
    private chatRTService:ChatRealtimeService) { }


    ngOnInit(): void {
        console.log(1111111111111111)

    this.chatRTService.listDiscusionSubject.subscribe((discussions:Discussion[])=>{
        this.discusionList = discussions;
                console.log(discussions)

        this.discusionList.forEach((discuss:Discussion) => {
        let d:DiscussionItem={};
        d.idDiscuss=discuss._id;
        if(discuss.inter1!=this.authService.currentUserSubject.getValue()._id) 
        {
            this.userService.getUserById(discuss.inter1).then((user:Provider)=> {
                d.user=user;
            })
        }
        else this.userService.getUserById(discuss.inter2).then((user:Provider)=> d.user=user)
        d.lastMessage=discuss.chats[discuss.chats.length-1];
        this.userDiscussionList.push(d);
        
        });
    })
    }

    findUserConversations(id: string) {
        this.convService.findUserConversations(id, {skip: 0, limit: 10}).then((result) => {
            // this.conversations.push(result.result);
            this.conversations = this.conversations.concat(result.result) 
            // [...this.conversations, ...result.result];
            console.log(result)
            console.log(this.conversations)
        }, (err)=>{
            console.log(err)
        })
    }

    selectedUserDiscuss(userDiscuss:DiscussionItem):void
    {
    //this.selectedDiscussion = this.discusionList.find((d:Discussion)=>d._id==userDiscuss.idDiscuss)
    }
    newMessage(msg:String):void
    {
        let message:Message = new Message();
        message.content=msg;
        message._id=generateId();
        message.from=this.authService.currentUserSubject.getValue()._id;
        this.selectedDiscussion.subscribe((discuss:Discussion)=>{
            if(discuss.inter1!=this.authService.currentUserSubject.getValue()._id) message.to=discuss.inter1;
            else message.to=discuss.inter2;
        });
        //Apres avoir ajouté a la liste de discussion suivante on peut mettre a jour le backend
        this.chatService.newMessage(message,"")
        // doit avoir une procédure si le message est parti ou pas
    }
    showNotification(from, align, colortype, icon, text) {

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
