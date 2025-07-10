import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-totais-resumo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
<div style="display: flex; justify-content: flex-end;">
    
<mat-card>
      <mat-card-title></mat-card-title>
      <form [formGroup]="formTotal" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>Base de Cálculo</mat-label>
          <input matInput type="number" formControlName="baseCalculo">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Valor ICMS</mat-label>
          <input matInput type="number" formControlName="vrIcms">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Valor Total Produtos</mat-label>
          <input matInput type="number" formControlName="vrTotalProd">
        </mat-form-field>
      
        <mat-form-field appearance="outline">
          <mat-label>Valor Total NF-e</mat-label>
          <input matInput type="number" formControlName="vrTotalNfe">
        </mat-form-field>

      </form>
    </mat-card>



  <mat-card *ngIf="produtos.length > 0" style="width: 320px;">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
      <div><strong>Total Bruto:</strong> R$ {{ totalBruto | number:'1.2-2' }}</div>
      <div><strong>Total Desconto:</strong> R$ {{ totalDesconto | number:'1.2-2' }}</div>
      <div><strong>Total ICMS:</strong> R$ {{ totalIcms | number:'1.2-2' }}</div>
      <div><strong>Total Líquido:</strong> R$ {{ totalLiquido | number:'1.2-2' }}</div>
    </div>
  </mat-card>
</div>

  `
})
export class TotaisResumoComponent {
  @Input() produtos: any[] = [];
  @Input() formTotal!: FormGroup;

  get totalBruto(): number {
    return this.produtos.reduce((acc, p) => acc + (p.quantidade * p.valorUnitario), 0);
  }

  get totalDesconto(): number {
    return this.produtos.reduce((acc, p) => acc + p.desconto, 0);
  }

  get totalIcms(): number {
    return this.produtos.reduce((acc, p) => {
      const base = p.quantidade * p.valorUnitario - p.desconto;
      return acc + ((base * p.aliquotaIcms) / 100);
    }, 0);
  }

  get totalLiquido(): number {
    return this.totalBruto - this.totalDesconto;
  }
}
