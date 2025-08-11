import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CnpjService {
  constructor(private http: HttpClient) {}

  buscarCnpj(cnpj: string): Observable<any> {
    // Remove caracteres que não são números
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    const url = `https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`;
    console.log('🌐 Consultando CNPJ:', url);
    return this.http.get(url);
  }
}
