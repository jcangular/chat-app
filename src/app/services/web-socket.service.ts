import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    public connected = false;

    constructor(private socket: Socket) {
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
     * @param callback 
     */
    public emit(event: string, data?: any, callback?: () => void): void {
        this.socket.emit(event, data, callback);
    }

    public listen(event: string): Observable<any> {
        return this.socket.fromEvent(event);
    }
}
