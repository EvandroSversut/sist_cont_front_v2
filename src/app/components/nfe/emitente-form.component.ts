// 📁 src/app/components/nfe/emitente-form.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-emitente-form',
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
      <mat-card-title>Dados do Emitente</mat-card-title>
      <form [formGroup]="formEmitente" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>CNPJ</mat-label>
          <input matInput formControlName="cnpj">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Razão Social</mat-label>
          <input matInput formControlName="razaoSocial">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Inscrição Estadual</mat-label>
          <input matInput formControlName="ie">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>UF</mat-label>
          <input matInput formControlName="uf">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Município</mat-label>
          <input matInput formControlName="municipio">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Regime Tributário</mat-label>
          <mat-select formControlName="crt">
            <mat-option value="1">Simples Nacional</mat-option>
            <mat-option value="2">Simples Nacional - excesso sublimite</mat-option>
            <mat-option value="3">Regime Normal</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-card>
  `
})
export class EmitenteFormComponent {
  @Input() formEmitente!: FormGroup;

  constructor() {}
}
