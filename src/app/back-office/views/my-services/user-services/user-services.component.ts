import { PackageService } from './../../../../shared/service/back-office/package.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { PaymentService } from '../../../../shared/service/payment/payment.service';
import { TransactionMessage } from '../../chat/chat/chat.component';
import { TempsreelService } from '../../../../shared/service/tempsreel/tempsreel.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionState } from './../../../../shared/service/payment/payment.service';
import { TransactionServiceState, TransactionServiceLabel } from './../../../../shared/entity/transaction';
import { TransactionService } from '../../../../shared/service/back-office/transaction.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { Router } from '@angular/router';
import { LocationService } from '../../../../shared/service/location/location.service';
import { CurrencyService } from '../../../../shared/service/currency/currency.service';
import { InfiniteScrolling } from './handleInfiniteScrolling';
import { FormControl } from '@angular/forms';
import { ColisPackage, Person, TravelPackage } from '../../../../shared/entity/package';
import { RedirectService } from '../../../../shared/service/redirect/redirect.service';

declare var $: any;

enum MethodPaymentState {
    bank = 'bank',
    mtn = 'mtn',
    orange = 'orange',
    credit_card = 'credit_cart',
    paygate = 'paygate'
}


@Component({
    selector: 'app-user-services',
    templateUrl: './user-services.component.html',
    styleUrls: ['./user-services.component.scss']
})
export class UserServicesComponent implements OnInit {

    @ViewChild('contentMethod') content: any;
    
    services: any[] = [];
    obj_loader: boolean = true;
    @ViewChild('contentLoader') contentLoader: any;
    @ViewChild('contentPrice') contentPrice: any;
    
    methodPaymentState = MethodPaymentState;
    
    selected_service: any;

    separateDialCode: boolean = false;
    preferredCountries: CountryISO[] = [CountryISO.Cameroon, CountryISO.CentralAfricanRepublic, CountryISO.SouthAfrica];
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    mm_phone: any;
    paymentMethods: any[] = [];
    selectedPaymentMethod: string;
    moneyCode: string;
    product: string;
    private objTransaction: any;
    current_transaction: TransactionMessage;
    current_user: any;
    service_state = TransactionServiceState;
    init = "my_services.my_services_state.service_init_STATE";
    TransactionServiceLabel = TransactionServiceLabel;

    new_price: number = 0;
    payment_done = false;
    checking_payment = false;
    id_service = "false";
    country_service: any;
    currencies: any;
    service_cost: any;
    currency: any;


    
    skip: number = 0;
    page: number = 4;
    public endLimit:number= this.page;
    public albumData:any=[];
    TransactionServiceState = TransactionServiceState;
    state: any;
    selectedCat = localStorage.getItem('state')? localStorage.getItem('state') : "";
    status = TransactionServiceLabel[this.selectedCat];
    cat = new FormControl();

    selectedIndex: number = -1; // Initialize with -1 to indicate no item is selected

    servicesLoaded : boolean = false;

    constructor(
        private packageServ: PackageService,
        private modalService: NgbModal,
        private paymentServ: PaymentService,
        private temps: TempsreelService,
        private toastr: ToastrService,
        private transactionService: TransactionService,
        private notification: NotificationService,
        private locationService: LocationService,
        private currencyService: CurrencyService,
        private router:Router,
        private scrollService: InfiniteScrolling,
        private redirectService: RedirectService
    ) { }

    ngOnInit(): void {
        this.current_user = JSON.parse(localStorage.getItem("user"));
        // this.initializeView();
        this.buildPaymentMethod();
        this.temps.get_profile(this.current_user._id)

        this.temps.service_subject.subscribe((data) => {
            console.log(data);
            if(data.service.idRequester == this.current_user._id)
                for(let i=0; i<this.services.length; i++){
                    if(this.services[i]._id == data.service._id){
                        this.services[i] = data.service;
                        this.selectionChange(data.service.state)
                        break;
                    }
                }
        })
        console.log(localStorage.getItem('state'))
        this.selectionChange(localStorage.getItem('state') ? localStorage.getItem('state') : this.TransactionServiceState.service_init_STATE);

        this.scrollService.getObservable().subscribe(status=>{
            console.log(status)
            if(status){
                this.endLimit=this.endLimit + this.page;
                this.skip=this.skip + this.page;
                this.initializeView();
            }
        })
    }

    selectionChange(state){
        this.status = TransactionServiceLabel[this.selectedCat];
        localStorage.setItem('state', state);
        this.state = state;
        this.skip=0;
        this.services = [];
        this.endLimit = this.page;
        this.initializeView();
    }

    //This method initialize view
    async initializeView(){
        this.servicesLoaded = false;
        try {
            const rep = await this.packageServ.getAllPackagesUser(this.state, this.skip, this.page);
            console.log(rep.result);
            // this.services = rep.result;

            this.services = this.services.concat(rep.result);
            if(!this.servicesLoaded) this.servicesLoaded = true; 
            this.obj_loader = false;
            let clear=setInterval(()=>{
                let target=document.querySelector(`#target${this.endLimit}`);
                if(target){ 
                    // console.log("element found")
                    clearInterval(clear);
                    this.scrollService.setObserver().observe(target);
                }
            },2000)
        } catch (error) {
            this.obj_loader = false;
        }
    }

