import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../../../shared/service/location/location.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { AccountType } from '../../../../shared/entity/provider';

@Component({
    selector: 'app-m-country-details',
    templateUrl: './m-country-details.component.html',
    styleUrls: ['./m-country-details.component.css']
})
export class MCountryDetailsComponent implements OnInit {

    country;
    country_id;
    rateForm: FormGroup;
    updating: boolean = false;
    current_user: any;
    manager: any;
    users: string[] = [];
    myControl = new FormControl();
    selected_user: any;

    constructor(
        private formBuilder: FormBuilder,
        private locationService: LocationService,
        private notification: NotificationService,
        private userService: UserService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void 
    {
        this.current_user = JSON.parse(localStorage.getItem("user"));
        this.country_id = this.route.snapshot.paramMap.get('country_id');
        this.get_country_by_id(this.country_id);
        
        this.rateForm = this.formBuilder.group({
            'owner': ['', Validators.required],
            'manager': ['', Validators.required],
            'provider': ['', Validators.required],
        })
        this.rateForm.disable();
    }

    get f(){
        return this.rateForm.controls;
    }

    submit(){
        console.log(this.rateForm.value)
        var final_rate = {
            owner: this.f.owner.value/100,
            provider: this.f.provider.value/100,
            manager: this.f.manager.value/100
        }
        console.log(final_rate)
        if (final_rate.owner+final_rate.manager+final_rate.provider != 1) {
            this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', `\<b>Error !\</b>\<br> The sum of the Rates must be equal to 100 `);
            return
        }
        this.locationService.update_country_rate(this.country._id, final_rate)
        .then((res) => {
            console.log(res);
            if (res.resultCode==0) {
                this.notification.showNotification('top', 'center', 'success', 'pe-7s-close-circle', `\<b>Sucess !\</b>\<br> Rates updted `);
                this.cancel_edit();
            }
        })
    }

    set_manager(){
        this.userService.UpdateUser(this.selected_user._id, this.country._id, {accountType: AccountType.MANAGER_ACCOUNT})
        .then((res) => {
            console.log(res);
            window.location.reload();
        }).catch((error)=>{
            console.error("Error Transaction ",error)
            if(error && error.hasOwnProperty('resultCode')) this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+error.message)
            else if(error.error.resultCode-1) {
                this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br> ' + error.error.message)
            }
        })
    }

    get_country_by_id(country_id){
        this.locationService.get_country_by_id(country_id)
        .then((res) => {
            console.log(res);
            this.country = res.result[0];
            this.f.owner.setValue(this.country.rate.owner*100);
            this.f.manager.setValue(this.country.rate.manager*100);
            this.f.provider.setValue(this.country.rate.provider*100);
            this.get_country_manager(this.country._id)
        })
    }

    get_country_manager(country_id){
        this.locationService.get_country_manager(country_id)
        .then((res) => {
            console.log(res);
            this.manager = res.data.manager;
        })
    }

    find_user_by_email(email){
        this.locationService.find_user_by_email(email)
        .then((res) => {
            console.log(res);
            this.selected_user = res.data[0]
            this.users = res.data;
        })
    }

    edit_rate(){
        this.updating = true;
        this.rateForm.enable();
    }
    cancel_edit(){
        this.updating = false;
        this.rateForm.disable();
    }

    get_user(user){
        console.log(user);
        if(user) this.find_user_by_email(user);
    }

    select_user(user){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(user)
    }

}
