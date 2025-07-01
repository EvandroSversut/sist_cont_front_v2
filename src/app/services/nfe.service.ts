import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaJuridica } from '../model/pessoa-juridica';
import { Produtos } from '../model/produtos.model';
import { Compras } from '../model/compras.model';
import { ComprasDTO } from '../model/itens-compra.model';


@Injectable({
  providedIn: 'root'
})
export class NfeService {
  private apiUrl = 'http://localhost:8080/api/nfe';

  constructor(private http: HttpClient) {}

  enviarXml(xml: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

    this.http.post(this.apiUrl, xml, { headers, responseType: 'text' })
      .subscribe({
        next: res => {
          console.log('✅ NF-e enviada com sucesso:', res);
          alert('NF-e enviada com sucesso!');
        },
        error: err => {
          console.error('❌ Erro ao enviar NF-e:', err);
          alert('Erro ao enviar NF-e.');
        }
      });
  }

  enviarNotaFiscal(dados: any) {
  this.http.post('http://localhost:8080/api/nfe/json', dados)
    .subscribe({
      next: res => alert('NF-e enviada com sucesso!'),
      error: err => alert('Erro ao enviar a NF-e')
    });
}

}