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
    <app-produto-form (produtoAdicionado)="adicionarProduto($event)"></app-produto-form>
    <app-produtos-tabela 
      [produtos]="produtos" 
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
       [produtos]="produtos" 
       [formTotal]="totaisForm">
       </app-totais-resumo>
    </mat-tab>
  </mat-tab-group>

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

  produtos: any[] = [];

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
    baseCalculo: [''],
    vrIcms: [''],
    vrTotalProd: [''],
    vrTotalNfe: ['']
  })
  
});
console.log(this.formGeral.get('totais')?.value);

    this.formEmitente = this.fb.group({
      cnpj: ['23.335.656/0001-58', Validators.required],
      razaoSocial: ['Empresa Emitente Ltda', Validators.required],
      nomeFantasia: ['emitente', Validators.required],       
      ie: ['12345678', Validators.required],
      uf: ['SP', Validators.required],
      municipio: ['São Paulo', Validators.required],
      crt: ['1', Validators.required],
      cnae: ['45.55.22', Validators.required]       
    });

    this.formDestinatario = this.fb.group({
      cnpj: ['456', Validators.required],
      razaoSocial: ['empresa b', Validators.required],
      nomeFantasia: ['empresa', Validators.required],
      cnae: ['55.55.22', Validators.required],
      ie: ['445566', Validators.required],
      uf: ['sp', Validators.required],
      municipio: ['birigui', Validators.required],
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
  
    
  adicionarProduto(produto: any) {
    //this.produtos.push(produto);
    console.log('📦 Produtos que serão enviados:', JSON.stringify(this.produtos, null, 2));
    
    this.produtos = [...this.produtos, produto]; // cria novo array. 🔁 força atualização da tabela

    console.log('➕ Produto adicionado:', produto);

    this.atualizarTotais();
    
  }

  atualizarTotais() {
  const totalBruto = this.produtos.reduce((acc, p) => acc + (p.quantidade * p.valorUnitario), 0);
  const totalDesconto = this.produtos.reduce((acc, p) => acc + p.desconto, 0);
  const totalIcms = this.produtos.reduce((acc, p) => {
    const base = p.quantidade * p.valorUnitario - p.desconto;
    return acc + ((base * p.aliquotaIcms) / 100);
  }, 0);
  const totalLiquido = totalBruto - totalDesconto;

  this.totaisForm.patchValue({
    baseCalculo: totalBruto - totalDesconto,
    vrIcms: totalIcms,
    vrTotalProd: totalBruto,
    vrTotalNfe: totalLiquido
  });
}


  removerProduto(index: number) {
  const removido = this.produtos[index];
  this.produtos = this.produtos.filter((_, i) => i !== index);
  console.log('🗑️ Produto removido:', removido);
   this.atualizarTotais();
}
  

  salvarNfe() {
    console.log('📑 Dados Gerais:', this.formGeral.value);
    console.log('Emitente válido?', this.formEmitente.valid);
    console.log('Destinatário válido?', this.formDestinatario.valid);
    console.log('Produtos:', this.produtos);
    console.log('Emitente:', this.formEmitente.value);
    console.log('Destinatário:', this.formDestinatario.value);

    if (this.formEmitente.invalid || this.formDestinatario.invalid || this.produtos.length === 0) {
      alert('Preencha todos os dados corretamente e adicione pelo menos um produto.');
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
      produtos: this.produtos,
      transporte: this.formTransporte.value,
      pagamento: this.formPagamento.value
    };


    console.log('📤 Emitente:', this.formEmitente.value);
    console.log('📤 Destinatário:', this.formDestinatario.value);
    console.log('📦 Produtos:', this.produtos);
    console.log('🚚 Transporte:', this.formTransporte.value);
    console.log('💵 Pagamento:', this.formPagamento.value);
  
    // No futuro: enviar todos os dados para o backend
    this.nfeService.enviarNotaFiscal(notaFiscal).subscribe({
    next: (res) => {
      console.log('✅ NF-e salva com sucesso:', res);
      alert('NF-e salva com sucesso!');
    },
    error: (err) => {
      console.error('❌ Erro ao salvar NF-e:', err);
      alert('Erro ao salvar a NF-e. Verifique os dados e tente novamente.');
    }
  });
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
