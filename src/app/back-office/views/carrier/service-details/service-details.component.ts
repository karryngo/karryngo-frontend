import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionServiceState } from '../../../../shared/entity/transaction';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { CreateColisPackageService } from '../../../../shared/service/back-office/create-package.service';
import { PackageService } from '../../../../shared/service/back-office/package.service';
import { TransactionService } from '../../../../shared/service/back-office/transaction.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { ConversationService } from '../../../../shared/service/back-office/conversation.service';
import { ChatService } from '../../../../shared/service/back-office/chat.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { TempsreelService } from '../../../../shared/service/tempsreel/tempsreel.service';
import { FcmService } from '../../../../shared/service/fcm/fcm.service';
import { CommentService } from '../../../../shared/service/back-office/comment.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

export interface Comment {
    _id?: string;
    rating: number;
    text: string;
    userId?: string;
    raterUserId?: string;
    serviceId?: string;
    created_at?: string;
    updated_at?: string;
}

@Component({
    selector: 'app-service-details',
    templateUrl: './service-details.component.html',
    styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {

    @ViewChild('mismiss') modalDismiss: ElementRef;
    @ViewChild('startService') startService: any;
    @ViewChild('serviceCompleted') serviceCompleted: any;
    
    service: any;
    requester: any;
    currentUser: any = null;
    current_user: any = null;
    accepted = false;
    submited = false;
    // transaction_init: boolean = false;
    service_state = TransactionServiceState;
    code: number = 0;

    // Chat
    conversation : any;
    contition: any = {
        conversation_id: "",
        skip: 0,
        limit: 10
    }
    messages: any[] = [];
    room: string = '';
    newMessage: string = '';

    // Comments
    // comment
    comment: Comment= {
        rating: 0,
        text: '',
    };
    comments: Comment[] = [];

    fileUrl: string = environment.filesUrl;
    defaultImg: string = "assets/imgs/default-avatar.jpg";
    processing: boolean = false;

    constructor(
        private packageService: PackageService,
        private route: ActivatedRoute,
        private notification: NotificationService,
        private packageCreation:CreateColisPackageService,
        private transactionService:TransactionService,
        private authService:AuthService,
        private router:Router,
        private modalService: NgbModal,
        private convService: ConversationService,
        private chatService: ChatService,
        private userServ: UserService,
        private temps: TempsreelService,
        private translate: TranslateService,
        private fcmService: FcmService,
        private commentService: CommentService
    ) { 
        this.temps.service_subject.subscribe((service) => {
            console.log(service);
            this.service = service;
        })
        this.fcmService.serviceIdSubject.subscribe((service_id) => {
            console.log(service_id);
            if(service_id==this.route.snapshot.paramMap.get('service_id')) this.initComponent();
        })
        
    }

    ngOnInit(): void {
        this.authService.currentUserSubject.subscribe((user:any)=>{
            this.currentUser=user;
            this.current_user=user;
        })
        this.initComponent();
        this.listenForMessages();
    }
    initComponent(){
        this.find_package_service_byid();
        
        
    }

    ngOnDestroy(): void{
        this.modalService.dismissAll();
    }

    find_package_service_byid()
    {
        
        this.packageService.getOnePackagesById(this.route.snapshot.paramMap.get('service_id'))
        .then((result:any)=>{
            // this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('service_details.service_details_created'))
            console.log(111111111111111111111)
            console.log(this.conversation)
            console.log(result);
            this.service = result.result ;
            this.userServ.getUserById(result.result.idRequester).then((data) => {  this.requester = data; });

            if ((result.result.state!=this.service_state.service_init_STATE)&&(result.result.state!=this.service_state.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT)) {
                this.convService.findServiceConversation(this.service._id).then((res)=>{
                    this.getConversation(this.service._id);
                })
            }
            if (result.result.state==this.service_state.SERVICE_END) {
                this.find_comment_by_service_id(this.service._id);
            }
            
        }).catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        });
    }

    // Chat
    getConversation(service_id){
        this.convService.findServiceConversation(service_id).then((res)=>{
            this.conversation = res.result[0]
            console.log(111111111111111111111)
            console.log(res.result[0])
            console.log(222222222222222222222)
            this.contition.conversation_id = this.conversation._id
            this.get_conversation_messages();
            this.room = service_id;
            this.chatService.joinRoom(this.room);
        }).catch((err)=>{
            console.log(err)
        })
    }
    get_conversation_messages(){
        this.convService.get_conversation_messages(this.contition).then((res)=>{
            console.log(res.result)
            this.messages = res.result.reverse();
        })
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
    listenForMessages() {
        this.chatService.getMessages().subscribe((message) => {
            this.messages.push(message);
        });
    }




    confirm_request(){
        this.submited = true;
        console.log(this.service)
        this.transactionService.createTransaction(
              this.currentUser._id,
              this.service.idRequester,
              this.service._id,
              this.currentUser._id) 
          .then((result)=>{
            this.modalDismiss.nativeElement.click();
            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('service_details.service_details_notified'))
            // this.accepted = true;
            // window.location.reload();
            // this.router.navigate(['./carrier/service-details/'+this.service._id]);
            this.submited = false;
            this.initComponent();
          }).catch((error)=>{
            this.submited = false;
            console.error("Error Transaction ",error)
            if(error && error.hasOwnProperty('resultCode')) this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+error.message)
            else this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br> '+this.translate.instant('service_details.server_error'))
          })
    }

    transaction_init(){
        for(let serv of this.service.transactions)
            {
                if (serv.idProvider == this.currentUser._id) 
                    return true;
            }
    }

    
    ask_start_service(){
        this.modalService.open(this.startService);
    }
    ask_complete_service(){
        this.modalService.open(this.serviceCompleted);
    }

    start_service(){
        this.submited = true;
        console.log(this.service)
        var data = {state: TransactionServiceState.SERVICE_RUNNING, id_transaction: this.service.idSelectedTransaction}
        this.transactionService.start_service(data) 
        .then((result)=>{
            this.modalService.dismissAll();
            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('service_details.started'))
            this.initComponent();
            this.submited = false;
        }).catch((error)=>{
            this.submited = false;
          console.error("Error Transaction ",error)
          if(error && error.hasOwnProperty('resultCode')) this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+error.message)
          else this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br> '+this.translate.instant('service_details.server_error'))
        })
    }

    service_completed(){
        this.submited = true;
        console.log(this.code)
        var data = {
            state: TransactionServiceState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT, 
            id_transaction: this.service.idSelectedTransaction,
            id_service: this.service._id,
            code: this.code
        } 
        this.transactionService.service_completed(data) 
        .then((result)=>{
            this.modalService.dismissAll();
            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('service_details.will_pay'))
            // window.location.reload();
            this.initComponent();
        }).catch((error)=>{
            this.submited = false;
            console.error("Error Transaction ",error)
            if(error && error.hasOwnProperty('resultCode')) this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+error.message)
            else if(error.error.resultCode-1) {
                this.modalService.dismissAll();
                this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br> ' + error.error.message)
            }
        })
    }


    // Comment
    getStarTitle(star: number): string {
        switch (star) {
            case 1:
                return 'Bad';
            case 2:
                return 'Poor';
            case 3:
                return 'OK';
            case 4:
                return 'Good';
            case 5:
                return 'Excellent';
            default:
                return '';
        }
    }
    onRatingChange(rating: number): void {
        console.log(rating)
        this.comment.rating = rating;
    }

    validComment(){
        return this.comment.rating==0 || this.comment.text.trim()==="";
    }
    
    onSend(): void {
        // Assuming you have a CommentService
        this.processing = true;
        console.log(this.comment)
        this.comment.serviceId = this.service._id;
        this.comment.userId = this.service.idRequester;
        this.comment.raterUserId = this.service.idSelectedProvider;
        this.commentService.postComment(this.comment).subscribe(
            (response) => {
                console.log('Comment posted successfully', response);
                this.initComponent();
                this.processing = false;
            },
            (error) => {
                this.processing = false;
                console.error('Error posting comment', error);
                // Handle error as needed
            }
        );
    }

    find_comment_by_service_id(serviceId: string){
        this.commentService.find_by_service_id(serviceId).subscribe((res)=>{
            console.log(res.result)
            this.comments = res.result;
            this.messages = res.result.reverse();
        })
    }

    findCommentByUserId(userId: string): Comment | undefined {
        return this.comments.find(comment => comment.userId === userId);
    }

}
