import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { CountryManagementService } from '../../../../shared/service/back-office/country-management.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { Provider } from '../../../../shared/entity/provider';

@Component({
    selector: 'app-m-country-services',
    templateUrl: './m-country-services.component.html',
    styleUrls: ['./m-country-services.component.css']
})
export class MCountryServicesComponent implements OnInit {

    list_providers: any[] = [];
    current_user: Provider;
    services: any = [];

    criteria: any = {
        skip: 0,
        limit: 10,
        sort: 1
    }
    dataSkip = this.criteria.skip;
    dataLength = this.criteria.limit;

    constructor(
        private countryManagementService: CountryManagementService,
        private userService:UserService,
        private authService:AuthService,
    ) { 
        this.authService.currentUserSubject.subscribe((user:any)=>{
            console.log(user)
            if (user._id && user._is!="") {
                this.getUserById(user._id);
            }
            
        })
    }

    ngOnInit(): void {
    }

    getUserById(id: string){
        this.userService.getUserById(id).then((res)=>{
            console.log(res)
            this.current_user=res;
            if (res.adresse.country) {
                this.getCountryProviders(res.adresse.country_id);
            }
        }).catch((err)=>{console.log(err)})
    }

    getCountryProviders(country_id: string){   
        // this.criteria.limit = this.criteria.limit*2 
        this.countryManagementService.getCountryServices(this.criteria, country_id).subscribe((res)=>{
            console.log(res)
            if(res.data){
                this.services = res.data;
                console.log(this.services.length<=this.criteria.limit)
                if(this.services.length<this.criteria.limit) {
                    console.log(11111111111111111111)
                    this.dataLength = this.services.length
                } else {
                    console.log(2222222222222222222222222)
                    this.dataLength = this.dataLength+  this.services.length+1
                }
            }
        }, (error)=>{
            console.log(error)
        })
    }

    onPageChange(event: any) {
        if (event.previousPageIndex < event.pageIndex) {
            // User clicked "Next" button
            // this.onPageNext();
            this.criteria.skip = this.criteria.skip + this.criteria.limit;
            this.getCountryProviders(this.current_user.adresse.country_id);
            console.log('Next Page event:', this.current_user);
        } else if(event.previousPageIndex > event.pageIndex){
            console.log('Previous Page event:', event);
            this.criteria.skip = this.criteria.skip - this.criteria.limit;
            this.getCountryProviders(this.current_user.adresse.country_id);
        } else {
            console.log('Number of items:', event);
            this.criteria.limit = event.pageSize
        }
    }

}
