import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PessoaUsuario } from '../model/pessoa-usuario';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PessoaUsuarioService {
  private apiUrl = 'http://localhost:8080/api/pessoa-fisica/completo';

  constructor(private http: HttpClient) {}

  cadastrar(dados: PessoaUsuario): Observable<string> {
           console.info('Enviando para o back-end:', dados);
    return this.http.post(this.apiUrl, dados, { responseType: 'text' });
  }
}
