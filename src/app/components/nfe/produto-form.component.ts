// 📁 src/app/components/nfe/produto-form.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
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
          <input matInput formControlName="descricao">
        </mat-form-field>

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
          <mat-label>Desconto</mat-label>
          <input matInput type="number" formControlName="desconto">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Alíquota ICMS (%)</mat-label>
          <input matInput type="number" formControlName="aliquotaIcms">
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

  constructor(private fb: FormBuilder) {
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
}
