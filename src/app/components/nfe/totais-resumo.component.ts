import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-totais-resumo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
<div style="display: flex; justify-content: flex-end; gap: 16px; flex-wrap: wrap;">
  <mat-card>
    <form [formGroup]="formTotal" class="grid grid-cols-1 md:grid-cols-3 gap-4">

      <mat-form-field appearance="fill">
        <mat-label>Base de Cálculo do Icms</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('baseCalculo')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>
      
      <mat-form-field appearance="fill">
        <mat-label>Valor ICMS</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrIcms')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Base Cálculo Icms Substituicao</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalProd')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Valor do Icms Substituicao</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalProd')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Valor Total dos Produtos</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalServ')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>
      
      <mat-form-field appearance="fill">
        <mat-label>Valor do Frete</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalServ')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>
      
      <mat-form-field appearance="fill">
        <mat-label>Valor do Seguro</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalServ')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Desconto</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalServ')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Outras Despesas Acessorias</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalServ')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Valor do IPI</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalServ')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Valor Total da Nota</mat-label>
        <input matInput type="text"
               [value]="formTotal.get('vrTotalNfe')?.value | currency:'BRL':'symbol':'1.2-2'"
               readonly>
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
  private _produtos: any[] = [];
  private _formTotal!: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {}

  // ===== Inputs com setters para recalcular assim que mudarem =====
  @Input()
  set produtos(value: any[]) {
    this._produtos = value || [];
    this.recalcularEPatch();
  }
  get produtos() { return this._produtos; }

  @Input()
  set formTotal(value: FormGroup) {
    this._formTotal = value;
    this.recalcularEPatch();
  }
  get formTotal(): FormGroup {
     return this._formTotal; }

  // ===== Getters para card lateral =====
  get totalBruto(): number {
    return this._produtos.reduce((acc, p) => acc + (toNum(p.quantidade) * toNum(p.valorUnitario)), 0);
  }

  get totalDesconto(): number {
    return this._produtos.reduce((acc, p) => acc + toNum(p.desconto), 0);
  }

  get totalIcms(): number {
    return this._produtos.reduce((acc, p) => {
      const base = toNum(p.quantidade) * toNum(p.valorUnitario) - toNum(p.desconto);
      return acc + (base * toNum(p.aliquotaIcms) / 100);
    }, 0);
  }

  get totalLiquido(): number {
    return this.totalBruto - this.totalDesconto;
  }

  // ===== Calcula e atualiza o FormGroup exibido no template =====
  private recalcularEPatch(): void {
    if (!this._formTotal) return;

    const bruto    = this.totalBruto;
    const desconto = this.totalDesconto;
    const icms     = this.totalIcms;
    const base     = bruto - desconto;
    const liquido  = base; // aqui não somei frete/seguro/outros — ajuste se precisar

    this._formTotal.patchValue({
      vrTotalProd: bruto,
      baseCalculo: base,
      vrIcms: icms,
      // mantém o que já houver em serviços ou zera se inexistente
      vrTotalServ: this._formTotal.get('vrTotalServ')?.value ?? 0,
      vrTotalNfe: liquido
    }, { emitEvent: false });

    // garante render mesmo se o componente usar OnPush
    this.cdr.markForCheck();
  }
}

// helper para garantir número
function toNum(v: any): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
