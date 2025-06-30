import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-totais-resumo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  template: `
    <mat-card *ngIf="produtos.length > 0">
      <mat-card-title>Totais da Nota</mat-card-title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
        <div><strong>Total Bruto:</strong> R$ {{ totalBruto | number:'1.2-2' }}</div>
        <div><strong>Total Desconto:</strong> R$ {{ totalDesconto | number:'1.2-2' }}</div>
        <div><strong>Total ICMS:</strong> R$ {{ totalIcms | number:'1.2-2' }}</div>
        <div><strong>Total Líquido:</strong> R$ {{ totalLiquido | number:'1.2-2' }}</div>
      </div>
    </mat-card>
  `
})
export class TotaisResumoComponent {
  @Input() produtos: any[] = [];

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
