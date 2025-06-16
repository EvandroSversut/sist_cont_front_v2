import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { PessoaUsuarioDTO } from '../dto/pessoa.usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: PessoaUsuarioDTO): Observable<any> {
    return this.http.post<Usuario>(`${this.apiUrl}/criar-usuario`, usuario);
  }
}
