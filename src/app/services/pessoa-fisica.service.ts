import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PessoaFisica } from '../model/pessoa-fisica'; 
import { Observable } from 'rxjs';
import { PessoaUsuarioDTO } from '../dto/pessoa.usuario.dto';

@Injectable({ providedIn: 'root' })
export class PessoaFisicaService {
  private apiUrl = 'http://localhost:8080/api';
  private apiBuscar = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

    // 🔹 Salvar (Criar)
  salvar(pessoa: PessoaFisica): Observable<PessoaFisica> {
    console.log('Enviando para o back-end:', pessoa.cpf);
    console.log('Enviando para o back-end:', pessoa.email);
    console.log('📦 Enviando pessoa para o back-end:', JSON.stringify(pessoa, null, 2));
    return this.http.post<PessoaFisica>(`${this.apiUrl}/criar-usuario`, pessoa); // ✅ AGORA CORRETO
  }

   // 🔸 Atualizar (Editar)
  atualizar(dto: PessoaUsuarioDTO): Observable<any> {
    //return this.http.put(`${this.apiUrl}/atualizar-usuario`, dto);
    const url = `${this.apiUrl}/atualizar-usuario`;
    console.log('🔗 URL final chamada:', url); // 🪵 debug
    console.log('✅ Chamando PUT:', `${this.apiUrl}/atualizar-usuario`);
    return this.http.put(`${this.apiUrl}/atualizar-usuario`, dto);
  }

  // 📄 Listar tudo
  listar(): Observable<PessoaFisica[]> {
    return this.http.get<PessoaFisica[]>(this.apiUrl);
  }

  // pessoa-fisica.service.ts
buscar(filtro: string) {
  const url = filtro 
    ? `${this.apiBuscar}/buscar?filtro=${filtro}`
    : `${this.apiBuscar}/listar`;

  return this.http.get<any[]>(url);
}


 // 🚮 Excluir
excluir(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}
