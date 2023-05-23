import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Info } from '../Interfaces/info';
import { Afecta } from '../Interfaces/afecta';
import { TipoOperacion } from '../Interfaces/tipo-operacion';
import { MovimientoExcepcion } from '../Interfaces/movimiento-excepcion';

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
  getAfectaIess(): Observable<Afecta[]> {
    return this.client.get<Afecta[]>(`${this.apiUrl}IESS`)
  }
  getAfectaImpuestoRenta(): Observable<Afecta[]> {
    return this.client.get<Afecta[]>(`${this.apiUrl}ImpuestoRenta`)
  }
  getAfectaById(id: string): string {
    if (id === 'Si Aplica') {
      return '1'
    } else if (id === 'No Aplica') {
      return '0'
    }
    return id
  }
  getTipoOperacion(): Observable<TipoOperacion[]> {
    return this.client.get<TipoOperacion[]>(`${this.apiUrl}/TipoOperacion`)
  }
  getOperacionById(id: string): string {
    if (id === 'Egreso') {
      return 'E';
    }
    return 'I';
  }
  getMov1y2(): Observable<MovimientoExcepcion[]> {
    return this.client.get<MovimientoExcepcion[]>(`${this.apiUrl}/MovimientosExcepcion1y2`)
  }
  getMov3(): Observable<MovimientoExcepcion[]> {
    return this.client.get<MovimientoExcepcion[]>(`${this.apiUrl}/MovimientosExcepcion3`)
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
      default:
        return 'X';
    }
  }
}