    onChange(state){
        // console.log(state)
        localStorage.setItem('state', state);
        this.state = state;
        this.skip=0;
        this.services = [];
        this.endLimit = this.page;
        this.initializeView();
    }

    buildPaymentMethod(){
        this.paymentMethods = [
            {id: MethodPaymentState.mtn, moneyCode: "XAF", product: "Toupesu", name: "Mobile Money"},
            // {id: MethodPaymentState.bank, name: "Bank"},
            // {id: MethodPaymentState.credit_card, name: "Credit Card"},
            {id: MethodPaymentState.paygate, moneyCode: "ZAR", product: "Toupesu", name: "Paygate"},
        ];
        
        console.log(this.paymentMethods);
    } 

    async handleMethodPayment(item: any, index: number){
        console.log(item);
        console.log(this.country_service);
        if(item.moneyCode != this.country_service.currency.cc){
            let res = await this.currencyService.get_currencies();
            this.currencies = res["quotes"];
            let inter = this.selected_service.suggestedPrice / (this.currencies["USD"+this.country_service.currency.cc].toFixed(2));
            this.service_cost = inter*this.currencies["USD"+item.moneyCode].toFixed(2) +0.02;
            // this.currencyService.get_currencies()
            // console.log(inter)
            // console.log(inter.toFixed(2))
            // console.log(this.service_cost)
        } else {
            this.service_cost = this.selected_service.suggestedPrice;
        }
        this.selectedPaymentMethod = item.id;
        this.moneyCode = item.moneyCode;
        this.product = item.product;

        // Update the selected index
        this.selectedIndex = index;
    }

    async handlePayment(service){
        // console.log(service)
        this.selected_service = service;
        let country = await this.locationService.get_country_by_code2(service.country);
        this.country_service = country.result[0]
        // console.log(this.country_service)
        this.modalService.open(this.content);
    }
    

    cancelTransaction(){
        this.modalService.dismissAll();
    }

