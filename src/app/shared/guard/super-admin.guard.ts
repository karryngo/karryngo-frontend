import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Privilege } from '../entity/privilege';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
    constructor( 
        private authService: AuthService,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<UrlTree | boolean>((resolve,reject)=>{
            this.authService.currentUserSubject.subscribe((user)=>{
                if(user.accountType == "super_admin")  return resolve(true);
                // else if(user.isProvider && !user.isAcceptedProvider) return resolve(this.router.parseUrl("/mykarryngo"))
                resolve(this.router.parseUrl("/mykarryngo"))
            })
        })
    }
    
}

@Injectable({
    providedIn: 'root'
})
export class ManagementGuard implements CanActivate {
    constructor( 
        private authService: AuthService,
        private router: Router
    ) { }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<UrlTree | boolean>((resolve,reject)=>{
            let user = JSON.parse(localStorage.getItem("user"))
                if(user.accountType == "super_admin")  return resolve(true);
                else if(user.privileges?.includes(Privilege.ACCEPT_PROVIDER)) return resolve(true);
                resolve(this.router.parseUrl("/mykarryngo"))
        })
    }
    
}


@Injectable({
    providedIn: 'root'
})
export class CountryAdminGuard implements CanActivate {
    constructor( 
        private authService: AuthService,
        private router: Router
    ) { }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<UrlTree | boolean>((resolve,reject)=>{
            let user = JSON.parse(localStorage.getItem("user"))
                if(user.accountType == "admin_manager")  return resolve(true);
                else if(user.privileges?.includes(Privilege.ACCEPT_PROVIDER)) return resolve(true);
                resolve(this.router.parseUrl("/mykarryngo"))
        })
    }
    
}