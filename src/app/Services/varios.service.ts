import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Info } from '../Interfaces/info';

@Injectable({
  providedIn: 'root'
})
export class VariosService {

  private apiUrl: string = environment.endPoint + "Varios"

  constructor(private client: HttpClient) { }

  getTipoTrabajador(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/TipoTrabajador`)
  }
  getGenero(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/Genero`)
  }
  getEstadoTrabajador(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/EstadoTrabajador`)
  }
  getTipoContrato(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/TipoContrato`)
  }
  getTipoCese(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/TipoCese`)
  }
  getEstadoCivil(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/EstadoCivil`)
  }
  getEsReingreso(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/EsReingreso`)
  }
  getTipoCuenta(): Observable<Info[]> {
    return this.client.get<Info[]>(`${this.apiUrl}/TipoCuenta`)
  }
}
