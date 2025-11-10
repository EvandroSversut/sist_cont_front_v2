import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  resumo = {
    totalVendas: 0,
    totalNotas: 0,
    lucroBruto: 0,
    clientesAtivos: 0,
    itensEstoque: 0
  };

  displayedColumns = ['data', 'descricao', 'valor', 'status'];
  atividades: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get('http://localhost:8080/dashboard/vendas')
    .subscribe((dados: any) => {
      // como o backend retorna { totalVendas, totalNotas }
      this.resumo.totalVendas = dados.totalVendas ?? 0;
      this.resumo.totalNotas = dados.totalNotas ?? 0;
      this.resumo.clientesAtivos = dados.totalClientes ?? 0,
      // se quiser, zere as atividades (até ter endpoint real)
      this.atividades = [];
    });

 }
}