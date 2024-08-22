import { AfterContentInit, AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../shared/service/user/user.service';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { SideMenu } from '../../../_nav';
import { Discussion, Message } from '../../../shared/entity/chat';
import { ChatService } from '../../../shared/service/back-office/chat.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from '../../../shared/service/back-office/package.service';
import { Provider } from '../../../shared/entity/provider';
import { NotificationService } from '../../../shared/service/notification/notification.service';
import { ChatRealtimeService } from '../../../shared/service/back-office/chat-realtime.service';
import { Package, PackageState } from '../../../shared/entity/package';
import { DetailComponent } from '../../../shared/components/modals/detail.component';
// import { TransactionRealtimeService } from '../../../shared/service/back-office/transaction-realtime.service';
import { TransactionService } from '../../../shared/service/back-office/transaction.service';
import { AppHeaderComponent } from '@coreui/angular';
import { Transaction } from '../../../shared/entity/transaction';
import { getUiIconFromStatusPackage } from '../../../shared/utils/ui.utils';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TempsreelService } from '../../../shared/service/tempsreel/tempsreel.service';
import { UserlocalstorageService } from '../../../shared/service/localstorage/userlocalstorage.service';
import { LanguageService } from '../../../shared/service/language/language.service';
import { CreateNotificationService } from '../../../shared/service/back-office/create-notification.service';
import { Notif } from '../../../shared/entity/notif';
import { NotifType } from '../../../shared/entity/notif';
import { I } from '@angular/cdk/keycodes';
import { NotifService } from '../../../shared/service/back-office/notif.service';
// import { NotificationService } from '../../../shared/service/back-office/notification.service';

