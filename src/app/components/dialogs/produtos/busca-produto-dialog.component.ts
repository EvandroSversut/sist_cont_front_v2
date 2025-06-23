import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ProdutoService } from '../../../services/produto.service';
import { PessoaJuridica } from '../../../model/pessoa-juridica';
import { Produtos } from '../../../model/produtos.model';



@Component({
  selector: 'app-busca-produto-dialog',
  standalone: true,
  templateUrl: './busca-produto-dialog.component.html',
  styleUrls: ['./busca-produto-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class BuscaProdutoDialogComponent {
  produto: Produtos [] = [];
  produtosFiltrados: Produtos[] = [];
  filtro = '';

  constructor(
    public dialogRef: MatDialogRef<BuscaProdutoDialogComponent>,
    private service: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.service.listar().subscribe(data => {
      this.produto = data;
      this.produtosFiltrados = data;
    });
  }

    aplicarFiltro() {
    const valor = this.filtro.trim().toLowerCase();
     console.info('Teste busca produto');
     console.info(this.produtosFiltrados);
    this.produtosFiltrados = this.produto.filter(f => 
      f.nomeProduto.toLowerCase().includes(valor) 
    );
   
  }
  

  selecionar(produto: Produtos) {
    this.dialogRef.close(produto);
  }

  fechar() {
    this.dialogRef.close();
  }
}
