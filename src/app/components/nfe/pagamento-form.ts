import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pagamento-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <mat-card-title>Pagamento</mat-card-title>
      <form [formGroup]="formPagamento" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>Forma de Pagamento</mat-label>
          <mat-select formControlName="formaPagamento">
            <mat-option value="01">01 - Dinheiro</mat-option>
            <mat-option value="02">02 - Cheque</mat-option>
            <mat-option value="03">03 - Cartão de Crédito</mat-option>
            <mat-option value="04">04 - Cartão de Débito</mat-option>
            <mat-option value="05">05 - Crédito Loja</mat-option>
            <mat-option value="10">10 - Vale Alimentação</mat-option>
            <mat-option value="11">11 - Vale Refeição</mat-option>
            <mat-option value="15">15 - Boleto Bancário</mat-option>
            <mat-option value="90">90 - Sem pagamento</mat-option>
            <mat-option value="99">99 - Outros</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Valor Pago</mat-label>
          <input matInput type="number" formControlName="valorPago">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Troco</mat-label>
          <input matInput type="number" formControlName="valorTroco">
        </mat-form-field>
      </form>
    </mat-card>
  `
})
export class PagamentoFormComponent {
  @Input() formPagamento!: FormGroup;
}
