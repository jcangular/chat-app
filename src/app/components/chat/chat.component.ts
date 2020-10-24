import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatService } from '@services/chat.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    private chatMessages: HTMLDivElement;
    private messagesSubs: Subscription;
    private privateMessagesSubs: Subscription;
    public message: string;
    public messages: any[] = [];

    constructor(
        private chatService: ChatService,
        private wsService: WebSocketService
    ) { }

    ngOnInit(): void {
        this.chatMessages = document.getElementById('chatMessages') as HTMLDivElement;
        this.messagesSubs = this.chatService.getMessages()
            .subscribe(data => {
                data.pm = false;
                data.me = data.from === this.wsService.user.name;
                this.messages.push(data);
                setTimeout(() => {
                    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                }, 50);
            });

        this.privateMessagesSubs = this.chatService.getPrivateMessages()
            .subscribe(data => {
                data.pm = true;
                this.messages.push(data);
                setTimeout(() => {
                    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                }, 50);
            });
    }

    ngOnDestroy(): void {
        this.messagesSubs.unsubscribe();
        this.privateMessagesSubs.unsubscribe();
    }

    public sendMessage(): void {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

}
