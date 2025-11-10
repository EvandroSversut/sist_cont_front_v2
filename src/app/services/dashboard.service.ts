import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/dashboard'; // URL base do back-end

  constructor(private http: HttpClient) { }

  /**
   * Retorna o resumo das vendas (total de vendas, quantidade de notas, etc.)
   */
  getResumoVendas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vendas`);
  }
}
