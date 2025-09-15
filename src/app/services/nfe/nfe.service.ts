// nfe/nfe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  enviarNotaFiscal(nfe: any): Observable<any> {
    const endpoint = `${this.apiUrl}/salvar`;
   console.log('📡 Enviando para endpoint:', endpoint);
  return this.http.post(endpoint, nfe);
}

getNotasSalvas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/listar`);
}


}