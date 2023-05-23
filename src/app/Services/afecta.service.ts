import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Afecta } from '../Interfaces/afecta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfectaService {

  private apiUrl: string = environment.endPoint + "Varios/Afecta"

  constructor(private client: HttpClient) { }

  getAfectaIess(): Observable<Afecta[]> {
    return this.client.get<Afecta[]>(`${this.apiUrl}IESS`)
  }
  getAfectaImpuestoRenta(): Observable<Afecta[]> {
    return this.client.get<Afecta[]>(`${this.apiUrl}ImpuestoRenta`)
  }
  getById(id: string): string {
    if (id === 'Si Aplica') {
      return '1'
    } else if (id === 'No Aplica') {
      return '0'
    }
    return id
  }
}
