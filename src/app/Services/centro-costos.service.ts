import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { CentroCostos } from '../Interfaces/centro-costos';

@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {

  private apiUrl: string = environment.endPoint + "CentroCostos"

  constructor(private client: HttpClient) { }

  getAll(): Observable<CentroCostos[]> {
    return this.client.get<CentroCostos[]>(`${this.apiUrl}`)
  }

  insert(centro: CentroCostos): Observable<CentroCostos> {
    return this.client.post<CentroCostos>(`${this.apiUrl}/Insert`, centro)
  }

  update(centro: CentroCostos): Observable<CentroCostos> {
    return this.client.put<CentroCostos>(`${this.apiUrl}/Update`, centro)
  }

  delete(codigo: number, descripcion: string): Observable<CentroCostos> {
    return this.client.delete<CentroCostos>(`${this.apiUrl}/Delete/${codigo}/${descripcion}`)
  }
}
