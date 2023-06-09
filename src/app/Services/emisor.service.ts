import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { Emisor } from '../Interfaces/emisor';

@Injectable({
  providedIn: 'root'
})

export class EmisorService {

  private apiUrl: string = environment.endPoint + "Emisor"

  constructor(private client: HttpClient) { }

  getAll(): Observable<Emisor[]> {
    return this.client.get<Emisor[]>(`${this.apiUrl}`)
  }
}
