import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class EmitenteService {
  constructor(private http: HttpClient) {}

  buscarEmitentes(filtro: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/emitentes?filtro=${filtro}`);
  }
}
