import { RealtimeService } from './../../../../shared/service/realtime/realtime.service';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from './../../../../shared/service/back-office/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionState } from './../../../../shared/service/payment/payment.service';
import { PackageService } from './../../../../shared/service/back-office/package.service';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs';
// import { combineAll } from 'rxjs/operators';
import { Discussion, Message } from '../../../../shared/entity/chat';
import { generateId } from '../../../../shared/entity/entity';
import { Provider } from '../../../../shared/entity/provider';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { ChatRealtimeService } from '../../../../shared/service/back-office/chat-realtime.service';
import { ChatService } from '../../../../shared/service/back-office/chat.service';
import { UserService } from '../../../../shared/service/user/user.service';
import * as moment from 'moment';
// import { Package } from '../../../../shared/entity/package';
import { PaymentService } from '../../../../shared/service/payment/payment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../../../../shared/entity/transaction';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

declare var $: any;

export interface DiscussionItem
{
  idDiscuss?:String,
  user?:Provider,
  lastMessage?:Message,
  online?:boolean, 
  date?:string,
  service?:string   
}
export interface DiscussionMessage
{
  from?:Provider,
  to?:Provider,
  senderIsAuthUser?:boolean,
  message?:Message 
}

export interface TransactionMessage
{
  _id?: { _id: string },
	idProvider?: string,
	idRequester?: string,
	price?: number,
	completed?: boolean,
	refID?: string,
	state?: string
}

enum MethodPaymentState {
  bank = 'bank',
  mtn = 'mtn',
  orange = 'orange',
  credit_card = 'credit_cart'
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('contentMethod') content: any;
  @ViewChild('contentPrice') contentPrice: any;
  @ViewChild('contentLoader') contentLoader: any;
  @ViewChild('window') window;
  

  discusionList:Discussion[]=[];
  userDiscussionList:DiscussionItem[]=[];
  selectedDiscussion:BehaviorSubject<Discussion>=new BehaviorSubject<Discussion>(null);
  messageToDisplay:DiscussionMessage[]=[];
  selectedUser: Provider;
  is_pending: boolean;
  private limit: number = 10;
  selectedDisc: Discussion;
  paymentMethods: any[] = [];
  private objTransaction: any;
  obj_spinner: boolean = false;
  new_price: number = 0;
  provider: Provider;
  is_running: boolean;
  currentUser: Provider;

