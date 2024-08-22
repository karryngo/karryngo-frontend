import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/service/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { Provider, ServiceOfProvider, User } from '../../../shared/entity/provider';
import { ProviderService } from '../../../shared/service/back-office/provider.service';
import { NotificationService } from '../../../shared/service/notification/notification.service';
import { UserlocalstorageService } from '../../../shared/service/localstorage/userlocalstorage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { error } from 'console';
// import { AuthService } from 'app/shared/services/auth.service';
// import { UserService } from 'app/shared/services/user.service';
// import { User } from 'app/shared/services/user';

declare var $: any;

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    updateProfilForm: FormGroup;
    submitted: boolean = false;
    // user: any[];
    // users: any[]; 
    user:Provider= new Provider();
    userService:ServiceOfProvider=new ServiceOfProvider();
    userEmail: String = '';
    firstName: String ='';
    lastName: String = '';
    name = '';
    userAddress = '';
    userCity: String = '';
    userCountry: String = '';
    userZip = '';
    userPhone: String = '';
    // userCoverImg: string = 'assets/img/userCoverImg1.png';
    userProfileImg: string = '../../../../assets/img/user_image.png';
    userName: String = '';
    aboutUser: String = '';
    isProvider: boolean = false;
    // this.userData.getUserInformations().isProvider;
    userLabel: string;

    carrierDatas: string = 'Not avilable';

    message: string = '\<b>Error\</b>\<br>Someone was not going. This option is not available.';


    // 
    fileToUpload: string = '';
    current_user: any;
    // 
    profile_image: File;

    sendingForm: boolean = false;

    fileUrl: string = environment.filesUrl;
    defaultImg: string = "assets/imgs/default-avatar.jpg";

    constructor(
        private formBuilder: FormBuilder,
        // private userService: UserService,
        // public authService: AuthService,
        private userData: UserService,
        private authService:AuthService,
        private providerService:ProviderService,
        public router: Router,
        public ngZone: NgZone,
        private local_storage: UserlocalstorageService,
        private sanitizer: DomSanitizer,
        private notification: NotificationService) {
        // this.user["name"] = `${this.userService.user.firstName} ${this.userService.user.lastName}`;
    }

    ngOnInit() {

        this.local_storage.dataUser.subscribe((data: any) => {
            // console.log(data.user)
            this.current_user = data.user
        })

        this.authService.currentUserSubject.subscribe((user: Provider) => {
            // this.userEmail = user.adresse.email;
            // this.firstName = user.firstname;
            // this.lastName = user.lastname;
            // this.name = user.getSimpleName().toString();
            // this.userAddress = user.adresse.address;
            // this.userCity = user.adresse.city;
            // this.userCountry = user.adresse.country;
            // this.userZip = '';
            // this.userPhone = user.adresse.phone;
            // this.userName = user.username;
            // this.aboutUser = user.about;
            // this.isProvider = user.isProvider.valueOf();
            this.user.picture = user.picture;
            // console.log(user) 
            this.getUserById(user._id);
        })
        this.providerService.currentServiceOfProvider.subscribe((service:ServiceOfProvider)=>{
            this.userService=service;
        })
        
        // console.log(this.userData.getUserInformations().field_firstname);
        // this.users = [this.userService.user];
        this.updateProfilForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userAddress: ['', Validators.required],
            userName: ['', Validators.required],
            aboutUser: ['', Validators.required],
            userPhone: ['', Validators.required],
            userEmail: ['', [Validators.required, Validators.email]],
            // userCity: ['', Validators.required],
            // userCountry: ['', Validators.required],
            // userZip: ['', Validators.required],
        });
    }

    getUserById(id: String){
        this.userData.getUser(id).then((user)=>{
            console.log(user)
            // console.log(user.adresse.phone)
            this.updateProfilForm.patchValue({
                firstName: user.firstname,
                userEmail: user.adresse.email,
                lastName: user.lastname,
                userAddress: user.adresse.address,
                userName: user.username,
                aboutUser: user.about,
                userPhone: user.adresse.phone,
            });
            this.userName = user.username;
            this.name = user.getSimpleName().toString();
            this.userCity = user.adresse.city;
            this.userCountry = user.adresse.country;
            this.userZip = '';
            this.isProvider = user.isProvider.valueOf();
            this.user=user;
        }).catch((error)=>{
            console.log(error)
        })
    }
    // convenience getter for easy access to form fields
    get f() { return this.updateProfilForm.controls; }

    async onSubmit() {
        console.log(this.updateProfilForm.value)
        // console.log(this.updateProfilForm.value.firstName)
        this.submitted = true;
        // console.log(this.updateProfilForm.value)
        // stop here if form is invalid
        if (this.updateProfilForm.invalid) {
            return;
        } 
        this.sendingForm = true;
        const user: any = {
            "firstname": this.updateProfilForm.value.firstName,
            "lastname": this.updateProfilForm.value.lastName,
            "username": this.updateProfilForm.value.userName,
            "address.address": this.updateProfilForm.value.userAddress,
            "about": this.updateProfilForm.value.aboutUser,
            // "address.phone": this.updateProfilForm.value.userPhone,
            // "address.email": this.updateProfilForm.value.userEmail
        }
        // this.notification.showNotification('top', 'center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>This service was not available now. Tray later.');
        try {
            const res = await this.userData.update_user_info(this.current_user._id, user)
            if(res){
                console.log(res);
                // this.userData.emit_local_user(res)
                this.getUserById(user._id);
                this.sendingForm = false;
                this.showMessage("Success");
            }
        } catch (error) {
            console.log(error);
            this.showMessage("Error");
            this.sendingForm = false;
            
        }
    }

    showMessage(message: string = "This service was not available now. Tray later."){
        this.notification.showNotification('top','center', 'danger', 'pe-7s-close-circle', '\<b>Sorry\</b>\<br>'+message);
    }


    // 
    handleFileInput(filess: any) { 
        // this.fileToUpload = files.item(0);
        let files = filess;
        let fileToUp : any;
        if (files) {
            // for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.fileToUpload = (e.target.result);
                    fileToUp = ({picture:e.target.result});
                }            
                reader.readAsDataURL(files.item(0));
            // }
            // console.log(this.fileToUpload)
            // console.log(fileToUp)
        }
        this.fileUpload(filess)
    }

    async fileUpload(files: FileList | null) {
        if (files && files.length > 0) {
            const selectedFile = files[0]; // Assuming you are interested in the first selected file    
            if (selectedFile) {
                const response = await fetch(URL.createObjectURL(selectedFile));
                const blob = await response.blob();
                const newFile = new File([blob], selectedFile.name, { type: selectedFile.type });
        
                const imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile));
        
                // this.imagePath.push(imagePath);
                this.profile_image = newFile;
            }
        }
    }

    cancelPic(){this.fileToUpload = null}

    async uploadFileToActivity() {
        // console.log(this.fileToUpload)
        // console.log(this.profile_image)
        const formData = new FormData();
        formData.append('file', this.profile_image, this.profile_image.name);
        try {
            const res = await this.userData.Update_user_photo_(this.current_user._id, formData)
            if(res){
                // console.log(res);
                this.userData.emit_local_user(res)
                this.cancelPic()
            }
        } catch (error) {
            console.log(error);
        }
        // try {
        //     const res = await this.userData.update_user_info(this.current_user._id, {picture: this.fileToUpload})
        //     if(res){
        //         console.log(res);
        //         this.userData.emit_local_user(res)
        //         this.cancelPic()
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
    
    editPhone() {
        this.router.navigate(['profil/update-phone-number']);
    }
    
    editEmail() {
        this.router.navigate(['profil/update-email']);
    }
}
