import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { JuridicaDTO } from '../../dto/juridica.dto';
import { PessoaJuridicaService } from '../../services/pessoa-juridica.service';
import { PessoaJuridica } from '../../model/pessoa-juridica';
import { Pessoa } from '../../model/pessoa.model';
import { Produtos } from '../../model/produtos.model';
import { ComprasService } from '../../services/compras.service';
import { MatDialog } from '@angular/material/dialog';
import { BuscaFornecedorDialogComponent } from '../dialogs/busca-fornecedor-dialog.component';

@Component({
  selector: 'app-compras',
  standalone: true,
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
    MatTableModule
  ],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
// Importações necessárias...
export class ComprasComponent implements OnInit {
  
  formCompra!: FormGroup;

  fornecedorSelecionado!: PessoaJuridica; // ✅ Variável que guarda o fornecedor

  fornecedores: PessoaJuridica[] = []; // 	Lista completa vinda do backend
  fornecedoresFiltrados: PessoaJuridica[] = []; // Lista filtrada (autocomplete ou dialog)

  produtos: Produtos[] = [];
  produtosFiltrados: Produtos[] = [];

  produtoCtrl = new FormControl();
  quantidade: number = 1;
  valorUnitario: number = 0;

  itensCompra: any[] = [];
  dataSourceItens = new MatTableDataSource<any>();
  displayedColumns: string[] = ['produto', 'unidade', 'quantidade', 'valorUnitario', 'valorTotal', 'acoes'];

  constructor(private fb: FormBuilder, private service: ComprasService,
    private dialog: MatDialog    
  ) {}

  ngOnInit() {
    this.formCompra = this.fb.group({
      fornecedor: ['', Validators.required],
      dataCompra: ['', Validators.required],
      numeroNota: ['', Validators.required],
      serieNota: ['', Validators.required],
      descricaoNota: ['']
    });

    this.carregarFornecedores();
    this.carregarProdutos();

    this.produtoCtrl.valueChanges.subscribe(valor => {
      this.produtosFiltrados = this.produtos.filter(p => 
        p.nomeProduto.toLowerCase().includes(valor?.toLowerCase())
      );
    });
  }

  carregarFornecedores() {
    this.service.getFornecedores().subscribe(data => {
      this.fornecedores = data;
      this.fornecedoresFiltrados = data;
    });
  }

  abrirBuscaFornecedor() {
  // 🔥 Aqui você pode abrir um Dialog com uma tabela de fornecedores
  //alert('Abrir busca de fornecedor (aqui entra um Dialog futuramente)');
  const dialogRef = this.dialog.open(BuscaFornecedorDialogComponent, {
  width: '800px'  // 🔥 Aqui aumentamos o tamanho do dialog
});

dialogRef.afterClosed().subscribe(result => {
  if (result) {
    console.log('Fornecedor selecionado:', result);
     // 🔥 Aqui você decide: se quiser armazenar o objeto inteiro
      this.fornecedorSelecionado = result;

      // ✅ E preenche o campo no formulário
        this.formCompra.patchValue({ fornecedor: result.razaoSocial });
  }
});


}

  carregarProdutos() {
    this.service.getProdutos().subscribe(data => {
      this.produtos = data;
      this.produtosFiltrados = data;
    });
  }

  selecionaFornecedor(nome: string) {
    // Aqui você pode vincular o objeto fornecedor se desejar
  }

  selecionaProduto(nome: string) {
    const produtoSelecionado = this.produtos.find(p => p.nomeProduto === nome);
    if (produtoSelecionado) {
      this.valorUnitario = 0;
      this.quantidade = 1;
    }
  }

  adicionarItem() {
    const produtoSelecionado = this.produtos.find(p => p.nomeProduto === this.produtoCtrl.value);
    if (produtoSelecionado) {
      const valorTotal = this.quantidade * this.valorUnitario;
      const item = {
        produto: produtoSelecionado,
        quantidade: this.quantidade,
        valorUnitario: this.valorUnitario,
        valorTotal: valorTotal
      };
      this.itensCompra.push(item);
      this.dataSourceItens.data = this.itensCompra;

      this.produtoCtrl.setValue('');
      this.quantidade = 1;
      this.valorUnitario = 0;
    }
  }

  removerItem(item: any) {
    const index = this.itensCompra.indexOf(item);
    if (index >= 0) {
      this.itensCompra.splice(index, 1);
      this.dataSourceItens.data = this.itensCompra;
    }
  }

  salvar() {
    const compra = {
      fornecedor: this.formCompra.value.pessoaJuridica,
      dataCompra: this.formCompra.value.dataCompra,
      numeroNota: this.formCompra.value.numeroNota,
      serieNota: this.formCompra.value.serieNota,
      descricaoNota: this.formCompra.value.descricaoNota,
      itens: this.itensCompra
    };
   // this.service.salvarCompra(compra).subscribe(() => {
  //    alert('Compra salva com sucesso!');
  //  });
  }
}
