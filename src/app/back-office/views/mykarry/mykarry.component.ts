import { UserService } from './../../../shared/service/user/user.service';
import { Provider } from './../../../shared/entity/provider';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../../shared/service/back-office/provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../shared/service/notification/notification.service';
import { PackageService } from '../../../shared/service/back-office/package.service';

@Component({
    selector: 'app-mykarry',
    templateUrl: './mykarry.component.html',
    styleUrls: ['./mykarry.component.scss']
})
export class MykarryComponent implements OnInit {

    userName: string = "";
    current_user: any = null;
    waiting_provider: boolean;

    state: string = "";
    skip: number = 0;
    limit: number = 10;

    services: any[] = [];

    constructor(
        private authService: AuthService,
        private providerServ:ProviderService,
        private userServ: UserService,
        private router: Router,
        private formLog: FormBuilder,
        private notification: NotificationService,
        private route: ActivatedRoute,
        private packageService: PackageService,
    ) { }

    ngOnInit(): void {

        if(localStorage.getItem("user")==null){
        // this.router.navigate(["login"]);
        return;
        }

        this.authService.currentUserSubject.subscribe((user: Provider) => {
            this.userName = user.getSimpleName();
            // console.log(user);
            this.checkIsProvider(user._id);
            this.current_user=user;
        });
        this.initializeView();
    }

    //This method initialize view
    initializeView(){
        this.packageService.getRecentRequestedServices(this.state, this.skip, this.limit).subscribe((res)=>{
            this.services = res.data;
            console.log(this.services)
        }, (error)=>{
            console.log(error)
        })
    }

    //This method is used to check if user sent provider request
    async checkIsProvider(user_id: any){
        try {
        const rep = await this.userServ.getUserById(user_id);
        if(rep){
            // console.log("Provider is running");
            // console.log(rep);
            if(rep.isProvider && rep.isAcceptedProvider){
            localStorage.removeItem("waiting_provider");
                // localStorage.setItem("user", rep);
                localStorage.setItem("user",JSON.stringify(rep.toString()));
        
                }else if(rep.isProvider && !rep.isAcceptedProvider){
                this.waiting_provider = true;
                localStorage.setItem("waiting_provider", '1');
                }
            }
            } catch (err) {
            // console.log(err);
            if(err.error.resultCode==-1){
                this.authService.logOut();
            }
            }
    }

    //Navigate to the path
    goToPage(path: string){
        this.router.navigate([""+path+""]);
    }

    getRecentRequestedServices() {

    }

    getDetails(service_id: string){
        this.router.navigateByUrl("my-services/my-service-details/"+service_id);
    }

}
