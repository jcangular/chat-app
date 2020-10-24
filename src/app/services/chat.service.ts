import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WebSocketService } from '@services/web-socket.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private wsService: WebSocketService) { }

    public sendMessage(message: string): void {
        if (!message || message.length <= 0) { return; }
        const data = {
            from: this.wsService.user.name,
            message
        };
        this.wsService.emit('message', data);
    }

    public getMessages(): Observable<any> {
        return this.wsService.listen('messages');
    }
}
