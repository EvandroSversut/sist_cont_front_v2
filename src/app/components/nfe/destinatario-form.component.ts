// 📁 src/app/components/nfe/destinatario-form.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
        <mat-form-field appearance="fill">
          <mat-label>CNPJ</mat-label>
          <input matInput formControlName="cnpj">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Razão Social / Nome</mat-label>
          <input matInput formControlName="razaoSocial">
        </mat-form-field>

        <button mat-icon-button color="primary" (click)="abrirBuscaFornecedor()">
          <mat-icon>search</mat-icon>
        </button>

        <mat-form-field appearance="fill">
          <mat-label>Nome Fantasia</mat-label>
          <input matInput formControlName="nomeFantasia">
        </mat-form-field>

        <mat-form-field appearance="fill" style="width: 310px; margin-bottom: 20px;">
          <mat-label>Inscrição Estadual</mat-label>
          <input matInput formControlName="ie">
          <mat-error *ngIf="formDestinatario.get('ie')?.hasError('required')"
            style="font-size: 9px; color: #d32f2f;">
            Inscrição Estadual é obrigatória para contribuintes ICMS.
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>UF</mat-label>
          <input matInput formControlName="uf">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Município</mat-label>
          <input matInput formControlName="municipio">
        </mat-form-field>

       <mat-form-field appearance="fill">
          <mat-label>Cod IBGE</mat-label>
          <input matInput formControlName="ibge">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>CNAE</mat-label>
          <input matInput formControlName="cnae">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Regime Tributário</mat-label>
          <mat-select formControlName="crt">
            <mat-option value="1">Simples Nacional</mat-option>
            <mat-option value="2">Simples Nacional - excesso sublimite</mat-option>
            <mat-option value="3">Regime Normal</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Indicador IE</mat-label>
          <mat-select formControlName="indIEDest">
            <mat-option value="1">Contribuinte ICMS</mat-option>
            <mat-option value="2">Contribuinte isento</mat-option>
            <mat-option value="9">Não contribuinte</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Destinatario Final</mat-label>
          <mat-select formControlName="consumidorFinal">
            <mat-option value="0">0 - Intermediario</mat-option>
            <mat-option value="1">1 - Consumidor Final</mat-option>
          </mat-select>
        </mat-form-field>

      </form>
    </mat-card>
  `
})
export class DestinatarioFormComponent {
  @Input() formDestinatario!: FormGroup;

  constructor(private dialog: MatDialog) {}
  
    ngOnInit() {
    this.formDestinatario.get('indIEDest')?.valueChanges.subscribe(value => {
      console.log('%c🔔 Destinatário → Indicador IE alterado:', 'color: blue;', value);

      const ieControl = this.formDestinatario.get('ie');
      if (value === '1') {
        ieControl?.setValidators([Validators.required]);
        console.log('%c⚠️ IE agora é obrigatório', 'color: red;');
      } else {
        ieControl?.clearValidators();
        ieControl?.setValue('');
        console.log('%cℹ️ IE limpo por não ser contribuinte ICMS', 'color: gray;');
      }
      ieControl?.updateValueAndValidity();
    });
  }


  abrirBuscaFornecedor() {
    const dialogRef = this.dialog.open(BuscaFornecedorDialogComponent, {
      width: '800px'
    });
  
    dialogRef.afterClosed().subscribe(result => {

      console.log('%c📂 Destinatário → Fornecedor selecionado no Dialog:', 'color: orange;', result);

      if (result) {
        console.log('Campos do formDestinatario:', this.formDestinatario.controls);
        this.formDestinatario.patchValue({ 
          razaoSocial: result.razaoSocial, 
          cnpj: result.cnpj,
          nomeFantasia: result.nomeFantasia,
          ie: result.inscEstadual,
          uf: result.uf,
          municipio: result.cidade,
          ibge: result.ibge,
          cnae: result.cnae,
          crt: result.crt
        });
        console.log('%c✅ Destinatário → Form atualizado:', 'color: green;', this.formDestinatario.value);
    
      }
    });
   }
  }