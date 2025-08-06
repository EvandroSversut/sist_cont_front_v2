// 📁 src/app/components/nfe/produto-form.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BuscaProdutoDialogComponent } from '../dialogs/produtos/busca-produto-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Produtos } from '../../model/produtos.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from "@angular/material/tabs";
import { MatTab } from "../../../../node_modules/@angular/material/tabs/index";
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AjudaOrigemDialogComponent } from '../dialogs/origem/ajuda-origem-dialog.component';
import { AjudaCsosnDialogComponent } from '../dialogs/csosnSimples/ajuda-csosn-dialog.component';
import { NfeRegimeService } from './services/nfe-regime.services';
import { OnInit } from '@angular/core';
import { AjudaCstDialogComponent } from '../dialogs/cst/ajuda-cst-dialog.component';
import { AjudastPisCofinsDialogComponent } from '../dialogs/st Pis Cofins/ajuda-stPisCofins-dialog.component';


@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatTooltipModule,

],
  styles: [`
    
  `],
  

 template: `
<mat-tab-group (selectedTabChange)="onTabChange($event)">
  <!-- Aba: Produtos -->
  <mat-tab label="Dados dos Produtos / Serviços">
    <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <mat-form-field appearance="outline">
        <mat-label>Código</mat-label>
        <input matInput formControlName="codigo">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Descrição</mat-label>
        <input type="text" matInput [matAutocomplete]="autoProduto" [formControl]="produtoCtrl">
        <mat-autocomplete #autoProduto="matAutocomplete" (optionSelected)="selecionaProduto($event.option.value)">
          <mat-option *ngFor="let p of produtosFiltrados" [value]="p.nomeProduto">
            {{ p.nomeProduto }} ({{ p.unidade }})
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>

      <button mat-icon-button color="primary" (click)="abrirBuscaProduto()">
        <mat-icon>search</mat-icon>
      </button>

      <mat-form-field appearance="outline">
        <mat-label>Código de Barras</mat-label>
        <input matInput formControlName="codBarras">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>NCM</mat-label>
        <input matInput formControlName="ncm">
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 270px;">
          <mat-label>O Produto tem Subs Trib. ?</mat-label>
          <mat-select formControlName="produtoST">
            <mat-option value="0">0 - Sim</mat-option>
            <mat-option value="1">1 - Não</mat-option>
          </mat-select>
        </mat-form-field>




   
  <mat-form-field appearance="outline" style="width: 600px;" matTooltip="Selecione o CST (Código de Situação Tributária) de acordo com a operação.">
    <mat-label>Código da Situação Tributária CST</mat-label>
    <mat-select [formControl]="cstControl">
      <mat-option value="0">00 - Tributada integralmente</mat-option>
      <mat-option value="1">10 - Tributada e com cobrança do ICMS por Subst Trib</mat-option>
      <mat-option value="2">20 - Com redução da BC</mat-option>
      <mat-option value="3">30 - Isenta / não tributada e com cobrança do ICMS por Subst Trib</mat-option>
      <mat-option value="4">40 - Isenta</mat-option>
      <mat-option value="5">41 - Não tributada</mat-option>
      <mat-option value="6">50 - Com Suspensão</mat-option>
      <mat-option value="7">51 - Com diferimento</mat-option>
      <mat-option value="8">60 - ICMS cobrado anteriormente por Subst Trib</mat-option>
      <mat-option value="9">70 - Com redução da BC e cobrança do ICMS por Subst Trib</mat-option>
      <mat-option value="10">90 - Outras</mat-option>
    </mat-select>

   
  </mat-form-field>

      <button mat-icon-button matSuffix (click)="abrirAjudaCst()" aria-label="Ajuda">
            <mat-icon>help_outline</mat-icon>
        </button>

       <mat-form-field appearance="outline" style="width: 700px;">
        <mat-label>CSOSN - SIMPLES NACIONAL</mat-label>
            <mat-select formControlName="cstSimples">
              <mat-option value="0">00 - Venda Dentro do Estado - Operacao com ICMS destacado</mat-option>
              <mat-option value="1">00 - Venda Para Outro Estado - ICMS com Aliquota Interest.</mat-option>
              <mat-option value="2">40 - Venda Isenta - ICMS Isento</mat-option>
              <mat-option value="3">102(CSOSN) - Simples Nacional (Emit e Dest) - Sem Destaque ICMS (Reg Diferenc)</mat-option>
              <mat-option value="4">10 - Substituicao Tributaria - ICMS ST é Calculado e Retido</mat-option>
              <mat-option value="5">41 - Remessa Para Conserto - Sem Incidencia de ICMS, CFOP Especifico</mat-option>
              <mat-option value="6">Devolucao de Venda (CST = NF Origem) - Nota Espelho</mat-option>
              <mat-option value="7">90 - Bonificacao sem Valor - Sem Tributacao/Sem Valor Financeiro</mat-option>
              <mat-option value="8">41 - Exportacao Direta - ICMS Isento</mat-option>
            </mat-select>

      </mat-form-field>

            <button mat-icon-button matSuffix (click)="abrirAjudaCsosn()" aria-label="Ajuda">
              <mat-icon>help_outline</mat-icon>
            </button>

      <mat-form-field appearance="outline">
        <mat-label>CFOP</mat-label>
        <input matInput formControlName="cfop">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Unidade</mat-label>
        <input matInput formControlName="unidade">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Quantidade</mat-label>
        <input matInput type="number" formControlName="quantidade">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Valor Unitário</mat-label>
        <input matInput type="number" formControlName="valorUnitario">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Desconto</mat-label>
        <input matInput type="number" formControlName="desconto">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Frete</mat-label>
        <input matInput type="number" formControlName="frete">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Seguro</mat-label>
        <input matInput type="number" formControlName="seguro">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Outras Despesas</mat-label>
        <input matInput type="number" formControlName="outrasDesp">
      </mat-form-field>

     <mat-form-field appearance="outline">
  <mat-label>Total Produto</mat-label>
  <input matInput formControlName="vrTotalProd" [value]="formProduto.get('vrTotalProd')?.value | currency:'BRL':'symbol-narrow'" readonly>
</mat-form-field>
    </form>
  </mat-tab>

  <!-- Aba: Impostos -->
  <mat-tab label="Impostos">

    <mat-tab-group>
      <!-- Subaba: ICMS -->
   <mat-form-field appearance="outline">
      <mat-label>Base de Calculo Icms</mat-label>
      <input matInput formControlName="vrTotalProd" [value]="formProduto.get('vrTotalProd')?.value | currency:'BRL':'symbol-narrow'" readonly>
    </mat-form-field>

      <mat-tab label="ICMS">
        <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <mat-form-field appearance="outline" style="width: 700px;">
        <mat-label>Origem do Produto</mat-label>
            <mat-select formControlName="origem">
              <mat-option value="0">0 - Nacional</mat-option>
              <mat-option value="1">1 - Estrangeira - Importação direta, exceto a indicada no código 6.</mat-option>
              <mat-option value="2">2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7.</mat-option>
              <mat-option value="3">3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%.</mat-option>
              <mat-option value="4">4 - Nacional, cuja produção tenha sido feita em conformidade com os processos
                                produtivos básicos de que tratam o Decreto-Lei nº 288/67 e as Leis nºs 8.248/91,
                                8.387/91, 10.176/01 e 11.484/07.</mat-option>
              <mat-option value="5">5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%.</mat-option>
              <mat-option value="6">6 - Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX.</mat-option>
              <mat-option value="7">7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX.</mat-option>
            </mat-select>
            
          <button mat-icon-button matSuffix (click)="abrirAjudaOrigem()" aria-label="Ajuda">
            <mat-icon>help_outline</mat-icon>
          </button>


      </mat-form-field>

         <mat-form-field appearance="outline">
            <mat-label>Base de Cálculo do ICMS</mat-label>
            <input matInput [value]="formProduto.get('baseDeCalculo')?.value | currency:'BRL':'symbol'" readonly>
        </mat-form-field>


          <mat-form-field appearance="outline">
            <mat-label>% ICMS</mat-label>
                  <mat-select formControlName="aliqIcms">
                  <mat-option value="4">4%</mat-option>
                  <mat-option value="7">7%</mat-option>
                  <mat-option value="12">12%</mat-option>
                  <mat-option value="18">18%</mat-option>
                  <mat-option value="20">20%</mat-option>
                  <mat-option value="25">25%</mat-option>
                  <mat-option value="30">30%</mat-option>
               </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Valor do ICMS</mat-label>
            <input matInput [value]="formProduto.get('vrDoIcms')?.value | currency:'BRL':'symbol'" readonly>
        </mat-form-field>

         <mat-form-field appearance="outline">
            <mat-label>Base ICMS ST</mat-label>
             <input matInput type="number" formControlName="bcIcmsSt">
        </mat-form-field>

        <mat-form-field appearance="outline">
            <mat-label>Valor ICMS ST</mat-label>
             <input matInput type="number" formControlName="vrIcmsSubst">
        </mat-form-field>

        <mat-form-field appearance="outline">
            <mat-label>Valor Imp. Importação</mat-label>
             <input matInput type="number" formControlName="vrImpImport">
        </mat-form-field>

        </form>
      </mat-tab>



      <!-- Subaba: PIS/COFINS -->
      <mat-tab label="PIS/COFINS">
        <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <mat-form-field appearance="fill">
            <mat-label>Base de Cálculo PIS/COFINS</mat-label>
            <input matInput [value]="formProduto.get('baseDeCalculo')?.value | currency:'BRL':'symbol'" readonly>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Situacao Tributaria</mat-label>
            <input matInput formControlName="st">
              </mat-form-field>

                <button mat-icon-button matTooltip="Ver tabela CST" (click)="abrirDialogAjudaStPisCofins()">
                  <mat-icon>help_outline</mat-icon>
                </button>

          <mat-form-field appearance="outline">
            <mat-label>Outro campos pis cofin</mat-label>
            <input matInput formControlName="outroCampoPisCofins">
          </mat-form-field>
        </form>
      </mat-tab>

      <!-- Subaba: IPI -->
      <mat-tab label="IPI">
        <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>Situação Tributaria</mat-label>
            <input matInput formControlName="situacaoTrib">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Codigo de Enquadramento</mat-label>
            <input matInput type="number" formControlName="codEnquadr">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Aliquota</mat-label>
            <input matInput type="number" formControlName="aliqIpi">
          </mat-form-field>
        </form>
      </mat-tab>

            <!-- Subaba: Retenções -->
      <mat-tab label="Retenções">
        <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>IRRF</mat-label>
            <input matInput formControlName="irrf">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Pis / Cofins</mat-label>
            <input matInput type="number" formControlName="pisCofins">
          </mat-form-field>
        </form>
      </mat-tab>

      
    </mat-tab-group>
  </mat-tab>

    <!-- Aba: Estoque -->
  <mat-tab label="Estoque">
    <mat-tab-group>
      <!-- Subaba: Descricao -->
      <mat-tab label="Dados dos Produto">
        <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">
         <mat-form-field style="width: 400px;">
            <mat-label>Nome do produto</mat-label>
          
             <input matInput type="number" formControlName="dadosProd">          </mat-form-field>
           
        </form>
      </mat-tab>



      <!-- Subaba: Outras inform do estoque -->
      <mat-tab label="Outras Informacoes">
        <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>outras inform</mat-label>
            <input matInput formControlName="outross">
          </mat-form-field>
          </form>
      </mat-tab>
         
      
    </mat-tab-group>
  </mat-tab>

</mat-tab-group>

<!-- Botão para adicionar produto -->
<div class="mt-4">
  <button mat-raised-button color="primary" (click)="adicionarProduto()" [disabled]="formProduto.invalid">
    Adicionar Produto
  </button>
</div>


`
  
})
export class ProdutoFormComponent implements OnInit{
  @Output() produtoAdicionado = new EventEmitter<any>();

