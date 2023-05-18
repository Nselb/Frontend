import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autorizador } from '../Interfaces/autorizador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorizadorService {

  private apiUrl: string = environment.endPoint + "Autorizador"

  constructor(private client: HttpClient) { }

  get(codigo: number, contrasena: string): Observable<Autorizador> {
    return this.client.get<Autorizador>(`${this.apiUrl}/${codigo}/${contrasena}`)
  }
}
