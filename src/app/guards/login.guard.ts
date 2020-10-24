import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        public wsService: WebSocketService,
        public router: Router
    ) { }

    canActivate(): boolean {
        if (sessionStorage.getItem('user')) {
            return true;
        } else {
            this.router.navigateByUrl('/');
            return false;
        }
    }

}
