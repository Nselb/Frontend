import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoOperacion } from '../Interfaces/tipo-operacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoOperacionService {

  private apiUrl: string = environment.endPoint + "Varios/TipoOperacion"

  constructor(private client: HttpClient) { }

  getAll(): Observable<TipoOperacion[]> {
    return this.client.get<TipoOperacion[]>(`${this.apiUrl}`)
  }
}
