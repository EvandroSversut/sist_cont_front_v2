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
    MatAutocompleteModule
  ],
  template: `
    <mat-card>
      <mat-card-title>Adicionar Produto</mat-card-title>
      <form [formGroup]="formProduto" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>Código</mat-label>
          <input matInput formControlName="codigo">
        </mat-form-field>

        <mat-form-field appearance="outline">
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
          <mat-label>NCM</mat-label>
          <input matInput formControlName="ncm">
        </mat-form-field>

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
          <mat-label>Total Produto</mat-label>
          <input matInput type="number" formControlName="totalProd">
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
          <mat-label>ICMS</mat-label>
          <input matInput type="number" formControlName="icms">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>IPI</mat-label>
          <input matInput type="number" formControlName="ipi">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>PIS</mat-label>
          <input matInput type="number" formControlName="pis">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>COFINS</mat-label>
          <input matInput type="number" formControlName="cofins">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>ISS</mat-label>
          <input matInput type="number" formControlName="iss">
        </mat-form-field>

      </form>

      <div class="mt-4">
        <button mat-raised-button color="primary" (click)="adicionarProduto()" [disabled]="formProduto.invalid">
          Adicionar Produto
        </button>
      </div>
    </mat-card>
  `
})
export class ProdutoFormComponent {
  @Output() produtoAdicionado = new EventEmitter<any>();

  formProduto: FormGroup;

  produtoSelecionado!: Produtos;
  produtoCtrl = new FormControl();
  formItem!: FormGroup;
  produtos: Produtos[] = [];
  produtosFiltrados: Produtos[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.formProduto = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      ncm: ['', Validators.required],
      cfop: ['', Validators.required],
      unidade: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(0.0001)]],
      valorUnitario: [0, [Validators.required, Validators.min(0)]],
      desconto: [0],
      aliquotaIcms: [0, [Validators.required, Validators.min(0)]]
      
    });
  }

  adicionarProduto() {
    if (this.formProduto.valid) {
      this.produtoAdicionado.emit(this.formProduto.value);
      this.formProduto.reset({ quantidade: 1, valorUnitario: 0, desconto: 0, aliquotaIcms: 0 });
    }
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
      atualizaValorTotal() {
    const qtde = this.formItem.get('quantidade')!.value || 0;
    const unit = this.formItem.get('valorUnitario')!.value || 0;
    const desconto = this.formItem.get('desconto')!.value || 0;
    const total = (qtde * unit) - desconto;
    this.formItem.get('valorTotal')!.setValue(total >= 0 ? total : 0);
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
}
