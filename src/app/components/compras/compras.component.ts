import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PessoaJuridica } from '../../model/pessoa-juridica';
import { Produtos } from '../../model/produtos.model';
import { ComprasService } from '../../services/compras.service';
import { BuscaFornecedorDialogComponent } from '../dialogs/fornecedor/busca-fornecedor-dialog.component';
import { BuscaProdutoDialogComponent } from '../dialogs/produtos/busca-produto-dialog.component';
import { ComprasDTO } from '../../model/itens-compra.model';
import { EmitenteFormComponent } from "../nfe/emitente-form.component";
import { JuridicaDTO } from '../../dto/juridica.dto';

@Component({
  selector: 'app-compras',
  standalone: true,
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
]
})
export class ComprasComponent implements OnInit {

  formCompra!: FormGroup;
  formItem!: FormGroup;

  fornecedorSelecionado!: PessoaJuridica;
  fornecedores: JuridicaDTO[] = [];
  fornecedoresFiltrados: JuridicaDTO[] = [];
  produtoSelecionado!: Produtos;
  produtos: Produtos[] = [];
  produtosFiltrados: Produtos[] = [];

  produtoCtrl = new FormControl();

  itensCompra: any[] = [];
  dataSourceItens = new MatTableDataSource<any>();
  displayedColumns: string[] = ['produto', 'unidade', 'quantidade', 'valorUnitario', 'desconto', 'valorTotal', 'acoes'];

  // parametros para a tabela de compras realizadas/salvas
  todasCompras: any[] = [];
  dataSourceCompras = new MatTableDataSource<any>();
  displayedColumnsCompras: string[] = ['fornecedor', 'data', 'numeroNota', 'valorTotal', 'acoes'];

  idCompraEmEdicao: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ComprasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formCompra = this.fb.group({
      fornecedor: ['', Validators.required],
      dataCompra: ['', Validators.required],
      numeroNota: ['', Validators.required],
      serieNota: ['', Validators.required],
      descricaoNota: ['']  // agora presente
    
    });

    this.formItem = this.fb.group({
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valorUnitario: [null, [Validators.required, Validators.min(0)]], // começa vazio
      desconto: [0, [Validators.min(0)]],  // ✅ campo novo
      valorTotal: [{ value: 0, disabled: true }]
    });

    this.carregarFornecedores();
    this.carregarProdutos();
    this.carregarComprasSalvas();
    this.limparFormulario();

      this.produtoCtrl.valueChanges.subscribe(valor => {
      this.produtosFiltrados = this.produtos.filter(p =>
        p.nomeProduto.toLowerCase().includes((valor || '').toLowerCase())
      );
    });

