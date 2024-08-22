import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../../shared/service/back-office/conversation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { Provider } from '../../../shared/entity/provider';
import { ChatService } from '../../../shared/service/back-office/chat.service';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../shared/service/user/user.service';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

    
    conversations: any[] = [];
    current_user: Provider;
    contact: Provider;
    conversation: any;
    contition: any = {
        conversation_id: "",
        skip: 0,
        limit: 10
    }
    messages: any[] = [];
    newMessage: string = '';
    room: string = '';
    fileUrl: string = environment.filesUrl

    constructor(private convService: ConversationService, private router: Router, private authService: AuthService, private chatService: ChatService, private userServ: UserService,) { 
        this.listenForMessages();
    }

    ngOnInit(): void {
        
        this.authService.currentUserSubject.subscribe((user: Provider) => {
            this.current_user = user;
            // console.log(2222222222222222)
            // console.log(this.current_user)
            // console.log(this.current_user.firstname)
        });
        this.findUserConversations(this.current_user._id)
    }

    findUserConversations(id: String) {
        
        this.convService.findUserConversations(id, {skip: 0, limit: 10}).then((result) => {
            // this.conversations.push(result.result);
            this.conversations = this.conversations.concat(result.result) 
            // [...this.conversations, ...result.result];
            console.log(result)
            console.log(11111111111111111111111111)
            console.log(this.conversations)
        }, (err)=>{
            console.log(err)
        })
    }

    navigateToConversation(service_id: string): void {
        this.router.navigate(['/chat-details/', service_id]);
        // this.navCtrl.navigateForward(`/app/tabs/ccount/chat-details/${service_id}`);
    }

    getContactId(valuesArray, id): string | undefined {
        return valuesArray.find(value => value != id);
    }

    getConversation(service_id){
        this.contact = null
        this.convService.findServiceConversation(service_id).then((res)=>{
            this.conversation = res.result[0]
            console.log(this.conversation.users)
            var id = this.getContactId(this.conversation?.users, this.current_user._id)
            // if(this.conversation && this.conversation?.users[0])
            if (id){
                this.userServ.getUserById(id).then((data) => { 
                    // console.log(111111111111111111111111)
                    // console.log(id);
                    // console.log(this.current_user._id);
                    // console.log(data);
                    // console.log(2222222222222222222222)
                    this.contact = data;
                    // this.localStorageService.setUserData({
                    //     isLoggedIn: true,
                    //     user: data
                    // });
                    // this.router.navigate(['mykarryngo']);
                    // this.toastr.success('You have been successfully logged In!');
                    // this.eventService.loginEvent.next(true);
                    // resolve(response);
                    });
            }
            this.contition.conversation_id = this.conversation._id
            this.get_conversation_messages();
            this.room = service_id;
            this.joinRoom();
        }).catch((err)=>{
            console.log(err)
        })
    }

    get_conversation_messages(){
        
        this.convService.get_conversation_messages(this.contition).then((res)=>{
            // console.log(res.result)
            this.messages = res.result.reverse();
        })
    }

    joinRoom() {
        this.chatService.joinRoom(this.room);
    }


    listenForMessages() {
        this.chatService.getMessages().subscribe((message) => {
            console.log(1111111111)
            console.log(message)
            console.log(222222222222)
            this.messages.push(message);
            // this.scrollToBottom();
            // setTimeout(() => {
            //     this.content.scrollToBottom();
            //   }, 300); // Adjust the timeout value as needed
        });
    }

    sendMessage() 
    {
        // console.log(this.newMessage)
        if (this.newMessage.trim() !== '') {
            const data = {
                room: this.room,
                message: {
                    message: this.newMessage,
                    conversation_id: this.conversation._id,
                    user_id: this.current_user._id,
                }
            };
            console.log(data)
            this.chatService.sendMessage(data);
            this.newMessage = '';
        }
    }

    sendTypingNotification(typing: boolean) {
        const data = {
            room: this.room,
            typing: typing,
        };
        this.chatService.sendTypingNotification(data);
    }

}
