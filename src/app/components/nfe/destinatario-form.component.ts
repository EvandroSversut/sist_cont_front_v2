// 📁 src/app/components/nfe/destinatario-form.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BuscaFornecedorDialogComponent } from '../dialogs/fornecedor/busca-fornecedor-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-destinatario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <mat-card>
      <mat-card-title>Dados do Destinatário</mat-card-title>
      <form [formGroup]="formDestinatario" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>CNPJ</mat-label>
          <input matInput formControlName="cnpj">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Razão Social / Nome</mat-label>
          <input matInput formControlName="razaoSocial">
        </mat-form-field>

        <button mat-icon-button color="primary" (click)="abrirBuscaFornecedor()">
          <mat-icon>search</mat-icon>
        </button>

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
          <mat-label>E-mail</mat-label>
          <input matInput formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Indicador IE</mat-label>
          <mat-select formControlName="indIEDest">
            <mat-option value="1">Contribuinte ICMS</mat-option>
            <mat-option value="2">Contribuinte isento</mat-option>
            <mat-option value="9">Não contribuinte</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-card>
  `
})
export class DestinatarioFormComponent {
  @Input() formDestinatario!: FormGroup;

  constructor(private dialog: MatDialog) {}
  
  abrirBuscaFornecedor() {
    const dialogRef = this.dialog.open(BuscaFornecedorDialogComponent, {
      width: '800px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formDestinatario.patchValue({ razaoSocial: result.razaoSocial, cnpj: result.cnpj });
      }
    });
   }
  }