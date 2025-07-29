import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ibge {
  codIbge: string;
  nomeIbge: string;
  ufIbge: string;
}

@Injectable({ providedIn: 'root' })
export class IbgeService {
  private api = 'http://localhost:8080/api/ibge';

  constructor(private http: HttpClient) {}

  salvar(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  listar(): Observable<Ibge[]> {
  return this.http.get<Ibge[]>(this.api);
}

}
