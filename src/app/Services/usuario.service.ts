import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string = environment.endPoint + "Usuarios"

  constructor(private client: HttpClient) { }

  get(codigo: number, contrasena: string): Observable<Usuario> {
    return this.client.get<Usuario>(`${this.apiUrl}/${codigo}/${contrasena}`)
  }
}