  formProduto: FormGroup;

  regimeSelecionado: string | null = null;

  cstControl!: FormControl;
  cstCsosnControl!: FormControl;

  produtoSelecionado!: Produtos;
  produtoCtrl = new FormControl();
  formItem!: FormGroup;
  produtos: Produtos[] = [];
  produtosFiltrados: Produtos[] = [];

  
  constructor(
  private fb: FormBuilder,
  private dialog: MatDialog,
  private regimeService: NfeRegimeService) {

    this.formProduto = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      ncm: ['', Validators.required],
      origem: ['', Validators.required],
      unidade: ['', Validators.required],
      cfop: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(0.0001)]],
      valorUnitario: ['', Validators.required],
      desconto: [''],
      frete: [''],
      seguro: [''],
      outrasDesp: [''],
      vrTotalProd: [{ value: 0, disabled: true }],
      icms: [''],
      ipi: [''],
      pis: [''],
      cofins: [''],
      iss: [''],
      aliqIcms: ['', Validators.required], // isso faz referencia ao input "aliquotaIcms"
      baseDeCalculo: [{ value: 0, disabled: true }],
      vrDoIcms: [{ value: 0, disabled: true }],
        // ✅ Adicione aqui o campo que estava faltando:
      cst: [{ value: null, disabled: false }, Validators.required],

      // ✅ (opcional: já que também tem cstSimples no HTML)
      cstSimples: [{ value: null, disabled: false }, Validators.required],
      // ✅ agora sim, todos os campos serão enviados
      
    });

    
    this.formProduto.valueChanges.subscribe(() => {
      this.atualizaValorTotal();
});

    this.formProduto.get('aliqIcms')?.valueChanges.subscribe(() => {
      this.atualizaValorTotal();
  });

  
}


