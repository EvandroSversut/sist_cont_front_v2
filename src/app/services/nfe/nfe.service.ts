// nfe/nfe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NfeService {
  private apiUrl = `${environment.apiUrl}/nfe`;

  constructor(private http: HttpClient) { }

  emitir(nfeData: any) {
    return this.http.post(`${this.apiUrl}/emitir`, nfeData);
  }

  consultar(chave: string) {
    return this.http.get(`${this.apiUrl}/consultar/${chave}`);
  }

  listar() {
    return this.http.get(`${this.apiUrl}`);
  }
}