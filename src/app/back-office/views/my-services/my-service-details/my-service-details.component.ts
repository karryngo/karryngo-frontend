import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { CreateColisPackageService } from '../../../../shared/service/back-office/create-package.service';
import { PackageService } from '../../../../shared/service/back-office/package.service';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { TransactionService } from '../../../../shared/service/back-office/transaction.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { TempsreelService } from '../../../../shared/service/tempsreel/tempsreel.service';
import { TransactionServiceLabel, TransactionServiceState } from '../../../../shared/entity/transaction';
import { ConversationService } from '../../../../shared/service/back-office/conversation.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { ChatService } from '../../../../shared/service/back-office/chat.service';
import { Provider } from '../../../../shared/entity/provider';
import { LocationService } from '../../../../shared/service/location/location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyService } from '../../../../shared/service/currency/currency.service';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { PaymentService, TransactionState } from '../../../../shared/service/payment/payment.service';
import { RedirectService } from '../../../../shared/service/redirect/redirect.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionMessage } from '../../chat/chat/chat.component';
import { FcmService } from '../../../../shared/service/fcm/fcm.service';
import { CommentService } from '../../../../shared/service/back-office/comment.service';
import { Comment } from './comment.interface';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
declare var $: any;

enum MethodPaymentState {
    bank = 'bank',
    mtn = 'mtn',
    orange = 'orange',
    credit_card = 'credit_cart',
    paygate = 'paygate'
}

enum Product {
    KARRYNGO = "KarryNgo"
}

@Component({
    selector: 'app-my-service-details',
    templateUrl: './my-service-details.component.html',
    styleUrls: ['./my-service-details.component.css']
})
export class MyServiceDetailsComponent implements OnInit {
    @ViewChild('contentMethod') content: any;
    @ViewChild('contentLoader') contentLoader: any;

    // Price
    @ViewChild('contentPrice') contentPrice: any;

    service: any;
    providers: any; 
    provider: Provider;
    // contact: Provider;
    currentUser: any = null;
    current_user: Provider;

    service_state = TransactionServiceState;
    conversation : any;

    contition: any = {
        conversation_id: "",
        skip: 0,
        limit: 10
    }
    messages: any[] = [];
    room: string = '';
    newMessage: string = '';

    // Payment
    country_service: any;
    paymentMethods: any[] = [];
    currencies: any;
    service_cost: any;
    selectedPaymentMethod: string;
    moneyCode: string;
    product: Product;
    selectedIndex: number = -1; // Initialize with -1 to indicate no item is selected
    preferredCountries: CountryISO[] = [CountryISO.Cameroon, CountryISO.CentralAfricanRepublic, CountryISO.SouthAfrica];
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    mm_phone: any;
    payment_done = false;
    private objTransaction: any;
    methodPaymentState = MethodPaymentState;
    checking_payment = false;
    current_transaction: TransactionMessage;

    // Price
    new_price: number = 0;
    TransactionServiceLabel = TransactionServiceLabel;

    fileUrl: string = environment.filesUrl;
    defaultImg: string = "assets/imgs/default-avatar.jpg";


    // comment
    comment: Comment = {
        rating: 0,
        text: '',
    };
    comments: Comment[] = [];
    
    constructor(
        private packageService: PackageService,
        private route: ActivatedRoute,
        private notification: NotificationService,
        private packageCreation:CreateColisPackageService,
        private transactionService:TransactionService,
        private authService:AuthService,
        private providerService:ProviderService,
        private router:Router,
        private temps: TempsreelService,
        private convService: ConversationService,
        private userServ: UserService,
        private locationService: LocationService,
        private modalService: NgbModal,
        private currencyService: CurrencyService,
        private paymentServ: PaymentService,
        private chatService: ChatService,
        private toastr: ToastrService,
        private translate: TranslateService,
        private redirectService: RedirectService,
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
        this.initComponent();
    }