ngOnInit(): void {
  this.regimeService.regime$.subscribe(regime => {
    this.regimeSelecionado = regime;

    // Aplica a regra para todos os campos, incluindo CST e NCM
    this.aplicarRegrasDesabilitaCampos();
  });

  this.cstControl = this.formProduto.get('cst') as FormControl;
  this.cstCsosnControl = this.formProduto.get('cstSimples') as FormControl;
}


  adicionarProduto() {
    if (this.formProduto.valid) {
      // Habilita o campo para pegar o valor ao emitir
      this.formProduto.get('vrTotalProd')?.enable({ emitEvent: false });

      // Captura o valor com total incluso
      // Aqui o Angular incluir todos os campos declarados no FormGroup no Construtor
      // mesmo que nao apareca na tabela.
      const produto = this.formProduto.getRawValue();

      this.produtoAdicionado.emit(produto);

       // Desativa novamente se quiser continuar deixando o campo bloqueado
      this.formProduto.get('vrTotalProd')?.disable({ emitEvent: false });
      
      // Reset padrão
      this.formProduto.reset({ quantidade: 1, valorUnitario: 0, desconto: 0 });
    }
  }

    abrirBuscaProduto() {
      const dialogRef = this.dialog.open(BuscaProdutoDialogComponent, {
        width: '800px'
      });
  
    dialogRef.afterClosed().subscribe(result => {
    console.log('Produto selecionado:', result);
    if (result) {
      this.produtoSelecionado = result;
      this.produtoCtrl.setValue(result.nomeProduto);
   
      // o primeiro codigo à esquerda é o input do html: <input matInput formControlName="codigo">
      // o segundo codigo à direita é o que vem do banco ou objeto selecionado no dialog
      this.formProduto.patchValue({
        codigo: result.id,                          
        descricao: result.nomeProduto,
        ncm: result.ncm,
        unidade: result.unidade
              
          });
          this.atualizaValorTotal();
        }
      });
    }

    // Importante: para calcular esses campos, 
    // precisa adicionar no "formProduto" que está no construtor
    atualizaValorTotal() {
    const qtde = this.formProduto.get('quantidade')!.value || 0;
    const unit = this.formProduto.get('valorUnitario')!.value || 0;
    const desconto = this.formProduto.get('desconto')!.value || 0;
    const frete = this.formProduto.get('frete')!.value || 0;
    const seguro = this.formProduto.get('seguro')!.value || 0;
    const outrasDesp = this.formProduto.get('outrasDesp')!.value || 0;
    const total = (qtde * unit) + ( - desconto + frete + seguro + outrasDesp);
    const icmsAliquota = Number(this.formProduto.get('aliqIcms')!.value) || 0;
    // Este  { emitEvent: false } serve para nao dar loop infinito pois estava travando a tela.
    this.formProduto.get('vrTotalProd')!.setValue(total, { emitEvent: false });
    this.formProduto.get('baseDeCalculo')!.setValue(total, { emitEvent: false });

     // Calcula o valor do ICMS
  const valorIcms = total * (icmsAliquota / 100);
  this.formProduto.get('vrDoIcms')!.setValue(valorIcms, { emitEvent: false });

  }

 /*   atualizaValorTotal() {
    const qtde = this.formItem.get('quantidade')!.value || 0;
    const unit = this.formItem.get('valorUnitario')!.value || 0;
    const desconto = this.formItem.get('desconto')!.value || 0;
    const total = (qtde * unit) - desconto;
    this.formItem.get('valorTotal')!.setValue(total >= 0 ? total : 0);
  }
    */

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

  abrirAjudaOrigem() {
    this.dialog.open(AjudaOrigemDialogComponent, {
      width: '500px'
    });
  }
   abrirAjudaCst() {
    this.dialog.open(AjudaCstDialogComponent, {
      width: '500px'
    });
  }

     abrirAjudaCsosn() {
    this.dialog.open(AjudaCsosnDialogComponent, {
      width: '500px'
    });
  }

  abrirDialogAjudaStPisCofins() {
    this.dialog.open(AjudastPisCofinsDialogComponent, {
      width: '600px',
      maxHeight: '100vh',
    });
  }

  
onTabChange(event: MatTabChangeEvent) {
  console.log('🚀 Troca de aba detectada:', event.index);
  if (event.index === 0) {
    // aba "Produtos"
    this.aplicarRegrasDesabilitaCampos();
  }
}

private aplicarRegrasDesabilitaCampos(): void {
  const isSimples = this.regimeSelecionado === '1';
  const isNormal = this.regimeSelecionado === '3';

  console.log('Regime selecionado no ProdutoFormComponent:', this.regimeSelecionado);


  // CST
    const cstControl = this.formProduto.get('cst');
    const cstSimplesControl = this.formProduto.get('cstSimples');

    if (isSimples) {
      cstControl?.disable({ emitEvent: false });
      cstSimplesControl?.enable({ emitEvent: false });
    } else if (isNormal) {
      cstSimplesControl?.disable({ emitEvent: false });
      cstControl?.enable({ emitEvent: false });
    } else {
      // Excesso sublimite ou vazio → habilita ambos (ou personalize se quiser)
      cstControl?.enable({ emitEvent: false });
      cstSimplesControl?.enable({ emitEvent: false });
    }
  }
}