  separateDialCode: boolean = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Cameroon, CountryISO.CentralAfricanRepublic, CountryISO.SouthAfrica];
  mm_phone: any;
  selectedPaymentMethod: string;
  current_transaction: TransactionMessage;
  private id_service: string;
  
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private packageServ: PackageService,
    private paymentServ: PaymentService,
    private trServ: TransactionService,
    private modalService: NgbModal, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private chatRTService: RealtimeService
    ) { }


  ngOnInit(): void {

    this.currentUser = this.authService.currentUserSubject.getValue();
    this.chatService.listDiscusion = [];
    this.id_service = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.chatService.getDiscutionList().then((result) => {
            
      this.chatService.emitDiscussion();
      // this.emitUnReadMessage();
    }).catch(err=>{
      console.log(err);
    });

    this.initializeViewChat();
    this.buildPaymentMethod();

    //Handle receiving message from socket IO
    this.updateViewToDisplayMsg();
  }

  /**
   * This method is used to initialize chat view
   */
  initializeViewChat(){
    this.chatService.listDiscusionSubject.subscribe((discussions:Discussion[])=>{
       
      console.log(discussions);
      this.discusionList = [];
      this.discusionList = discussions;
      this.userDiscussionList = new Array();

      // console.log("Discussions => ",this.discusionList);
      this.discusionList.forEach(async (discuss:Discussion) => {
        let d : DiscussionItem = {}; 
        d.idDiscuss=discuss._id;
        let current_user: any;
        // console.log(this.authService.currentUserSubject.getValue()._id);
        if(discuss.inter1!=this.authService.currentUserSubject.getValue()._id) 
          current_user = discuss.inter1;
        else
          current_user = discuss.inter2;

        try {            
          const user: Provider = await this.userService.getUserById(current_user);
          // console.log(user);
          d.user = user;
          d.lastMessage = new Message();
          d.date = discuss.date;
          d.service = discuss.service;
          this.userDiscussionList.push(d); 

          //Auto Select discussion
          if(this.id_service!==null) this.handleChatForService(this.id_service, d, discuss);

        } catch (error) {
          // console.log("Error chat =>",error);
        }
      });
      
      // this.userDiscussionList.sort((elt1, elt2) => new Date(elt1.date).getTime() - new Date(elt2.date).getTime());


    }, (err)=>{
      console.log(err);
    });
  }

  // ngAfterViewInit() {
  //   this.scrollToBottom(); // For messsages already present
  //   this.messageContainers.changes.subscribe((list: QueryList<ElementRef>) => {
  //     this.scrollToBottom(); // For messages added later
  //   });
  // }

  
  //Scroll to bottom
  scrollToBottom() {
    try {
      setTimeout(() => {
        console.log('scrollToBottom called', this.window);
        this.window.nativeElement.top = this.window.nativeElement.scrollHeight;
        this.window.nativeElement.scrollTop = this.window.nativeElement.scrollHeight;
      }, 100);

      // this.window.nativeElement.scroll({
      //   top: this.window.nativeElement.scrollHeight,
      //   behavior: 'smooth'
      // });
      // this.window.scrollIntoView();
    } catch (err) {}
  }

  /**
   * This method is used to handle discussion
   * based on Service Id
   * @param id_service string, idService
   */
  handleChatForService(id_service, userDiscuss: DiscussionItem, discuss: Discussion){

    if(id_service!=discuss.idProject)
      return;

    this.selectedUser = userDiscuss.user;
    this.selectedUserDiscuss(userDiscuss);
  }

  //This method is used to get list of payment methods
  buildPaymentMethod(){
    this.paymentMethods = [
      // {id: MethodPaymentState.bank, name: "Bank"},
      // {id: MethodPaymentState.orange, name: "Orange Money"},
      {id: MethodPaymentState.mtn, name: "Mobile Money"},
      // {id: MethodPaymentState.credit_card, name: "Credit card"},
    ];
    
    // console.log(this.paymentMethods);
  }

  /**
   * This method is used to retrieve a specific transaction
   * Build a message based on the Transaction
   * And send message to provider to tell him price has changed
   * 
   */
  private async retrieveTransaction(){
    try {
      const rep: Transaction = await this.trServ.getTransactionById(this.selectedDisc.idTransaction, 'update');
      // console.log(rep);
      const message = this.handleTransactionMsg(rep);

      this.newMessage(message);

    } catch (error) {
      console.log(error);
      this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>An error occurs, please try again later ');   
    }
  }

  /**
   * This method is used to return message
   * the last message
   * @param discuss Discussion
   * @param prov Provider
   * 
   * @returns Message
   */
  private buildInitMessage(discuss: Discussion, messages: any[], prov: Provider): Message{
    
    let message: Message;
    message = new Message();
    
    if(messages.length==0){
      message.content = "Welcome "+this.authService.currentUserSubject.getValue().firstname+", my name is "+ prov.firstname + " your provider. You have requested a service ";
      message.content += "Before finalizing the transaction, do you have any question or more information about the service ?";
      message.title = "Service";
      message.idDiscussion = discuss._id;
      message.date = moment().format("YYYY-MM-DD HH:mm:ss");
      message.from = prov._id;
      message.to = this.authService.currentUserSubject.getValue()._id;
    }else{

      const last_msg = messages[messages.length - 1];
      message.content =  last_msg.content;
      message.idDiscussion =  discuss._id;
      message.date = moment(last_msg.date).format("YYYY-MM-DD HH:mm:ss");
      message.from = last_msg.from;
      message.to = last_msg.to;
      message.read = last_msg.read;
    }

    return message;
  }

  //This method is used to get selected discussion
  selectedUserDiscuss(userDiscuss: DiscussionItem): void {

    this.messageToDisplay =[];
    // console.log("discuss 1 =>",userDiscuss);
    this.selectedUser = userDiscuss.user;   
    let selectedDiscussion:Discussion = this.discusionList.find((disc:Discussion)=>userDiscuss.idDiscuss==disc._id);
    // console.log("discuss 2 =>",selectedDiscussion);
    this.selectedDisc = selectedDiscussion;
    // console.log(this.selectedUser);
    this.selectedDiscussion.next(selectedDiscussion);
    this.displayMessages(selectedDiscussion);

  }

  /**
   * This method is used to retrieve unique service
   * @param service_id string, unique service id 
   */
  async getCurrentService(no_msg?){
    
    const service_id: any = this.selectedDisc.idProject;
    try {

      const rep = await this.packageServ.getOnePackagesById(service_id);
      // console.log(JSON.stringify(rep));
      if(rep.resultCode==0){
        const objPackage: any = rep.result;
        this.current_transaction = objPackage.transactions[0];
        
        if(no_msg===undefined){
          const message: string = this.buildPackageMsg(objPackage);
          this.newMessage(message);
        }  
      }
    } catch (error) {
      console.log(error);
    }
  }

  //This method is used to build message
  private buildPackageMsg(objPackage: any): string{
    
    let result: string = "";
    result+= "Service details <br>";
    result+= "Transaction Number : "+this.selectedDisc.idTransaction +"<br>";
    result+= "Service Name : " + objPackage.title +"<br>";
    result+= "Receiver Name : " + objPackage.package_name +"<br>";
    // result+= 'Type : '+objPackage.typeof + "<br>";
    result+= 'Price (Rand) : '+objPackage.suggestedPrice + "<br>";
    result+=  objPackage.is_weak ? 'Weak : Yes <br>':'Weak: No <br>' ;
    result+=  objPackage.is_urgent ? 'Urgent : Yes <br>':'Urgent : No <br>';
    result+= 'From : '+objPackage.from.city+","+objPackage.from.country + "<br>";
    result+= 'To : '+objPackage.to.city+","+objPackage.to.country + "<br>";
    result+= 'Departure date : '+objPackage.date_departure + "<br>";
    result+= 'Arrival date : '+objPackage.date_arrival + "<br>";

    return result;
  }

  //This method is used to build message based on Transaction
  private handleTransactionMsg(objTrans: Transaction): string{
    
      let result: string = "";
      result+= "Transaction details <br>";
      result+= "N° : "+objTrans._id +"<br>";
      result+= "Status : " + objTrans.state +"<br>";
      result+= 'Price : '+objTrans.price + " R <br>";
      
      return result;
  }

  //This method is used to launch Payment 
  async handlePayment(){

    // this.content.open();
    this.modalService.open(this.content);
  }

  //This method is used to cancel 
  async cancelTransaction(){
    
    if(this.objTransaction===undefined){
      this.toastr.error('The transaction is not initialized. Please try again !', 'Payment');
      // this.showNotification('top', 'right', 'info', '', '\<b>The transaction is not initialized. Please try again !\</b>');
      return;
    }

    this.obj_spinner = true;
    try {
      const objReq = {ref: this.objTransaction.ref};
      const rep = await this.paymentServ.cancelPayment(objReq);
      this.obj_spinner = false;
      this.modalService.dismissAll();
      
      //Sending Bill
      const billing = await this.paymentServ.sendBill(this.objTransaction._id);
      console.log(billing);
      this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Billing\</b>\<br> We are sending you a mail !');

      this.toastr.info(rep.message, 'Cancel Payment');
       
    } catch (error) {
      this.obj_spinner = false;
      // console.log(error);
      this.modalService.dismissAll();
      const error_message : string = this.paymentServ.getCheckingMgsError(error.resultCode);
      // this.showNotification('top', 'right', 'warning', '', '\<b>'+error_message+' !\</b>');
      this.toastr.error(error_message, 'Payment');
    }
  }

  //This method is used to handle selected payment method
  handleMethodPayment(item: any){
    // console.log(item);
    this.selectedPaymentMethod = item.id;
  }

  //Start payment to initiate payment of the service
  async startPayment(item?: any){
    // console.log(this.mm_phone);
    
    //Close modal
    this.modalService.dismissAll();
    this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br> Payment is done');   

    const objReq = {
      idService: this.selectedDisc.idProject,
      phone: this.mm_phone.number
      //paiement_mode: item.id.toUpperCase()
    };

    this.modalService.open(this.contentLoader);
    try {
      const rep = await this.paymentServ.askPayment(objReq);
      // this.modalService.dismissAll();
      console.log(rep);
      this.getCurrentService('no_msg');
      this.objTransaction = rep[0];

    } catch (error) {
      this.modalService.dismissAll();
      // console.log(error);
      const error_message : string = this.paymentServ.getErrorMessageReqPay(error.resultCode);
      this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+error_message);   
      // this.toastr.error(error_message, 'Payment');
    }
  }

  //This method is used to check transaction state
  async checkTransaction(){
    
    if(this.objTransaction===undefined){
      this.toastr.info('The transaction is not initialized. Please try again !', 'Payment');
      return;
    }
    if(this.current_transaction.refID===undefined){
      this.showNotification('top','center', 'error', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> Please  !');
      return;
    }
    const toSend = {
      "idService": this.selectedDisc.idProject,
      "paiement_mode": this.selectedPaymentMethod,
      "phone": this.mm_phone.number,
      "refID": this.current_transaction.refID,
      "product":"Toupesu",
      "paymentMethod":this.selectedPaymentMethod
    };

    try {
      const rep = await this.paymentServ.checkPayment(this.current_transaction.refID, toSend);
      console.log(rep);
      this.modalService.dismissAll();
      if(rep.status== TransactionState.SUCCESS){
        
        const message: string = this.buildTransactionMsg(rep);
        this.newMessage(message);
        this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> The payment is registered successfully !');

        //Sending Bill
        const billing = await this.paymentServ.sendBill(this.selectedDisc.idProject);
        console.log(billing);
        // this.toastr.success('We are sending you a mail !', 'Bill')
        this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Billing\</b>\<br> We are sending you a mail !');

      }else if(rep.state == TransactionState.PENDING){
        this.toastr.info('The transaction is still pending. Please wait a moment and try again !', 'Payment');
      }else if(rep.state == TransactionState.START){
        this.toastr.info('The transaction is just start. You have to wait to receive a message from your operator !', 'Payment');
        
      }else if(rep.state == TransactionState.FAILED){
        // this.toastr.error('There is an error during transaction. Please try again later !', 'Payment');
        this.showNotification('top','center', 'error', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> We are not confirm payment from your phone. Please try again later !');
      }else{

      }
    } catch (error) {

      const error_message : string = this.paymentServ.getCheckingMgsError(error.resultCode);
      // this.showNotification('top', 'right', 'error', '', '\<b>'+error_message+' !\</b>');
      this.toastr.error(error_message, 'Payment');
    }
  }

  //This method is used to build message based on transaction done
  private buildTransactionMsg(objTrans: any): string{

    let result: string = "";
    result+= "Transaction details <br>";
    result+= "Service N° : "+objTrans.refID +"<br>";
    result+= "We are sending mail concerning your billing <br>";
    result+= "Payment N° : " + objTrans.pay_token +"<br>";
    result+= 'Status : '+objTrans.status + "<br>";
    result+= 'Payment method : '+objTrans.paymentMethod + "<br>";
    result+= 'Amount : '+objTrans.amount + "<br>";
    result+= 'Currency : '+objTrans.moneyCode + "<br>";
    
    return result;
  }

  /**
   * This method is used to build messages
   * to display on the chat according to the selected discussion
   * 
   * @param discuss Discussion
   * @returns DiscussionMessage[]
   */
  private async displayMessages(discuss: Discussion, page: number = 0){

    let messages: DiscussionMessage[] = [];
    
    try {            
      this.provider = await this.userService.getUserById(discuss.inter1);
      const current_user: Provider = await this.userService.getUserById(discuss.inter2);
      const list_messages: any = await this.chatService.getListMessagesByDiscussion(discuss._id, page, this.limit);
      // console.log(user);
      
      if(list_messages.length==0){
        let message: Message = this.buildInitMessage(discuss, messages, this.provider);
        this.messageToDisplay.push({
          from: this.provider,
          to:current_user,
          message,
          senderIsAuthUser:message.from==this.authService.currentUserSubject.getValue()._id
        });

      }else{
        
        list_messages.forEach((message:Message)=>{  
            // console.log(users);
            this.messageToDisplay.push({
              from: this.provider,
              to:current_user,
              message,
              senderIsAuthUser:message.from==this.authService.currentUserSubject.getValue()._id
            });
        });
        
        this.messageToDisplay.reverse();
        this.scrollToBottom();
        // console.log(this.messageToDisplay);
      }

    } catch (error) {
      console.log("Error chat =>",error);
    }

  }
  
  /**
   * This method is used to send a message
   * on the chat
   * 
   * @param msg string
   * @returns void
   */
  async newMessage(msg:string){
    // console.log("new message");
    if(this.selectedDiscussion.getValue()==null) return;
    
    const currentDisc: Discussion = this.selectedDiscussion.getValue();
    // console.log(currentDisc);

    let message:Message = new Message();
    message.content=msg; 
    message._id = generateId();
    message.from=this.authService.currentUserSubject.getValue()._id;
    message.date=new Date().toISOString();
    message.idDiscussion = currentDisc._id;
    if(currentDisc.inter1!=this.authService.currentUserSubject.getValue()._id) 
      message.to = currentDisc.inter1;
    else 
      message.to = currentDisc.inter2;

    const provider: Provider = await this.userService.getUserById(currentDisc.inter1);
    const current_user: Provider = await this.userService.getUserById(currentDisc.inter2);

    //Save message on db using chat service
    this.chatService.newMessage(message).then(rep=>{
      
      message._id = rep.message.idMessage._id;
      
      //Send message through socket
      this.emitMessageOnSocket(message);

      // this.messageToDisplay.push({
      //   from:current_user,
      //   to:provider,
      //   message,
      //   senderIsAuthUser:message.from==this.authService.currentUserSubject.getValue()._id
      // });
 
    }).catch(err=>{
      console.log(err);
    });

    // doit avoir une procédure si le message est parti ou pas
  }

  /**
   * This method is used to send message
   * using socket
   * @param msg Message to send
   */
  emitMessageOnSocket(msg: Message, discussion?: Discussion){

      const data = {
        "_id": msg._id,
        "from":msg.from,
        "to":msg.to,
        "date":msg.date,
        "title":"",
        "content":msg.content,
        "idDiscussion":msg.idDiscussion,
        "read":0
      };

  		this.chatRTService.setupSocketConnection(data);
  }

  //This method is used to update view 
  updateViewToDisplayMsg(){

    this.chatRTService.messageSubject.subscribe(message=>{
      
      if(message==null)
        return;

        console.log('MSG => ', message);
      this.messageToDisplay.push({
        from: this.authService.currentUserSubject.getValue(),
        to: this.provider,
        message,
        senderIsAuthUser:message.from == this.authService.currentUserSubject.getValue()._id
      });

      this.scrollToBottom();

    });
  }

  //This method is used to update a make new suggestion through form
  updatePrice(){
    this.modalService.open(this.contentPrice);
  }

  //This method is used to confirm and update price
  async confirmedPrice(){

    if(this.new_price<=0){
      this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>Provide a new price more than the last suggested price ');   
      return;
    }

    this.modalService.dismissAll();
    
    try {
      const toSend = {
        idTransaction: this.selectedDisc.idTransaction,
        price: this.new_price+''
      };

      const rep = await this.packageServ.updateTransactionPrice(toSend);
      console.log(rep);
      if(rep.resultCode==0){
        this.retrieveTransaction();
        this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Price was updated successfully');
      }
      else
        this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+rep.message+'');
        
    } catch (error) {
      this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>An Error occurs please try again later');
      // console.log(error);
    }
  }

  //This method is used to validate a price by provider
  async validatePrice(){
    
    try {
      const toSend = {
        idTransaction: this.selectedDisc.idTransaction,
        idService: this.selectedDisc.idProject,
      }
      const res = await this.packageServ.acceptTransactionPrice(toSend, this.provider);
      console.log(res);
      if(res && res.resultCode==0){
        const message: string = "Now you can make a payment by clicking on cart icon";
        this.newMessage(message);
        this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Price has been confirmed');
      }
      
    } catch (err) {
      // console.log(err);
      if(err.error && err.error==-4)
        this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+err.message+'');
    }
  }

  //This method is used to start/stop a service
  async handleStartStop(){

    let status: string = !this.is_running ? 'start':'stop';
    
    try {
      const toSend = { idTransaction: this.selectedDisc.idTransaction};

      const rep = await this.packageServ.startOrStopTransaction(toSend, status, this.provider);
      if(rep){
        if(rep.resultCode==0){
          this.is_running = !this.is_running;
          const message = status=='start' ? "Service has started": "Service has stop";
          this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+message+'');
        }else if(rep.resultCode==-3){
          this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>This service cannot be start at this step\</b>\<br>');
        }
      }
      
    } catch (err) {
      console.log(err);
      if(err.error && err.error==-4)
        this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+err.message+'');
    }
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

  //This method is used to refresh messages
  refreshMessages(){
    this.messageToDisplay =[];
    this.displayMessages(this.selectedDisc, 0);
  }

}
