// 📁 src/app/components/nfe/emitente-form.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { BuscaFornecedorDialogComponent } from '../dialogs/fornecedor/busca-fornecedor-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { NfeRegimeService } from './services/nfe-regime.services';
import { OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-emitente-form',
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
      <mat-card-title style="margin-bottom: 20px;">Dados do Emitente</mat-card-title>
      <form [formGroup]="formEmitente" class="grid grid-cols-1 md:grid-cols-3 gap-4">

      <input type="hidden" formControlName="id">
      
        <mat-form-field appearance="fill">
          <mat-label>CNPJ ou CPF</mat-label>
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

        <mat-form-field appearance="fill">
          <mat-label>Inscrição Estadual</mat-label>
          <input matInput formControlName="ie">
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

        <mat-form-field appearance="fill" style="width: 310px;">
          <mat-label>Regime Tributário</mat-label>
          <mat-select formControlName="crt">
            <mat-option value="" disabled selected>Selecione o regime</mat-option>
            <mat-option value="1">Simples Nacional</mat-option>
            <mat-option value="2">Simples Nacional - excesso sublimite</mat-option>
            <mat-option value="3">Regime Normal</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-card>
  `
})
export class EmitenteFormComponent implements OnInit{
  @Input() formEmitente!: FormGroup;
  

  constructor(private dialog: MatDialog, 
    private regimeService: NfeRegimeService) {
      
    }

ngOnInit() {
    this.formEmitente.get('crt')?.valueChanges.subscribe(value => {
      console.log('%c🔔 Emitente → CRT alterado:', 'color: blue; font-weight: bold;', value);
      //console.log('crt ' + value + ' selecionado!!');
      this.regimeService.setRegime(value);
      
    });
  }


abrirBuscaFornecedor() {
  const dialogRef = this.dialog.open(BuscaFornecedorDialogComponent, {
    width: '800px'
  });

dialogRef.afterClosed().subscribe(result => {

  console.log('%c📂 Emitente → Fornecedor selecionado no Dialog:', 'color: orange;', result);
  console.log('Fornecedor selecionado:', result);  // <-- Aqui imprime o que o Dialog retornou

  if (result) {
    console.log('Campos do formEmitente:', this.formEmitente.controls);

    this.formEmitente.patchValue({
      
      // Aqui define o que vai ser populado nos input
      id: result.id, // <-- adiciona o ID aqui mesmo que nao apareça na tela
      razaoSocial: result.razaoSocial,
      cnpj: result.cnpj,
      nomeFantasia: result.nomeFantasia,
      ie: result.inscEstadual,  // Aqui corrigido!
      uf: result.uf,
      municipio: result.cidade, // <-- Corrigido
      ibge: result.ibge,
      cnae: result.cnae,
      crt: result.crt
    });
    console.log('%c✅ Emitente → Form atualizado:', 'color: green;', this.formEmitente.value);
  }
});

 }
}