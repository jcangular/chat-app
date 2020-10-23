import { Component } from '@angular/core';
import { WebSocketService } from '@services/web-socket.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    constructor(public wsService: WebSocketService) { }
}