    initComponent(){
        this.find_package_service_byid();
        this.authService.currentUserSubject.subscribe((user:any)=>{
            this.currentUser=user;
            this.current_user=user;
        })

        this.buildPaymentMethod();
        this.listenForMessages();
    }

    find_package_service_byid()
    {
        
        this.packageService.getOnePackagesById(this.route.snapshot.paramMap.get('service_id'))
        .then((result:any)=>{
            // this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('my_service.my_service_created'))
            if(result.result.transactions.length>0){
                this.current_transaction = result.result.transactions[0];
                this.userServ.getUserById(result.result.transactions[0].idProvider).then((data) => {  this.provider = data; 
                    console.log(data) });
            }
            this.service = result.result ;
            let providers_id: string[] = [];

            if ((result.result.state!=this.service_state.service_init_STATE)&&(result.result.state!=this.service_state.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT)) {
                this.convService.findServiceConversation(this.service._id).then((res)=>{
                    this.getConversation(this.service._id);
                })
            }

            if (result.result.state==this.service_state.SERVICE_END) {
                this.find_comment_by_service_id(this.service._id);
            }

            if(result.result.transactions.length != 0)
                for(let t of result.result.transactions)
                    providers_id.push(t.idProvider)
            return providers_id;
        })
        .then((ids) => {
            if(ids.length!=0)
            this.providerService.find_providers_by_ids(ids)
            .then((res) => {
                this.providers = res.result;
            })
        }).catch((error) => {
            console.log(error);
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>' + error.message);
        });
    }