    constructCheckRequest() {
        if(this.selectedPaymentMethod==MethodPaymentState.mtn || this.selectedPaymentMethod==MethodPaymentState.orange)
            return {
                idService: this.selected_service._id,
                payment_mode: this.selectedPaymentMethod,
                phone: this.mm_phone.number,
                refID: this.current_transaction.refID,
                product: this.product,
                paymentMethod: this.selectedPaymentMethod
            };
        else if(this.selectedPaymentMethod==MethodPaymentState.paygate)
            return {
                idService: this.selected_service._id,
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
            this.toastr.info('The transaction is not initialized. Please try again !', 'Payment');
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
            setTimeout(() => this.router.navigate(['chat']), 600);
            this.modalService.dismissAll();
            if(rep.status== TransactionState.SUCCESS){
                return this.transactionService.startTransaction(
                    this.selected_service.idSelectedProvider,
                    this.current_user._id,
                    this.selected_service._id,
                    this.current_user._id
                )
                .then((result)=>{
                    this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Provider has been successfully notified. Now you can finalize transaction in the chat menu')
                    setTimeout(() => this.router.navigate(['chat']), 600);
                }) 

            }
            if(rep.status== TransactionState.COMPLETED){
                return this.transactionService.startTransaction(
                    this.selected_service.idSelectedProvider,
                    this.current_user._id,
                    this.selected_service._id,
                    this.current_user._id
                )
                .then((result)=>{
                    this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Provider has been successfully notified. Now you can finalize transaction in the chat menu')
                    setTimeout(() => this.router.navigate(['chat']), 600);
                }) 

            }else if(rep.status == TransactionState.PENDING){
                this.showNotification('top','center', 'primary', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> The transaction is still pending. Please finalize the payment !');
            }else if(rep.status == TransactionState.START){
                this.toastr.info('The transaction is just start. You have to wait to receive a message from your operator !', 'Payment');
                
            }else if(rep.status == TransactionState.FAILED){
                this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> You did not confirm the payment. Please try initiating a new payment !');
            }else{

            }
            window.location.reload();
        } catch (error) 
        {
            console.log(error)
            this.modalService.dismissAll();
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b> ${error.error.error_description}, Sorry you did not complete the process`);
            console.log(error)
            const error_message : string = this.paymentServ.getCheckingMgsError(error.resultCode);
            this.toastr.error(error_message, 'Payment');
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

    /**
     * This method is used to retrieve unique service
     * @param service_id string, unique service id 
     */
    async getCurrentService(no_msg?){
        
        // const service_id: any = this.selectedDisc.idProject;
        try {

        const rep = await this.packageServ.getOnePackagesById(this.selected_service._id);
        // console.log(JSON.stringify(rep));
        // console.log(rep)
        if(rep.resultCode==0){
            const objPackage: any = rep.result;
            this.current_transaction = objPackage.transactions[0];
            
            if(no_msg===undefined){
            const message: string = this.buildPackageMsg(objPackage);
            // this.newMessage(message);
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
        // result+= "Transaction Number : "+this.selectedDisc.idTransaction +"<br>";
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
 
    async check_payment(service){
        this.id_service = service._id;
        // console.log(service)
        var data;
        for(let t of service.transactions)
        {
            if (t.refID!="" && t._id==service.idSelectedTransaction) 
            {
                if(t.paymentMethod==MethodPaymentState.mtn || t.paymentMethod==MethodPaymentState.orange)
                    data = {
                        idService: service._id,
                        payment_mode: t.paymentMethod,
                        phone: t.phone,
                        refID: t.refID,
                        product: this.product,
                        paymentMethod: t.paymentMethod
                    };
                else if(t.paymentMethod==MethodPaymentState.paygate)
                    data =  {
                        idService: service._id,
                        payment_mode: t.paymentMethod,
                        refID: t.refID,
                        product: "Toupesu",
                        paymentMethod: t.paymentMethod
                    };

                await this.check_payment_function(data)
                this.id_service = "false";
            }
        }
    }

    async check_payment_function(toSend){
        console.log(toSend)
        try {
            const rep = await this.paymentServ.checkPayment(toSend.refID, toSend);
            // console.log(toSend)
            console.log(rep); 
            console.log(rep.status== TransactionState.COMPLETED);
            if(rep.status== TransactionState.COMPLETED){
                return this.transactionService.startTransaction(
                    rep.data.idSelectedProvider,
                    this.current_user._id,
                    rep.data._id,
                    this.current_user._id)
                    .then((result)=>{
                            // this.waitSelectedProvider=false;
                            this.notification.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>Provider has been successfully notified. Now you can finalize transaction in the chat menu')
                            setTimeout(() => this.router.navigate(['chat/'+ toSend.idService]), 600);
                        })

            }else if(rep.status == TransactionState.PENDING){
                this.showNotification('top','center', 'primary', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> The transaction is still pending. Please finalize the payment !');
                // this.toastr.info('The transaction is still pending. Please wait a moment and try again !', 'Payment');
            }else if(rep.status == TransactionState.START){
                this.toastr.info('The transaction is just start. You have to wait to receive a message from your operator !', 'Payment');
                
            }else if(rep.status == TransactionState.FAILED){
                this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Payment\</b>\<br> Sorry, the payment transaction failled. Please try initiating a new payment !');
            }else{

            }
        } catch (error) 
        {
            const error_message : string = this.paymentServ.getCheckingMgsError(error.resultCode);
            if(error.message) this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b> ${error.error.error_description}, Sorry you did not complete the process`);
            else this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `<b>Error: </b>  Sorry you did not complete the process`);
            // this.showNotification('top', 'right', 'error', '', '\<b>'+error_message+' !\</b>');
            this.toastr.error(error_message, 'Payment');
        }
    }

    updatePrice(service){
        this.selected_service = service;
        this.modalService.open(this.contentPrice);
    }
    
    //This method is used to confirm and update price
    async confirmedPrice(){
        console.log(this.selected_service)
        console.log(this.new_price)
        if(this.new_price<=0){
        this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>Provide a new price more than the last suggested price ');   
        return;
        }

        this.modalService.dismissAll();
        
        try {
        const toSend = {
            id_service: this.selected_service._id,
            price: this.new_price+''
        };

        const rep = await this.packageServ.updateTransactionPrice(toSend);
        console.log(rep);
        if(rep.resultCode==0){
            // this.retrieveTransaction();
            this.showNotification('top','center', 'success', 'pe-7s-close-circle', '\<b>Success\</b>\<br>The price was updated successfully');
            window.location.reload();
        }
        else
            this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>'+rep.message+'');
            
        } catch (error) {
        this.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br>An Error occurs please try again later');
        // console.log(error);
        }
    }

    updateS(item, price){
        return this.services.map(obj => {
            if (obj._id === item._id) {
                console.log(item)
                item.price = price;
                console.log(item)
                return item;
            }
            return obj;
        });
    }

    ispackage_service(service){
        if (service.type==ColisPackage.TYPE || service.type==TravelPackage.TYPE || service.type==Person.TYPE) {
            return true;
        }
        return false;
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
        if(this.selectedPaymentMethod==MethodPaymentState.mtn || this.selectedPaymentMethod==MethodPaymentState.orange)
            return {
                idService: this.selected_service._id,
                phone: this.mm_phone.number,
                payment_mode: this.selectedPaymentMethod,
                moneyCode: this.moneyCode,
                amount: this.service_cost,
                product: this.product
            };
        else if(this.selectedPaymentMethod==MethodPaymentState.paygate)
            return {
                idService: this.selected_service._id,
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
    
        this.getCurrentService('no_msg');
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

}
