import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatService } from '@services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    private chatMessages: HTMLDivElement;
    private messagesSubs: Subscription;
    public message: string;
    public messages: any[] = [];

    constructor(
        private chatService: ChatService
    ) { }

    ngOnInit(): void {
        this.chatMessages = document.getElementById('chatMessages') as HTMLDivElement;
        this.messagesSubs = this.chatService.getMessages()
            .subscribe(data => {
                this.messages.push(data);
                setTimeout(() => {
                    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                }, 50);
            });
    }

    ngOnDestroy(): void {
        this.messagesSubs.unsubscribe();
    }

    public sendMessage(): void {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

}
