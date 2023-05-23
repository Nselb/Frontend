import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trabajador } from '../Interfaces/trabajador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  private apiUrl: string = environment.endPoint + "Trabajadores"

  constructor(private client: HttpClient) { }

  get(sucursal: number): Observable<Trabajador[]> {
    return this.client.get<Trabajador[]>(`${this.apiUrl}/${sucursal}`)
  }

  insert(trabajador: Trabajador): Observable<Trabajador> {
    return this.client.post<Trabajador>(`${this.apiUrl}/Insert`, trabajador)
  }

  update(trabajador: Trabajador): Observable<Trabajador> {
    return this.client.put<Trabajador>(`${this.apiUrl}/Update`, trabajador)
  }

  delete(sucursal: number, codigo: string): Observable<Trabajador> {
    return this.client.delete<Trabajador>(`${this.apiUrl}/Delete/${sucursal}/${codigo}`)
  }
}