    // isso aqui faz o calculo da qde x vrUnitario ao mudar o input: "valueChanges" faz isso
    this.formItem.get('quantidade')!.valueChanges.subscribe(() => this.atualizaValorTotal());
    this.formItem.get('valorUnitario')!.valueChanges.subscribe(() => this.atualizaValorTotal());
    this.formItem.get('desconto')!.valueChanges.subscribe(() => this.atualizaValorTotal());
  }

  carregarComprasSalvas(){
    this.service.listarCompras().subscribe(data => {
      console.log('🟦 Compras recebidas do backend:', data); // ✅ PRINT
      this.todasCompras = data;
      this.dataSourceCompras.data = data;
    });
  }

  carregarFornecedores() {
    this.service.getFornecedores().subscribe(data => {
      this.fornecedores = data;
      this.fornecedoresFiltrados = data;
    });
  }

  carregarProdutos() {
    this.service.getProdutos().subscribe(data => {
      this.produtos = data;
      this.produtosFiltrados = data;
    });
  }

  abrirBuscaFornecedor() {
    const dialogRef = this.dialog.open(BuscaFornecedorDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fornecedorSelecionado = result;
        this.formCompra.patchValue({ fornecedor: result.razaoSocial });
      }
    });
  }

  abrirBuscaProduto() {
    const dialogRef = this.dialog.open(BuscaProdutoDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produtoSelecionado = result;
        this.produtoCtrl.setValue(result.nomeProduto);
        this.formItem.patchValue({
          valorUnitario: result.valorUnitario || 0,
          quantidade: 1
        });
        this.atualizaValorTotal();
      }
    });
  }

  selecionaProduto(nome: string) {
    const produto = this.produtos.find(p => p.nomeProduto === nome);
    if (produto) {
      this.produtoSelecionado = produto;
      this.formItem.patchValue({
        valorUnitario: produto.valorUnitario || 0,
        quantidade: 1
      });
      this.atualizaValorTotal();
    }
  }

  atualizaValorTotal() {
    const qtde = this.formItem.get('quantidade')!.value || 0;
    const unit = this.formItem.get('valorUnitario')!.value || 0;
    const desconto = this.formItem.get('desconto')!.value || 0;
    const total = (qtde * unit) - desconto;
    this.formItem.get('valorTotal')!.setValue(total >= 0 ? total : 0);
  }

  adicionarItem() {
    if (!this.produtoSelecionado) {
      alert('Selecione um produto!');
      return;
    }

    const item = {
      produto: this.produtoSelecionado,
      quantidade: this.formItem.get('quantidade')!.value,
      valorUnitario: this.formItem.get('valorUnitario')!.value,
      desconto: this.formItem.get('desconto')!.value,
      valorTotal: this.formItem.get('valorTotal')!.value
    };

    this.itensCompra.push(item);
    this.dataSourceItens.data = [...this.itensCompra];

    this.produtoSelecionado = undefined!;
    this.produtoCtrl.setValue('');
    this.formItem.reset({ quantidade: 1, valorUnitario: null, desconto: 0, valorTotal: 0 });;
  }

  // 🔥 Calcular o Valor Total da Compra (todos os itens):
  get valorTotalCompra(): number {
  return this.itensCompra.reduce((soma, item) => soma + (item.valorTotal || 0), 0);
}

  removerItem(item: any) {
    const index = this.itensCompra.indexOf(item);
    if (index >= 0) {
      this.itensCompra.splice(index, 1);
      this.dataSourceItens.data = [...this.itensCompra];
    }
  }

  salvarCompra() {
  if (!this.fornecedorSelecionado) {
    alert('Selecione um fornecedor!');
    return;
    }

  if (this.itensCompra.length === 0) {
    alert('Adicione pelo menos um item!');
    return;
  }

const compra: ComprasDTO = {
  pessoaJuridica: { id: this.fornecedorSelecionado?.id ?? 0 },
  dataCompra: this.formCompra.get('dataCompra')?.value ?? new Date(),
  numeroNota: this.formCompra.get('numeroNota')?.value ?? '',
  serieNota: this.formCompra.get('serieNota')?.value ?? '',
  descricaoNota: this.formCompra.get('descricaoNota')?.value ?? '',
  valorDesconto: this.itensCompra.reduce((acc, item) => acc + (item.desconto ?? 0), 0),
  valorIcms: 0,
  valorTotal: this.valorTotalCompra ?? 0,
  itens: this.itensCompra.map(item => ({
    produto: { id: item.produto.id },
    quantidade: item.quantidade ?? 0,
    valorUnitario: item.valorUnitario ?? 0,
    desconto: item.desconto ?? 0,
    valorTotal: item.valorTotal ?? 0
  }))
};


   // ✅ Aqui você imprime no console:
  console.log('📦 Dados da compra sendo enviados:', JSON.stringify(compra, null, 2));

  if (this.idCompraEmEdicao) {
  this.service.atualizarCompra(this.idCompraEmEdicao, compra).subscribe({
    next: () => {
      alert('Compra atualizada com sucesso!');
      this.limparFormulario();
      this.carregarComprasSalvas();
    },
    error: () => {
      alert('Erro ao atualizar a compra.');
    }
  });
} else {
  this.service.salvarCompra(compra).subscribe({
    next: () => {
      alert('Compra salva com sucesso!');
      this.limparFormulario();
      this.carregarComprasSalvas();
    },
    error: () => {
      alert('Erro ao salvar a compra.');
    }
  });
 }
}

limparFormulario() {
  this.formCompra.reset();
  this.formItem.reset({ quantidade: 1, valorUnitario: null, desconto: 0, valorTotal: 0 });
  this.fornecedorSelecionado = undefined!;
  this.produtoSelecionado = undefined!;
  this.produtoCtrl.setValue('');
  this.itensCompra = [];
  this.dataSourceItens.data = [];
  this.idCompraEmEdicao = null; // reseta o ID
}

editarCompra(compra: any) {
   this.idCompraEmEdicao = compra.id; // ✅ Guarda o ID da compra

   // Preenche o formulário da nota
  this.formCompra.patchValue({
    fornecedor: compra.pessoaJuridica?.razaoSocial,
    dataCompra: compra.dataCompra,
    numeroNota: compra.numeroNota,
    serieNota: compra.serieNota,
    descricaoNota: compra.descricaoNota
  });

  // Armazena o fornecedor selecionado (para manter ID)
  this.fornecedorSelecionado = compra.pessoaJuridica;

  // Preenche os itens na tabela de edição
  this.itensCompra = compra.itens.map((item: any) => ({
    produto: item.produto,
    quantidade: item.quantidade,
    valorUnitario: item.valorUnitario,
    desconto: item.desconto,
    valorTotal: item.valorTotal
  }));

  this.dataSourceItens.data = [...this.itensCompra];

  console.log('✏️ Compra carregada para edição:', compra);
}

}
