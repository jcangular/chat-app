import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    public connected = false;
    public user: User = null;

    constructor(private socket: Socket) {
        this.loadUser();
        this.initStatus();
    }

    private initStatus(): void {
        this.socket.on('connect', () => {
            this.connected = true;
            console.log('¡Conectado al servidor!');
        });
        this.socket.on('disconnect', () => {
            this.connected = false;
            console.log('Desconectado del servidor!');
        });
    }

    /**
     * Emite un evento al servidor.
     * @param event el nombre del evento.
     * @param data la información que se envia al servidor.
     * @param callback la función de confirmación.
     */
    public emit(event: string, data?: any, callback?: (resp: any) => void): void {
        this.socket.emit(event, data, callback);
    }

    /**
     * Devuelve un observable para estar escuchando el evento.
     * @param event el tipo de evento a escuchar.
     */
    public listen(event: string): Observable<any> {
        return this.socket.fromEvent(event);
    }

    /**
     * Registra el usuario en el servidor.
     * @param name El nombre del usuario.
     */
    public login(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.emit('loginUser', { name }, resp => {
                this.user = new User(name);
                this.saveUser();
                resolve(resp);
            });
        });
    }

    saveUser(): void {
        sessionStorage.setItem('user', JSON.stringify(this.user));
    }

    loadUser(): void {
        if (sessionStorage.getItem('user')) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.login(this.user.name);
        }
    }
}
