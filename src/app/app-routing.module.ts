import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

import { LoginComponent } from './pages/login/login.component';
import { RoomComponent } from './pages/room/room.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'chat', component: RoomComponent, canActivate: [LoginGuard] },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
