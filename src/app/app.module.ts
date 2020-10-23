import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { environment } from '@environments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ChatComponent } from '@components/chat/chat.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RoomComponent } from './pages/room/room.component';

const config: SocketIoConfig = { url: environment.wsURL, options: {} };

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        ChatComponent,
        UserListComponent,
        LoginComponent,
        RoomComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
