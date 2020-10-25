import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public name = '';

    constructor(
        private wsService: WebSocketService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Limpia el usuario del storage.
        this.wsService.logout();
    }

    public login(): void {
        if (!this.name || this.name.length <= 0) { return; }
        this.wsService.login(this.name).then(resp => {
            this.router.navigateByUrl('/chat');
        });
    }

}
