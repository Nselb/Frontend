import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MovimientoExcepcion } from '../Interfaces/movimiento-excepcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosExcepcionService {

  private apiUrl: string = environment.endPoint + "Varios/MovimientosExcepcion"

  constructor(private client: HttpClient) { }

  getMov1y2(): Observable<MovimientoExcepcion[]> {
    return this.client.get<MovimientoExcepcion[]>(`${this.apiUrl}1y2`)
  }
  getMov3(): Observable<MovimientoExcepcion[]> {
    return this.client.get<MovimientoExcepcion[]>(`${this.apiUrl}3`)
  }
  getMov1y2ById(id: string): string {
    switch (id.trim()) {
      case 'Horas Mov Planilla':
        return 'H';
      case 'Si Movimiento Planilla':
        return 'M';
      default:
        return 'C';
    }
  }
  getMov3ById(id: string): string {
    switch (id.trim()) {
      case 'No Aplica':
        return 'N';
      case 'Costa':
        return 'C';
      case 'Sierra':
        return 'S';
      case 'No Procesar':
        return 'X';
      default:
        return '';
    }
  }

}
