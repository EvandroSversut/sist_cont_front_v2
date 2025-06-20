import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaJuridica } from '../model/pessoa-juridica';
import { Produtos } from '../model/produtos.model';
import { Compras } from '../model/compras.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private apiUrl = 'http://localhost:8080/api'; // 🔥 Ajuste a URL conforme seu backend

  constructor(private http: HttpClient) { }

  // 🔍 Buscar fornecedores
  getFornecedores(): Observable<PessoaJuridica[]> {
    return this.http.get<PessoaJuridica[]>(`${this.apiUrl}/pessoa-juridica/listar`);
  }

  // 🔍 Buscar produtos
  getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.apiUrl}/produtos`);
  }

  // 💾 Salvar compra (com os itens)
  salvarCompra(compra: Compras): Observable<any> {
    return this.http.post(`${this.apiUrl}/compras`, compra);
  }

  // 🔍 Buscar todas as compras (opcional)
  listarCompras(): Observable<Compras[]> {
    return this.http.get<Compras[]>(`${this.apiUrl}/compras`);
  }

  // 🔍 Buscar compra por id (opcional)
  buscarCompraPorId(id: number): Observable<Compras> {
    return this.http.get<Compras>(`${this.apiUrl}/compras/${id}`);
  }

  // ❌ Deletar compra (opcional)
  deletarCompra(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compras/${id}`);
  }
}
