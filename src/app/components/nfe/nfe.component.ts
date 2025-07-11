// 📁 src/app/components/nfe/nfe.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmitenteFormComponent } from './emitente-form.component';
import { DestinatarioFormComponent } from './destinatario-form.component';
import { ProdutoFormComponent } from './produto-form.component';
import { ProdutosTabelaComponent } from './produtos-tabela.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TotaisResumoComponent } from './totais-resumo.component';
import { TransporteFormComponent } from './transporte-form.component';
import { PagamentoFormComponent } from './pagamento-form';
import { NfeXmlService } from './nfe-xml.service';
import { MatIconModule } from '@angular/material/icon';
import { NfeService } from '../../services/nfe.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GeraisNfeComponent } from "./geraisNfe-form.component";



@Component({
  selector: 'app-nfe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    EmitenteFormComponent,
    DestinatarioFormComponent,
    ProdutoFormComponent,
    ProdutosTabelaComponent,
    TotaisResumoComponent, // ✅ aqui
    TransporteFormComponent,
    PagamentoFormComponent,
    MatIconModule,
    MatFormFieldModule,
    GeraisNfeComponent
],
  template: `
    <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold">Emissão de Nota Fiscal Eletrônica (NF-e)</h1>

     <!-- Seção: Dados Gerais da NF - basicos -->
     <h2 class="text-lg font-semibold mt-4"><mat-icon class="mr-2">person</mat-icon> Dados Gerais - basicos</h2>
    <app-geraisNfe-form [formGeral]="formGeral"></app-geraisNfe-form>
            
    <!-- Seção: Emitente -->
     <h2 class="text-lg font-semibold mt-4"><mat-icon class="mr-2">person</mat-icon> Emitente</h2>
    <app-emitente-form [formEmitente]="formEmitente"></app-emitente-form>

    <!-- Seção: Destinatário -->
     <h2 class="text-lg font-semibold mt-4">Destinatário</h2>
    <app-destinatario-form [formDestinatario]="formDestinatario"></app-destinatario-form>

    <!-- Seção: Produtos -->
     <h2 class="text-lg font-semibold mt-4">Produtos</h2>
    <app-produto-form (produtoAdicionado)="adicionarProduto($event)"></app-produto-form>
    <app-produtos-tabela [produtos]="produtos" (excluirProduto)="removerProduto($event)"></app-produtos-tabela>

    <!-- Seção: Totais da Nota -->
    <h2 class="text-lg font-semibold mt-4">Total da Nota Fiscal</h2>
    <app-totais-resumo [produtos]="produtos"></app-totais-resumo>

    <!-- Seção: Transporte -->
    <h2 class="text-lg font-semibold mt-4">Transporte</h2>
    <app-transporte-form [formTransporte]="formTransporte"></app-transporte-form>

    <!-- Seção: Pagamento -->
     <h2 class="text-lg font-semibold mt-4">Pagamento</h2>
    <app-pagamento-form [formPagamento]="formPagamento"></app-pagamento-form>

    <!-- Ações -->
    <div class="flex gap-4">
      <button mat-raised-button color="primary" (click)="salvarNfe()">Salvar NF-e</button>
      <button mat-raised-button color="accent" (click)="emitirNfe()">Emitir NF-e</button>
    </div>
  </div>
`

})
export class NfeComponent {
  formGeral: FormGroup;
  formEmitente: FormGroup;
  formDestinatario: FormGroup;
  formTransporte: FormGroup;
  formPagamento: FormGroup;

  // @Output() buscarFornecedor = new EventEmitter<void>();

  produtos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private xmlService: NfeXmlService,
    private nfeService: NfeService // ✅ injeção do service
   ) {

    this.formGeral = this.fb.group({
      
    })

    this.formEmitente = this.fb.group({
      cnpj: ['12345678000199', Validators.required],
      razaoSocial: ['Empresa Emitente Ltda', Validators.required],
      nomeFantasia: ['', Validators.required],       
      ie: ['12345678', Validators.required],
      uf: ['SP', Validators.required],
      municipio: ['São Paulo', Validators.required],
      crt: ['1', Validators.required],
      cnae: ['', Validators.required]       
    });

    this.formDestinatario = this.fb.group({
      cnpj: ['98765432000199', Validators.required],
    razaoSocial: ['Cliente Destinatário SA', Validators.required],
    ie: ['87654321', Validators.required],
    uf: ['RJ', Validators.required],
    municipio: ['Rio de Janeiro', Validators.required],
    indIEDest: ['9', Validators.required]
    });

    this.formTransporte = this.fb.group({
   modFrete: ['1', Validators.required],
    transportadora: ['Transportadora XYZ'],
    cnpjTransportadora: ['55667788000199'],
    placaVeiculo: ['ABC1D23'],
    ufPlaca: ['SP'],
    valorFrete: [100]
  });

    this.formPagamento = this.fb.group({
    formaPagamento: ['03', Validators.required],
    valorPago: [500, Validators.required],
    valorTroco: [0]
  });

   // ✅ Mock inicial dos produtos
  this.produtos = [
  {
    descricao: 'Produto Teste 1',
    quantidade: 2,
    valorUnitario: 50,
    desconto: 5,
    aliquotaIcms: 12,
    valorTotal: 95 // Exemplo: (50 * 2) - 5
  },
  {
    descricao: 'Produto Teste 2',
    quantidade: 1,
    valorUnitario: 200,
    desconto: 0,
    aliquotaIcms: 18,
    valorTotal: 200 // Exemplo: (200 * 1) - 0
  }
];

  }

  adicionarProduto(produto: any) {
    this.produtos.push(produto);
    console.log('➕ Produto adicionado:', produto);
    
  }

  removerProduto(index: number) {
    const removido = this.produtos.splice(index, 1);
    console.log('🗑️ Produto removido:', removido);
  }

  salvarNfe() {
    if (this.formEmitente.invalid || this.formDestinatario.invalid || this.produtos.length === 0) {
      alert('Preencha todos os dados corretamente e adicione pelo menos um produto.');
      return;
    }

    console.log('📤 Emitente:', this.formEmitente.value);
    console.log('📤 Destinatário:', this.formDestinatario.value);
    console.log('📦 Produtos:', this.produtos);
    console.log('🚚 Transporte:', this.formTransporte.value);
    console.log('💵 Pagamento:', this.formPagamento.value);
  
    // No futuro: enviar todos os dados para o backend
  }

  emitirNfe() {
  const dadosNota = {
    emitente: this.formEmitente.value,
    destinatario: this.formDestinatario.value,
    produtos: this.produtos,
    transporte: this.formTransporte.value,
    pagamento: this.formPagamento.value
  };
    console.log('📄 XML Gerado:', dadosNota);

    this.nfeService.enviarNotaFiscal(dadosNota);
  }
}
