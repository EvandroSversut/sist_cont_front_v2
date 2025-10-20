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
import { NfeService } from '../../services/nfe/nfe.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GeraisNfeComponent } from "./geraisNfe-form.component";
import { MatTabsModule } from '@angular/material/tabs';
import { Produto } from '../../model/produto.model';
import { MatTableModule } from '@angular/material/table';



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
    MatTabsModule,
    MatTableModule,
    GeraisNfeComponent
],
  template: `

  <mat-tab-group>
  <mat-tab label="Dados Gerais">
    <app-geraisNfe-form [formGeral]="formGeral"></app-geraisNfe-form>
  </mat-tab>

  <mat-tab label="Emitente">
    <app-emitente-form [formEmitente]="formEmitente"></app-emitente-form>
  </mat-tab>

  <mat-tab label="Destinatário">
    <app-destinatario-form [formDestinatario]="formDestinatario"></app-destinatario-form>
  </mat-tab>

  <mat-tab label="Produtos">
    <!--Aqui esta ligado ao evento do filho "emit"-->
    <!-- O pai "escuta" o evento do filho -->
    <!-- agora vai para "onProdutoAdicionado" aqui no pai -->
    <app-produto-form (produtoAdicionado)="adicionarProduto($event)"></app-produto-form>
    <app-produtos-tabela 
      [produtos]="produto" 
      (excluirProduto)="removerProduto($event)">
    </app-produtos-tabela>
  </mat-tab>

  

  <mat-tab label="Transporte">
    <app-transporte-form [formTransporte]="formTransporte"></app-transporte-form>
  </mat-tab>

  <mat-tab label="Pagamento">
    <app-pagamento-form [formPagamento]="formPagamento"></app-pagamento-form>
  </mat-tab>
</mat-tab-group>

  <mat-tab-group>
     <mat-tab label="Totais">
       <app-totais-resumo 
       [produto]="produto" 
       [formTotal]="totaisForm">
       </app-totais-resumo>
    </mat-tab>
  </mat-tab-group>

  <div style="display: flex; justify-content: flex-end; padding-right: 100px;">
  <button mat-raised-button color="primary" (click)="salvarNfe()">
    Salvar Compra
  </button>
</div>

<!-- aqui já estão as abas/forms da NF-e -->

<mat-card *ngIf="notas.length > 0" class="mt-4">
  <mat-card-header>
    <mat-card-title>Notas Fiscais Salvas</mat-card-title>
  </mat-card-header>

  <mat-card-content>
    <table mat-table [dataSource]="notas" class="mat-elevation-z2 full-width">

      <!-- Número -->
      <ng-container matColumnDef="numero">
        <th mat-header-cell *matHeaderCellDef> Número </th>
        <td mat-cell *matCellDef="let nota"> {{ nota.numero }} </td>
      </ng-container>

      <!-- Série -->
      <ng-container matColumnDef="serie">
        <th mat-header-cell *matHeaderCellDef> Série </th>
        <td mat-cell *matCellDef="let nota"> {{ nota.serie }} </td>
      </ng-container>

      <!-- Data -->
      <ng-container matColumnDef="dtHrEmissao">
        <th mat-header-cell *matHeaderCellDef> Data/Hora </th>
        <td mat-cell *matCellDef="let nota">
          {{ nota.dtHrEmissao | date:'dd/MM/yyyy HH:mm' }}
        </td>
      </ng-container>

      <!-- Destinatário -->
      <ng-container matColumnDef="destinatarioNome">
        <th mat-header-cell *matHeaderCellDef> Destinatário </th>
        <td mat-cell *matCellDef="let nota"> {{ nota.destinatarioNome }} </td>
      </ng-container>

      <!-- Valor Total -->
      <ng-container matColumnDef="valorTotal">
        <th mat-header-cell *matHeaderCellDef> Valor Total </th>
        <td mat-cell *matCellDef="let nota"> {{ nota.valorTotal | currency:'BRL' }} </td>
      </ng-container>

      <!-- Status -->
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let nota"> {{ nota.status }} </td>
      </ng-container>

       <!-- Ações -->
      <ng-container matColumnDef="acoes">
        <th mat-header-cell *matHeaderCellDef> Ações </th>
        <td mat-cell *matCellDef="let nota">
          <button mat-icon-button color="primary" (click)="editarNota(nota)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="excluirNota(nota.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </mat-card-content>
</mat-card>


`

})
export class NfeComponent {
  formGeral: FormGroup;
  formEmitente: FormGroup;
  formDestinatario: FormGroup;
  formTransporte: FormGroup;
  formPagamento: FormGroup;
  formTotal!: FormGroup;