    getConversation(service_id){
        this.convService.findServiceConversation(service_id).then((res)=>{
            this.conversation = res.result[0]
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
 
    transaction_init(){
        for(let serv of this.service.transactions)
            {
                if (serv.idProvider == this.currentUser._id) 
                    return true;
            }
    }

    confirm_request(){}

    payment_init(service){
        if(service.idSelectedProvider != "" && service.idSelectedTransaction != "")
            for(let t of service.transactions)
            {
                if (t.refID!="" && t._id==service.idSelectedTransaction) 
                {
                    return true;
                }
            }
        return false;
    }
    waitting_payment(service){
        return service.state=='service_accepted_and_waiting_paiement';
    }

    listenForMessages() {
        this.chatService.getMessages().subscribe((message) => {
            console.log(1111111111)
            console.log(message)
            console.log(222222222222)
            this.messages.push(message);
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


    // Price
    updatePrice(){
        this.modalService.open(this.contentPrice);
    }
    cancelTransaction(){
        this.modalService.dismissAll();
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
            id_service: this.service._id,
            price: this.new_price
        };
        const rep = await this.packageService.updateTransactionPrice(toSend);
        console.log(rep);
        if(rep.resultCode==0){
            this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('my_service.my_service_updated'));
            // window.location.reload();
            this.initComponent();
        }
        else
            this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+rep.message+'');
            
        } catch (error) {
        this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>An Error occurs please try again later');
        }
    }



    // Payment
    buildPaymentMethod(){
        this.paymentMethods = [
            {id: MethodPaymentState.mtn, moneyCode: "XAF", product: Product.KARRYNGO, name: "Mobile Money"},
            {id: MethodPaymentState.paygate, moneyCode: "ZAR", product: Product.KARRYNGO, name: "Paygate"},
        ];
        
    }
    async handlePayment(service){
        // console.log(service)
        let country = await this.locationService.get_country_by_code2(this.service.country);
        this.country_service = country.result[0] 
        // console.log(this.country_service)
        this.modalService.open(this.content);
    }
    async handleMethodPayment(item: any, index: number){
        console.log(item);
        console.log(this.country_service);
        if(item.moneyCode != this.country_service.currency.cc){
            let result = await this.currencyService.get_currencies(); 
            console.log(result.data) 
            const data = result.data;
            this.currencies = data["quotes"];
            let inter = this.service.suggestedPrice / (this.currencies["USD"+this.country_service.currency.cc].toFixed(2));
            this.service_cost = inter*this.currencies["USD"+item.moneyCode].toFixed(2) +0.02;
            // this.currencyService.get_currencies()
            console.log(inter)
            console.log(inter.toFixed(2))
            console.log(this.service_cost)
        } else {
            this.service_cost = this.service.suggestedPrice;
        }
        this.selectedPaymentMethod = item.id;
        this.moneyCode = item.moneyCode;
        this.product = item.product;

        // Update the selected index
        this.selectedIndex = index;
    }
    async startPayment(item?: any) {
        try {
            this.dismissAllModals();
    
            const paymentRequest = this.constructPaymentRequest();
            if (paymentRequest == null) {
                this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Payment No payment method selected:</b>`);
                return;
            }
            this.showLoadingModal();
    
            const paymentResponse = await this.initiatePayment(paymentRequest);
            console.log(paymentResponse)
    
            if (paymentResponse.resultCode === 0) {
                this.handleSuccessfulPaymentInitiation(paymentResponse);
            } else {
                this.handlePaymentInitiationError(paymentResponse);
            }
        } catch (error) {
            this.handlePaymentError(error);
        }
    }
    dismissAllModals() {
        this.modalService.dismissAll();
    }
    
    constructPaymentRequest() {
        // console.log(this.mm_phone.number)
        if(this.selectedPaymentMethod==MethodPaymentState.mtn || this.selectedPaymentMethod==MethodPaymentState.orange)
            return {
                idService: this.service._id,
                phone: this.mm_phone.e164Number,
                payment_mode: this.selectedPaymentMethod,
                moneyCode: this.moneyCode,
                amount: this.service_cost,
                product: this.product
            };
        else if(this.selectedPaymentMethod==MethodPaymentState.paygate)
            return {
                idService: this.service._id,
                payment_mode: this.selectedPaymentMethod,
                moneyCode: this.moneyCode,
                amount: this.service_cost,
                product: this.product
            };
    
        return null;
    }
    showLoadingModal() {
        this.modalService.open(this.contentLoader);
    }
    async initiatePayment(paymentRequest) {
        return await this.paymentServ.askPayment(paymentRequest);
    }
    handleSuccessfulPaymentInitiation(paymentResponse) {
        this.payment_done = true;
        if (paymentResponse.payment.pay_token) {
            if (!paymentResponse.payment.success) {
                this.handlePaymentError({ message: paymentResponse.payment.error });
            }
        } else if (paymentResponse.payment.payment_detail_url) {
            this.redirectService.redirectToExternalUrl(paymentResponse.payment.payment_detail_url);
        } else {
            this.handlePaymentError({ message: paymentResponse.payment.message });
        }
        this.find_package_service_byid();
        this.objTransaction = paymentResponse.data[0];
    }
    
    handlePaymentInitiationError(paymentResponse) {
        this.modalService.dismissAll();
        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Payment error:</b> ${paymentResponse.message}`);
    }
    
    handlePaymentError(error) {
        this.modalService.dismissAll();
        const errorMessage = error.message || 'An error occurred during payment initiation.';
        this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error:</b> ${errorMessage}`);
    }

    getDetails(service_id: string){
        this.router.navigateByUrl("my-services/my-service-details/"+service_id);
    }

    constructCheckRequest() {
        if(this.selectedPaymentMethod==MethodPaymentState.mtn || this.selectedPaymentMethod==MethodPaymentState.orange)
            return {
                idService: this.service._id,
                payment_mode: this.selectedPaymentMethod,
                phone: this.mm_phone.e164Number, 
                refID: this.current_transaction.refID,
                product: this.product,
                paymentMethod: this.selectedPaymentMethod
            };
        else if(this.selectedPaymentMethod==MethodPaymentState.paygate)
            return {
                idService: this.service._id,
                payment_mode: this.selectedPaymentMethod,
                refID: this.current_transaction.refID,
                product: this.product,
                paymentMethod: this.selectedPaymentMethod
            };
    
        return null;
    }

    //This method is used to check transaction state
    async checkTransaction() 
    {
        this.checking_payment = true;
        
        if(this.objTransaction===undefined){
            this.toastr.info(''+this.translate.instant('my_service.my_service_not_init'), 'Payment');
            return;
        }
        if(this.current_transaction.refID===undefined){
            this.showNotification('top','center', 'error', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> Please  !');
            return;
        }
        var checkRequest = this.constructCheckRequest();
        if (checkRequest == null) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Payment No payment method selected:</b>`);
            return;
        }

        try {
            const rep = await this.paymentServ.checkPayment(this.current_transaction.refID, checkRequest);
            console.log(rep);
            // setTimeout(() => this.router.navigate(['chat']), 600);
            this.modalService.dismissAll();
            if(rep.status== TransactionState.SUCCESS){
                
                // const message: string = this.buildTransactionMsg(rep);
                // this.newMessage(message);
                // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> The payment is registered successfully !');
                // const billing = await this.paymentServ.sendBill(this.selectedDisc.idProject);
                // console.log(billing);
                // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Billing\</b>\<br> We are sending you a mail !');
                return this.transactionService.startTransaction(
                    this.service.idSelectedProvider,
                    this.current_user._id,
                    this.service._id,
                    this.current_user._id
                )
                .then((result)=>{
                    // this.waitSelectedProvider=false;
                    this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('my_service.my_service_provider_notified'))
                    setTimeout(() => this.router.navigate(['chat']), 600);
                    // setTimeout(() => this.router.navigate(['chat/'+ toSend.idService]), 600);
                }) 

            }
            if(rep.status== TransactionState.COMPLETED){
                
                // const message: string = this.buildTransactionMsg(rep);
                // this.newMessage(message);
                // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> The payment is registered successfully !');
                // const billing = await this.paymentServ.sendBill(this.selectedDisc.idProject);
                // console.log(billing);
                // this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Billing\</b>\<br> We are sending you a mail !');
                return this.transactionService.startTransaction(
                    this.service.idSelectedProvider,
                    this.current_user._id,
                    this.service._id,
                    this.current_user._id
                )
                .then((result)=>{
                    // this.waitSelectedProvider=false;
                    this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('my_service.my_service_provider_notified'))
                    // setTimeout(() => this.router.navigate(['chat/'+ toSend.idService]), 600);
                    // setTimeout(() => this.router.navigate(['chat']), 600);
                    this.initComponent();
                }) 

            }else if(rep.status == TransactionState.PENDING){
                // this.showNotification('top','center', 'primary', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> The transaction is still pending. Please finalize the payment !');
                this.showNotification('top','center', 'primary', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> '+this.translate.instant('my_service.my_service_pending'));
                // this.toastr.info('The transaction is still pending. Please finalize the payment !', 'Payment');
            }else if(rep.status == TransactionState.START){
                this.toastr.info('The transaction is just start. You have to wait to receive a message from your operator !', 'Payment');
                
            }else if(rep.status == TransactionState.FAILED){
                this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> You did not confirm the payment. Please try initiating a new payment !');
            }else{

            }
            // this.checking_payment = false;
            // this.payment_done = false;
            window.location.reload();
        } catch (error) 
        {
            // console.log(error)
            // this.modalService.dismissAll();
            // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b> ${error.error.error_description}, Sorry you did not complete the process`);
            // console.log(error)
            // const error_message : string = this.paymentServ.getCheckingMgsError(error.resultCode);
            // // this.showNotification('top', 'right', 'error', '', '\<b>'+error_message+' !\</b>');
            // this.toastr.error(error_message, 'Payment');


            error = error.error
            this.modalService.dismissAll();
            this.checking_payment = false;
            const error_message : string = this.paymentServ.getCheckingMgsError(error.resultCode);
            if(error.status == TransactionState.PENDING){
                this.showNotification('top','center', 'primary', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> '+this.translate.instant('my_service.my_service_pending'));
            }else if(error.status == TransactionState.FAILED){
                this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> '+this.translate.instant('my_service.my_service_failed'));
            }
            // if(error.message) this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b> ${error.error.error_description}, `+this.translate.instant('my_service.my_service_sorry'));
            else this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b> `+this.translate.instant('my_service.my_service_sorry'));
            this.toastr.error(error_message, 'Payment');
        }
    }

    async check_payment(service){
        console.log(service)
        // this.id_service = service._id;
        // console.log(service)
        this.checking_payment = true;
        var data;
        for(let t of service.transactions)
        {
            // console.log(t)
            if (t.refID!="" && t._id==service.idSelectedTransaction) 
            {
                if(t.paymentMethod==MethodPaymentState.paygate)
                    data =  {
                        idService: service._id,
                        payment_mode: t.paymentMethod,
                        refID: t.refID,
                        product: "Toupesu",
                        paymentMethod: t.paymentMethod
                    };
                else if(t.paymentMethod==MethodPaymentState.mtn || t.paymentMethod==MethodPaymentState.orange)
                    data = {
                        idService: service._id,
                        payment_mode: t.paymentMethod,
                        phone: t.phone,
                        refID: t.refID,
                        product: t.product,
                        paymentMethod: t.paymentMethod
                    };
                else (t.paymentMethod==MethodPaymentState.paygate)
                    data = {
                        idService: service._id,
                        payment_mode: t.paymentMethod,
                        phone: t.phone,
                        refID: t.refID,
                        product: t.product,
                        paymentMethod: t.paymentMethod
                    };
                await this.check_payment_function(data)
                this.checking_payment = false;
                this.find_package_service_byid();
            }
        }
    }
    async check_payment_function(toSend){
        console.log(toSend)
        try {
            const rep = await this.paymentServ.checkPayment(toSend.refID, toSend); 
            console.log(rep); 
            console.log(rep.status == TransactionState.FAILED);
            if(rep.status== TransactionState.COMPLETED){
                return this.transactionService.startTransaction(
                    rep.data.idSelectedProvider,
                    this.current_user._id,
                    rep.data._id,
                    this.current_user._id)
                    .then((result)=>{
                            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>'+this.translate.instant('my_service.my_service_provider_notified'))
                            setTimeout(() => this.router.navigate(['chat/'+ toSend.idService]), 600);
                        })

            }else if(rep.status == TransactionState.PENDING){
                this.showNotification('top','center', 'primary', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> '+this.translate.instant('my_service.my_service_pending'));
            }else if(rep.status == TransactionState.START){
                this.toastr.info('The transaction is just start. You have to wait to receive a message from your operator !', 'Payment');
                
            }else if(rep.status == TransactionState.FAILED){
                this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> '+this.translate.instant('my_service.my_service_failed'));
            }else{

            }
        } catch (error) 
        {
            // console.log(error.error)
            error = error.error
            const error_message : string = this.paymentServ.getCheckingMgsError(error.resultCode);
            if(error.status == TransactionState.PENDING){
                this.showNotification('top','center', 'primary', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> '+this.translate.instant('my_service.my_service_pending'));
            }else if(error.status == TransactionState.FAILED){
                this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> '+this.translate.instant('my_service.my_service_failed'));
            }
            // if(error.message) this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b> ${error.error.error_description}, `+this.translate.instant('my_service.my_service_sorry'));
            else this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b> `+this.translate.instant('my_service.my_service_sorry'));
            this.toastr.error(error_message, 'Payment');
        }
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
        console.log(this.comment)
        this.comment.serviceId = this.service._id;
        this.comment.userId = this.service.idSelectedProvider;
        this.comment.raterUserId = this.service.idRequester;
        this.commentService.postComment(this.comment).subscribe(
            (response) => {
                console.log('Comment posted successfully', response);
                this.initComponent();
            },
            (error) => {
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
