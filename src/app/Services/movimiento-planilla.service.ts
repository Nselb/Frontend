import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovimientoPlanilla } from '../Interfaces/movimiento-planilla';

@Injectable({
  providedIn: 'root'
})
export class MovimientoPlanillaService {

  private apiUrl: string = environment.endPoint + "MovimientoPlanilla"

  constructor(private client: HttpClient) { }

  getAll(): Observable<MovimientoPlanilla[]> {
    return this.client.get<MovimientoPlanilla[]>(`${this.apiUrl}`)
  }

  get(descripcion: string): Observable<MovimientoPlanilla[]> {
    return this.client.get<MovimientoPlanilla[]>(`${this.apiUrl}/Search?descripcion=${descripcion}`)
  }

  insert(centro: MovimientoPlanilla): Observable<MovimientoPlanilla> {
    return this.client.post<MovimientoPlanilla>(`${this.apiUrl}/Insert`, centro)
  }

  update(centro: MovimientoPlanilla): Observable<MovimientoPlanilla> {
    return this.client.put<MovimientoPlanilla>(`${this.apiUrl}/Update`, centro)
  }

  delete(codigo: number, descripcion: string): Observable<MovimientoPlanilla> {
    return this.client.delete<MovimientoPlanilla>(`${this.apiUrl}/Delete/${codigo}/${descripcion}`)
  }
}