  // @Output() buscarFornecedor = new EventEmitter<void>();

  // O pai mantém a lista final de produtos que irão pro backend
  produto: Produto[] = [];

  notas: any[] = [];

  displayedColumns: string[] = [
  'numero',
  'serie',
  'dtHrEmissao',
  'destinatarioNome',
  'valorTotal',
  'status',
  'acoes'
];

  ngOnInit(): void {
  this.carregarNotas();
}

  constructor(
    private fb: FormBuilder,
    private xmlService: NfeXmlService,
   // private nfeService: NfeService // ✅ injeção do service
   private nfeService: NfeService
   ) {

    
this.formGeral = this.fb.group({
  layout: ['Manual 7.0, Layout 4.00'],
  idChaveAcesso: ['45644654654654'], // ⚠️ o campo estava escrito como "Id Chave de Acesso", o correto é evitar espaços
  ufEmitente: ['SP'],
  codNumericoNFe: ['112233'],
  natOperacao: ['1'],
  crt: ['55'],
  serie: ['1'],
  numeroNFe: ['58200'],
  dtHrEmissao: [this.getDataHoraEmissao()],
  dtHrSaida: ['19:07'],
  tipo: ['1'],
  destinoOpe: ['1'],
  ibge: ['3525'],
  formatoDanfe: ['NAO SEI'],
  tipoEmissao: ['normal'],
  digitoChave: ['1'],
  ambiente: ['1'],
  finalidade: ['1'],
  consumidorFinal: ['1'],
  vendaPresencial: ['2'],
  indIntermed: [],
  processoVersaoEmissor: ['2'],
  totais: this.fb.group({ // 👈 esse é o FormGroup aninhado
    baseCalculo: [0],
    vrIcms: [0],
    vrTotalProd: [0],
    vrTotalNfe: [0]
  })
  
});
console.log(this.formGeral.get('totais')?.value);

    this.formEmitente = this.fb.group({
      id: [null], // <-- campo oculto
      cnpj: ['23.335.656/0001-58', Validators.required],
      razaoSocial: ['Empresa Emitente Ltda', Validators.required],
      nomeFantasia: ['emitente', Validators.required],       
      ie: ['12345678', Validators.required],
      uf: ['SP', Validators.required],
      municipio: ['São Paulo', Validators.required],
      ibge: ['', Validators.required],
      crt: ['', Validators.required],
      cnae: ['45.55.22', Validators.required]       
    });

    this.formDestinatario = this.fb.group({
      id: [null], // <-- campo oculto
      cnpj: ['456', Validators.required],
      razaoSocial: ['empresa b', Validators.required],
      nomeFantasia: ['empresa', Validators.required],
      cnae: ['55.55.22', Validators.required],
      ie: ['445566', Validators.required],
      uf: ['sp', Validators.required],
      municipio: ['birigui', Validators.required],
      ibge: ['', Validators.required],
      indIEDest: ['1', Validators.required],
      crt: ['1', Validators.required],
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

    this.formTotal = this.fb.group({
      baseCalculo: ['', Validators.required],
      vrIcms: ['', Validators.required],
      vrTotalProd: ['', Validators.required],
      vrTotalNfe: ['', Validators.required]
    })

    
 /*
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
*/
  }

  carregarNotas() {
  this.nfeService.getNotasSalvas().subscribe({
    next: (res) => this.notas = res,
    error: (err) => console.error('Erro ao carregar notas', err)
  });
}

     // 🔧 Getter criado para acessar o grupo 'totais' do formGeral de forma segura e tipada.
    // Isso é necessário porque, ao usar formGeral.get('totais') diretamente no HTML, o Angular
    // reconhece o retorno como AbstractControl, e não como FormGroup — o que gera erro de tipagem.
    // Com esse getter, o cast para FormGroup é feito aqui no TypeScript, garantindo que o
    // template HTML possa utilizar normalmente o formTotal sem erros de compilação.
    get totaisForm(): FormGroup {
      return this.formGeral.get('totais') as FormGroup;
    }

   getDataHoraEmissao(): string {
        const agora = new Date();
        return agora.toLocaleString('sv-SE', {
          timeZone: 'America/Sao_Paulo',
          hour12: false
        }).replace(' ', 'T') + '-03:00';
        console.log(agora);
    }
  
    
  // Quando o filho emite, o pai guarda
  adicionarProduto(produto: Produto) {
    //this.produtos.push(produto);
   produto.quantidade    = Number(produto.quantidade)    || 0;
   produto.valorUnitario = Number(produto.valorUnitario) || 0;
   produto.desconto      = Number(produto.desconto)      || 0;
   produto.aliqIcms  = Number(produto.aliqIcms)  || 0;
   console.log('📦 Produtos que serão enviados:', JSON.stringify(this.produto, null, 2));
    
    // agora o pai tem o produto
    this.produto = [...this.produto, produto]; // cria novo array. 🔁 força atualização da tabela
    console.log('%c📬 Pai: recebi produto do filho:', 'color: green;', produto);
    //console.log('➕ Produto adicionado:', produto);
    console.log('📦 Produtos que serão enviados:', JSON.stringify(this.produto, null, 2));

    this.atualizarTotais();
    
  }

  atualizarTotais() {
  const totalBruto = this.produto.reduce((acc, p) => acc + (p.quantidade * p.valorUnitario), 0);
  const totalDesconto = this.produto.reduce((acc, p) => acc + p.desconto, 0);
  const totalIcms = this.produto.reduce((acc, p) => {
    const base = p.quantidade * p.valorUnitario - (p.desconto || 0);
    console.log('Produto:', p.descricao, 'Base:', base, 'Aliquota:', p.aliqIcms);
    return acc + ((base * p.aliqIcms) / 100);
  }, 0);
  const totalLiquido = totalBruto - totalDesconto;

  console.log('Valor do icms ----->>>>>' + totalIcms);
  this.totaisForm.patchValue({
    baseCalculo: totalBruto - totalDesconto,
    vrIcms: totalIcms,
    vrTotalProd: totalBruto,
    vrTotalNfe: totalLiquido
  });
}


  removerProduto(index: number) {
  const removido = this.produto[index];
  this.produto = this.produto.filter((_, i) => i !== index);
  console.log('🗑️ Produto removido:', removido);
   this.atualizarTotais();
}
  

  salvarNfe() {
    //console.log('📑 Dados Gerais:', this.formGeral.value);
    console.log('%c📑 Dados Gerais:', 'color: purple;', this.formGeral.value);
    console.log('%c🏢 Emitente (válido?):', 'color: green;', this.formEmitente.valid, this.formEmitente.value);
    console.log('%c🎯 Destinatário (válido?):', 'color: green;', this.formDestinatario.valid, this.formDestinatario.value);
    console.log('%c📦 Produtos:', 'color: orange;', this.produto);
    console.log('%c🚚 Transporte:', 'color: teal;', this.formTransporte.value);
    console.log('%c💵 Pagamento:', 'color: brown;', this.formPagamento.value);


    if (this.formEmitente.invalid || this.formDestinatario.invalid || this.produto.length === 0) {
      alert('Preencha todos os dados corretamente e adicione pelo menos um produto.');
      console.log('Produtos cadastrados:', this.produto);
      return;
    }

    // 🔁 Unifica os campos gerais e os totais (form aninhado) em um único objeto
    // para enviar ao backend no mesmo nível, conforme estrutura do DTO (GeraisDTO)
    const notaFiscal = {
      gerais: {
        ...this.formGeral.value,
        ...this.formGeral.get('totais')?.value // 🔁 move os campos totais para o mesmo nível
      },
      emitente: this.formEmitente.value,
      destinatario: this.formDestinatario.value,
      produtos: this.produto,
      transporte: this.formTransporte.value,
      pagamento: this.formPagamento.value
    };

    console.log('%c📤 OBJETO FINAL ENVIADO AO BACKEND:', 'color: red; font-weight: bold;', JSON.stringify(notaFiscal, null, 2));
    
    // No futuro: enviar todos os dados para o backend
    this.nfeService.enviarNotaFiscal(notaFiscal).subscribe({
    next: (res) => {
      console.log('%c✅ NF-e salva com sucesso:', 'color: green; font-weight: bold;', res);
      alert('NF-e salva com sucesso!');
    },
    error: (err) => {
      console.error('%c❌ Erro ao salvar NF-e:', 'color: red; font-weight: bold;', err);
      alert('Erro ao salvar a NF-e. Verifique os dados e tente novamente.');
    }
  });
}
  

  emitirNfe() {
  const dadosNota = {
    emitente: this.formEmitente.value,
    destinatario: this.formDestinatario.value,
    produtos: this.produto,
    transporte: this.formTransporte.value,
    pagamento: this.formPagamento.value
  };
    console.log('📄 XML Gerado:', dadosNota);

    this.nfeService.enviarNotaFiscal(dadosNota);
  }

  editarNota(nota: any) {
    console.log('Editar NF', nota);
    // aqui você pode carregar a NF no formulário para alteração
  }

  excluirNota(id: number) {
    if (confirm('Deseja realmente excluir esta nota?')) {
      console.log('Excluir NF ID:', id);
      // aqui chama o service para excluir no backend
      // depois chama carregarNotas() novamente
    }
  }
}
