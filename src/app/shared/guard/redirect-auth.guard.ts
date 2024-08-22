import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Provider } from '../entity/provider';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RedirectAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // return new Promise<boolean>((resolve,reject)=>{
            
        // let subs=this.authService.currentUserSubject.subscribe((user:Provider)=>{
        // }
        if(this.authService.isLoggedIn)
        {
            this.router.navigate(['dashboard'])
            return false;
        }
        return true;
    }
}
