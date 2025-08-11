import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ibge {
  ufIbge: string;
  codIbgeCompl: string;
  nomeUf: string;
  nomeMun: string;
  codUf: string;
  regiao: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class IbgeService {
  private apiUrl = 'http://localhost:8080/api/ibge';

  constructor(private http: HttpClient) {}

  listar(filtro: string = '', page: number = 0, size: number = 10): Observable<PageResponse<Ibge>> {
    let params = new HttpParams()
      .set('filtro', filtro)
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<Ibge>>(this.apiUrl, { params });
  }

  salvar(ibge: Ibge): Observable<Ibge> {
    return this.http.post<Ibge>(this.apiUrl, ibge);
  }
}
