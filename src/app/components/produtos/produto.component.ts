import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from '../../services/produto.service';
import { Produtos } from '../../model/produtos.model';
import { MatTooltip } from '@angular/material/tooltip';
import { AjudaCestDialogComponent } from '../dialogs/cest/ajuda-cest-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produto',
  standalone: true,
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatTooltip,
    MatSelectModule, 
    ReactiveFormsModule
]
})
export class ProdutoComponent implements OnInit {

  produto: Produtos = {
    id: undefined,
    nomeProduto: '',
    unidade: '',
    ncm: '',
    descricao: '',
    valorUnitario: 0
  };

  produtos: Produtos[] = [];
  filtro = '';
  mensagemErro = '';

  displayedColumns: string[] = ['id', 'nomeProduto', 'unidade', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Produtos>();

  constructor(private service: ProdutoService,   private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe({
      next: data => {
        this.produtos = data;
        this.dataSource.data = data;
      },
      error: () => this.mensagemErro = 'Erro ao carregar produtos'
    });
  }

  salvar() {
    this.service.salvar(this.produto).subscribe({
      next: () => {
        this.listar();
        this.novo();
      },
      error: () => this.mensagemErro = 'Erro ao salvar produto'
    });
  }

  editar(produto: Produtos) {
    this.produto = { ...produto };
  }

  excluir(id: number | undefined) {
    if (id && confirm('Deseja realmente excluir este produto?')) {
      this.service.deletar(id).subscribe({
        next: () => this.listar(),
        error: () => this.mensagemErro = 'Erro ao excluir produto'
      });
    }
  }

  novo() {
  this.produto = {
    id: undefined,
    nomeProduto: '',
    unidade: '',
    ncm: '',
    descricao: '',
    valorUnitario: 0  // <-- adicione aqui para não dar erro
  };
}

  buscar() {
    const termo = this.filtro.trim().toLowerCase();
    this.dataSource.data = this.produtos.filter(p =>
      p.nomeProduto.toLowerCase().includes(termo) ||
      p.unidade.toLowerCase().includes(termo) ||
      (p.descricao?.toLowerCase().includes(termo) ?? false)
    );
  }

    abrirDialogAjudaStPisCofins() {
      this.dialog.open(AjudaCestDialogComponent, {
        width: '600px',
        maxHeight: '100vh',
      });
    }
}
