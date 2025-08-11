import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // cidade
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  buscarCep(cep: string): Observable<CepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    console.log('🌐 Fazendo requisição GET para:', url);
    return this.http.get<CepResponse>(url);
    // remover não dígitos do CEP
   // cep = cep.replace(/\D/g, '');
   // return this.http.get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
