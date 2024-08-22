
import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserManagementService } from '../../../../shared/service/back-office/user-management.service';
import { NotificationService } from '../../../../shared/service/notification/notification.service';
import { Privilege } from '../../../../shared/entity/privilege';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';
import { environment } from '../../../../../environments/environment';
import { LocationService } from '../../../../shared/service/location/location.service';
declare var $: any;

@Component({

    selector: 'm-costomers',
    templateUrl: 'm-costomers.component.html',
    styleUrls: ['m-costomers.component.scss'],
})

export class MCostomersComponent implements OnInit {

    @ViewChild('services') public services: ModalDirective;
    @ViewChild('details') public details: ModalDirective;
    // @ViewChild('myModalClose') modalClose;

    users: any[] = [];
    myControl = new FormControl();
    pattern = "@";
    skip = 0;
    limit = 10;
    public endLimit:number= this.limit;
    selected_user: any;
    privileges = [Privilege.ACCEPT_PROVIDER]; 

    toppings = new FormControl();
    selectedToppings = [];
    current_user: any;
    waiting: boolean = true;
    fileUrl: string = environment.filesUrl;
    options : any = { country_id: "" };

    countries: any[] = [];
    obj_loader: boolean = true;
    
    constructor(
        private userManagementService: UserManagementService,
        private notification: NotificationService,
        private local_storage: UserlocalstorageService,
        private locationService:LocationService,
    ) { }

    ngOnInit(): void 
    {
        this.local_storage.dataUser.subscribe((data: any) => {
            this.current_user = data.user
        }) 
        this.find_users_by_info_pattern();
        this.get_countries();
    }

    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            // console.log(res);
            this.countries = res.result; 
        })
    }

    onCountrySelected(selectedCountryId: string): void {
        console.log(selectedCountryId)
        this.options = { skip: 0, limit: 10, sort: -1, country_id: "" };
        this.skip = 0;
        this.limit = 10;
        this.pattern = "@";
        this.options.country_id = selectedCountryId;
        this.waiting = true;
        this.users = []
        this.find_users_by_info_pattern();
    }


    find_users_by_info_pattern(){
        this.obj_loader = true;
        this.userManagementService.find_users_by_info_pattern(this.pattern, this.skip, this.limit, this.options)
        .then((res) => {

            // console.log(res);
            this.users = this.users.concat(res.data);
            if (!res.data||res.data.length<this.limit) {
                this.waiting = false;
            }
            this.obj_loader = false;

        })
        .catch((error)=>{
            console.error("Error Transaction ",error)
            if(error && error.hasOwnProperty('resultCode')) this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+error.message)
            else if(error.error.resultCode-1) {
                this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Error\</b>\<br> ' + error.error.message)
            }
        this.obj_loader = false;
        })
    }

    get_users(pattern){
        this.users = [];
        this.pattern = pattern!=""? pattern: "@";
        this.skip=0;
        this.endLimit = this.limit;
        // if(pattern) {
            this.waiting = true;
            this.users = []
            this.find_users_by_info_pattern();
        // }
    }

    // onCountrySelected(selectedCountryId: string): void {
    //     this.countryChanged = true;
    //     this.options.country_id = selectedCountryId;
    //     this.list_providers = [];
    //     this.waiting = true;
    //     this.getListOfProvider();
    // }

    getMore(){
        this.endLimit=this.endLimit + this.limit;
        this.skip=this.skip + this.limit;
        this.find_users_by_info_pattern();
    }

    select_user(user){
        console.log(user)
        this.selected_user = user;
    }

    async add_user_privilege()
    {
        console.log(this.selectedToppings)
        try {
            const rep = await this.userManagementService.add_user_privilege({privileges: this.selectedToppings}, this.selected_user._id);
            if(rep){
                // console.log(rep.result)
                this.find_users_by_info_pattern();
                this.services.hide();
                this.selectedToppings = []
            }
        } catch (error) {
            console.log(error);
        } 
    }

    async remove_user_privilege(priv){
        try {
            const rep = await this.userManagementService.remove_user_privilege({privilege: priv}, this.selected_user._id);
            if(rep){
                console.log(rep.result)
                this.find_users_by_info_pattern();
                this.services.hide();
                // this.selectedToppings = []
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    has_privilege(priv){
        if(this.selected_user.privileges)
            for(let s of this.selected_user.privileges)
                if (s == priv) {
                    return true;
                }
        return false;
    }

    showNotification(from, align, colortype, icon, text) 
    {
        $.notify({
            icon: icon,
            message: text
        }, {
            type: colortype,
            timer: 300,
            placement: {
                from: from,
                align: align
            }
        });
    }
}
