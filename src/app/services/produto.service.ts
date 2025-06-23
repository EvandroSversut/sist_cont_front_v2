import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produtos } from "../model/produtos.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

    private apiUrl = 'http://localhost:8080/api/produtos'; // 🔥 Ajuste a URL conforme seu backend

  constructor(private http: HttpClient) { }

  // 🔍 Buscar produtos
  listar(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.apiUrl}/listar`);
  }

   // 👉 Método buscar com filtro (opcional)
  buscar(filtro: string = ''): Observable<Produtos[]> {
    const url = filtro ? `${this.apiUrl}?filtro=${filtro}` : this.apiUrl;
    return this.http.get<Produtos[]>(url);
  }
 
salvar(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(`${this.apiUrl}/salvar`, produto);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletar/${id}`);
  }

  buscarPorId(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(`${this.apiUrl}/${id}`);
  }
}