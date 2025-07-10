import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transporte-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <mat-card-title>Dados de Transporte</mat-card-title>
      <form [formGroup]="formTransporte" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <mat-form-field appearance="outline">
          <mat-label>Modalidade de Frete</mat-label>
          <mat-select formControlName="modFrete">
            <mat-option value="0">0 - Por conta do emitente</mat-option>
            <mat-option value="1">1 - Por conta do destinatário/remetente</mat-option>
            <mat-option value="2">2 - Por conta de terceiros</mat-option>
            <mat-option value="9">9 - Sem frete</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Transportadora</mat-label>
          <input matInput formControlName="transportadora">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>CNPJ da Transportadora</mat-label>
          <input matInput formControlName="cnpjTransportadora">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Placa do Veículo</mat-label>
          <input matInput formControlName="placaVeiculo">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>UF da Placa</mat-label>
          <input matInput formControlName="ufPlaca">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Numero Fatura</mat-label>
          <input matInput formControlName="numeroFatura">
        </mat-form-field>
     
        <mat-form-field appearance="outline">
          <mat-label>Valor do Frete</mat-label>
          <input matInput type="number" formControlName="valorFrete">
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Desconto Frete</mat-label>
          <input matInput type="number" formControlName="descontoFrete">
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Liquido</mat-label>
          <input matInput type="number" formControlName="liquidoFrete">
        </mat-form-field>


      </form>
    </mat-card>
  `
})
export class TransporteFormComponent {
  @Input() formTransporte!: FormGroup;
}