declare var $: any;
@Component({
selector: 'app-dashboard',
templateUrl: './default-layout.component.html',
styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit,AfterViewInit {

@ViewChild("modalDetail") modalDetail:DetailComponent;

@ViewChild("appHeader") header:AppHeaderComponent
public sidebarMinimized = false;
public navItems = [];
unreadMessageList: any[] = [];
unreadProjetList:{pkg:Package,transaction:Transaction,discuss:Discussion}[] =[];
waitingPackageInformation = true;
selectedPackage = null;
errorFindingPackageMessage = '';
// tslint:disable-next-line:max-line-length
public userName: String = '';
closeResult = '';

not_found = ""

// To have a current year for copirygth
year: Date = new Date();

today: number = Date.now();
selected_lang: any;
langues: { icon: string; name: string; id: string; }[] = [];
private lang_menus: any;
user: Provider;

// form activation vars
id: string = "";
    email: string = "";
    waiting_provider: boolean;
    activationForm: FormGroup;
    submitted: boolean = false;
    current_user: any;
    notifs: Notif[] = [];
    checked = false;
    

constructor (private userService: UserService,
    private authService: AuthService,
    private packageService: PackageService,
    private chatService: ChatService,
    private modalService: NgbModal, 
    private router:Router,
    private translate: TranslateService,
    private transactionService:TransactionService,
    private dashbaord:ElementRef,
    private notification: NotificationService,
    private formLog: FormBuilder,
    private temps: TempsreelService,
    private language: LanguageService,
    private local_storage_serv: UserlocalstorageService,
    private create_notification_service: CreateNotificationService,
    private notifService: NotifService,
    ) { 
        // this.listenForNotif();
    }
a: any;
ngAfterViewInit(): void {
    let parent = this.dashbaord.nativeElement.querySelectorAll(".navbar-toggler")[2];
    // console.log(parent.childNodes)
    let notifButon =this.dashbaord.nativeElement.querySelector("#notifButton");
    // parent.childNodes.forEach(element => {
    //   parent.removeChild(element);
    // });
    parent.removeChild(parent.querySelector(".navbar-toggler-icon"))
    parent.appendChild(notifButon)
    // console.log("notif",notifButon)
}

    ngOnInit(): void {
        this.temps.notification_subject.subscribe((data) => {
            console.log(data);
            this.create_notification_service.notifications.push(data)
            this.notifs = this.create_notification_service.notifications;
            let audio: HTMLAudioElement = new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');
            if (data.type == NotifType.PROVIDER) {
                this.notification.showServNotification('bottom', 'right', 'info', 'pe-7s-close-circle', '\<b><a href="javascript:void(0)" [routerLink]="[\'/my-services/historic-services\']"> '+ data.content+ '.</a>');
            }
            if (data.type == NotifType.REQUESTER) {
                this.notification.showServNotification('bottom', 'right', 'info', 'pe-7s-close-circle', '\<b><a href="javascript:void(0)" [routerLink]="[\'/carrier/service-details/' +data.service_id+ '\']"> '+ data.content+ '.</a>');
            }
            
            audio.play();
        })
        this.activationForm = this.formLog.group({
            'email': ['', [Validators.required]]
        });

        this.current_user = JSON.parse(localStorage.getItem("user"));
        // console.log(localStorage.getItem("user"))
        if(localStorage.getItem("user")==null){
            this.router.navigate(["login"]);
            return;
        }
        this.build_languages();
        this.selected_lang = this.language.getLanguage();
        this.translate.use(this.selected_lang); 
        this.get_notifications(this.current_user._id);

        

        this.get_nav_items();
        //This menu is used 
        

        this.authService.currentUserSubject.subscribe((user: Provider) => {
            this.userName = user.getSimpleName();
            this.user = user;
            // console.log(user)
        });

        // this.chatService.joinRoom(this.current_user._id); 
        // this.chatService.getUnReadDiscussion().subscribe((discuss:Discussion)=>{
        //     let pack:Package;
        //     let transaction:Transaction;
        //     let provider:Provider;
        //     this.packageService.findPackageById(discuss.idProject.toString()).then((value:Package)=>{
        //         pack=value;
        //         if(value.state==PackageState.SERVICE_IN_TRANSACTION_STATE)
        //         return this.userService.getUserById(value.idSelectedProvider)
        //         else return Promise.resolve(new Provider());
        //     })
        //     .then((value:Provider)=>{
        //         provider=value;
        //         return this.transactionService.getTransactionById(discuss.idTransaction)           
        //     })
        //     .then((value:Transaction)=>{
        //         transaction=value;
        //         this.unreadProjetList.push({
        //         pkg:pack,
        //         transaction,
        //         discuss
        //         })
        //     }).catch(err=>{
        //         // console.log(err);
        //     });
        // }, (error)=>{

        // });

        // this.chatService.listMessageUnreadSubject.subscribe((listMessage) => this.unreadMessageList = listMessage);

        // this.chatRealTimeService.getUnReadDiscussion()
        // .subscribe((disc:Discussion)=>{
        //   this.packageService.findPackageById(disc.idProject.toString())
        //   .then((value:Package)=>this.unreadProjetList.push({
        //     pkg:value,
        //     discuss:disc
        //   }))
        // })
        
        
    }
    listenForNotif() {
        this.chatService.get_notif().subscribe((message) => {
            console.log(1111111111)
            console.log(message)
            console.log(222222222222)
            // this.scrollToBottom();
            // setTimeout(() => {
            //     this.content.scrollToBottom();
            //   }, 300); // Adjust the timeout value as needed
        });
    }

get f() {
    return this.activationForm.controls;
}

get_notifications(user_id){
    this.notifService.find_by_user_id(user_id)
    .then((r) => {
        // console.log(r)
        this.notifs = r;
    }).catch((r) => {
        console.log(r)
    });
}

get_nav_items(){
    this.local_storage_serv.dataUser.subscribe((res) => {
        // console.log(res)
        this.current_user = res.user


        this.translate.get("sidemenu").subscribe(data=>{
            this.lang_menus = data;
            // console.log(data)
            // const current_user = JSON.parse(localStorage.getItem("user"));
            this.id = String(res.user._id);
            // this.email = current_user.adresse;
            // console.log("lang_menus : ", this.lang_menus); 
            this.navItems = SideMenu.getNavItems(this.lang_menus, res.user);
            // console.log( this.navItems )
        });
    })
}

toggleMinimize(e) {
    this.sidebarMinimized = e;
}
logOut() {
    this.authService.logOut();
    // this.notification.showNotification('top', 'right', 'success', '', '\<b>You\'re logged out !\</b>');
}

//This method is used to choose language
chooseLang(ev: any){
    // console.log(this.selected_lang);
    this.language.selectLanguage(this.selected_lang);
    this.translate.use(this.selected_lang); 
    this.get_nav_items();
}

//This method is used to define and set languages list
private build_languages(){
    this.langues = [
    {"icon": "flag-icon-us", "name": "English", "id":"en"},
    {"icon": "flag-icon-fr", "name": "French", "id":"fr"},
    ];
}

goToChat(idProjet:string)
{

    // this.router.navigate([`/package_infos`,idProjet]);
}

open(content, message: Message) {
    // console.log("Open modal")
    // this.chatService.markAsRead(message._id,message.idDiscussion)
    // .then((result)=>{
    this.packageService.findPackageById(this.chatService.getLocalDiscutionById(message.idDiscussion).idProject)
    .then((r) => {
        this.waitingPackageInformation = false;
        this.selectedPackage = r;
    }).catch((r) => {
        this.waitingPackageInformation = false;
        this.errorFindingPackageMessage = 'Cannot retrieved informations';
    });
    // })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
    } else {
    return `with: ${reason}`;
    }
}

showModal(pkg)
{
    // console.log("Click here")
    this.modalDetail.show(pkg)
}

showStatutPackage(infos:{pkg:Package,transaction:Transaction,provider:Provider})
{
    return getUiIconFromStatusPackage(infos.pkg,infos.transaction)
}
acceptPrice() {
    // this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>This service was not available now. Tray later.')

}
showMessage()
{
    // this.header.s
}


    // onSubmit() {
    //     this.submitted = true;
    //     if (this.activationForm.invalid) {
    //         return;
    //     }
    //         this.authService.activate(this.email, this.id, Number(this.activationForm.controls.code.value) )
    //             .then((result) => {
    //                 console.log(result);
    //                 this.notification.showNotification('top', 'right', 'success', '', '\<b>Your account has been activated.');
    //                 this.submitted = false;
    //                 this.activationForm.reset()
    //                 let element: HTMLElement = document.getElementsByClassName('dis')[0] as HTMLElement;
    //                 element.click();
    //                 this.router.navigate(['mykarryngo']);
    //             })
    //             .catch((error) => {
    //                 console.log("Error: ",error)
    //                 let element: HTMLElement = document.getElementsByClassName('dis')[0] as HTMLElement;
    //                 element.click();
    //                 this.activationForm.reset();
    //                 if (error.resultCode && error.resultCode == -1) {
    //                     this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>there was a problem, check your code and try again.');
    //                     this.submitted = false;
    //                 } else {
    //                     console.log('error 2: ' + error);
    //                     this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
    //                     this.submitted = false;

    //                 }
    //             });
    // }


    // activation_email(){
    //     console.log(this.current_user)
    //     this.authService.activation_email(this.user.adresse.email )
    //     .then((result) => {
    //         console.log(result);
    //         this.notification.showNotification('top', 'right', 'success', '', '\<b>Code Sent !');
    //         this.submitted = false;
    //         this.activationForm.reset()
    //         let element: HTMLElement = document.getElementsByClassName('email')[0] as HTMLElement;
    //         element.click();
    //         this.router.navigate(['mykarryngo']);
    //     })
    //     .catch((error) => {
    //         console.log("Error: ",error)
    //         let element: HTMLElement = document.getElementsByClassName('email')[0] as HTMLElement;
    //         element.click();
    //         this.activationForm.reset();
    //         if (error.resultCode && error.resultCode == -1) {
    //             this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>there was a problem, try again later.');
    //             // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
    //             this.submitted = false;
    //         } else {
    //             console.log('error 2: ' + error);
    //             this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
    //             this.submitted = false;

    //         }
    //     });
    // }

    activation_email(){
        // console.log(this.activationForm.controls.email.value)
        this.submitted = true;
        // stop here if form is invalid
        if (this.activationForm.invalid) {
            return;
        }
        this.authService.activation_email(this.activationForm.controls.email.value)
        .then((result) => {
            console.log(result);
            this.notification.showNotification('top', 'right', 'success', '', '\<b>Link Sent ! Please check your inbox');
            this.submitted = false;
            this.activationForm.reset()
            let element: HTMLElement = document.getElementsByClassName('dis')[0] as HTMLElement;
            element.click();
        })
        .catch((error) => {
            console.log("Error: ",error)
            // let element: HTMLElement = document.getElementsByClassName('email')[0] as HTMLElement;
            // element.click();
            // this.activationForm.reset();
            if (error.resultCode && error.resultCode == -1) {
                this.not_found = "No account found with the provided email address"
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>there was a problem, try again later.');
                // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                // this.submitted = false;
            } else {
                console.log('error 2: ' + error);
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry !\</b>\<br>The server is temporarily unavailable, please try again later.');
                // this.submitted = false;

            }
        });
    }

}
