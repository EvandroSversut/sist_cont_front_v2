import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PessoaFisica } from '../model/pessoa-fisica'; 
import { Observable } from 'rxjs';
import { PessoaJuridica } from '../model/pessoa-juridica';
import { JuridicaDTO } from '../dto/juridica.dto';

@Injectable({ providedIn: 'root' })
export class PessoaJuridicaService {
  private apiUrl = 'http://localhost:8080/api/pessoa-juridica/listar';
  private apiUr = 'http://localhost:8080/api/pessoa-juridica/salvar';

  constructor(private http: HttpClient) {}

  salvar(pessoaJur: JuridicaDTO): Observable<JuridicaDTO> {
    console.log('Enviando para o back-end:', pessoaJur.cnpj);
    console.log('Enviando para o back-end:', pessoaJur.inscEstadual);
    console.log('📦 Enviando pessoa para o back-end:', JSON.stringify(pessoaJur, null, 2));
    return this.http.post<PessoaJuridica>(this.apiUr, pessoaJur);
  }

  listar(): Observable<JuridicaDTO[]> {
    return this.http.get<JuridicaDTO[]>(this.apiUrl);
  }

  excluir(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
