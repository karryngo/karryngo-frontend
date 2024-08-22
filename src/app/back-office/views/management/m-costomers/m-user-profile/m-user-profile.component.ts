import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../shared/service/user/user.service';
import { CarrierService } from '../../../../../shared/service/back-office/carrier.service';
import { environment } from '../../../../../../environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-m-user-profile',
    templateUrl: './m-user-profile.component.html',
    styleUrls: ['./m-user-profile.component.css']
})
export class MUserProfileComponent implements OnInit, AfterViewInit {

    userId: string;
    provider: any;
    user: any;
    fileUrl: string = environment.filesUrl;
    defaultImg: string = '../../../../assets/img/user_image.png';

    constructor(private route: ActivatedRoute, private userData: UserService, private supplierServ: CarrierService, private sanitizer: DomSanitizer) { 
        this.userId = this.route.snapshot.paramMap.get('user_id')
        console.log(this.userId)
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.getUserById();
    }

    getUserById(){
        this.userData.getUserById(this.userId).then(async (user)=>{
            console.log(user)
            this.user = user
            if (user && user.isProvider) {
                const rep = await this.supplierServ.getProviderByUser(user._id);
                if(rep&&rep.length>0) this.provider = rep[0];
                console.log(this.provider)
            }
            
        }).catch((error)=>{
            console.log(error)
        })
    }

    async validerAccount(item){

        item["loadder"] = true;
        try {
            const rep = await this.supplierServ.manageProvider(item.address.email);
            item["loadder"] = false;
            
            this.supplierServ.showNotification('top', 'center', 'success', 'pe-7s-close-circle', `\<b>Account Validation !\</b>\<br> A new provider ${item.firstname} is now available`);
            item.isAcceptedProvider = true;
        } catch (error) {
            console.log(error);
        }
    }

    sanitizeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

}
