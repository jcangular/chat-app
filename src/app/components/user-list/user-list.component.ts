import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public usuarios: Observable<any>;

    constructor(
        private chatService: ChatService
    ) { }

    ngOnInit(): void {
        this.usuarios = this.chatService.getConnectedUsers();
    }

    public sendPrivateMessage(user): void {
    }

}
