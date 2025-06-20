import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produtos } from "../model/produtos.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

    private apiUrl = 'http://localhost:8080/api'; // 🔥 Ajuste a URL conforme seu backend

  constructor(private http: HttpClient) { }

  // 🔍 Buscar fornecedores
  getProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.apiUrl}/pessoa-juridica/listar`);
  }
 


}
