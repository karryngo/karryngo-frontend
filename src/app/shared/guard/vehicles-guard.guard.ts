import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesGuardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise<UrlTree | boolean>((resolve,reject)=>{
        this.authService.currentUserSubject.subscribe((user)=>{
          if (user.isProvider && user.isAcceptedProvider) return resolve(true);
          else if(user.isProvider && !user.isAcceptedProvider) return resolve(this.router.parseUrl("/carrier/wait-acceptance"))
          return resolve(this.router.parseUrl("/carrier/be-carrier"))
        })
      })
  }
}
