// 📁 src/app/components/nfe/emitente-form.component.ts

import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { BuscaFornecedorDialogComponent } from '../dialogs/fornecedor/busca-fornecedor-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-geraisNfe-form',
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
      <mat-card-title>Dados da NFe</mat-card-title>
      <form [formGroup]="formGeral" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>VERSAO MANUAL E LAYOUT</mat-label>
          <input matInput formControlName="layout">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Id Chave de Acesso</mat-label>
          <input matInput formControlName="idChaveAcesso">
        </mat-form-field>

    <mat-card-title>Identificação da NFe</mat-card-title>
        <mat-form-field appearance="outline">
          <mat-label>UF do Emitente</mat-label>
          <input matInput formControlName="ufEmitente">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Cod Numerico NFe</mat-label>
          <input matInput formControlName="codNumericoNFe">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Natureza Operacao</mat-label>
          <input matInput formControlName="natOperacao">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Modelo da NFe</mat-label>
          <mat-select formControlName="crt">
            <mat-option value="55">NF-e (55)</mat-option>
            <mat-option value="62">Telecom (62)</mat-option>
            <mat-option value="999">Outras</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Serie do Documento</mat-label>
          <input matInput formControlName="serie">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Numero da NF-e</mat-label>
          <input matInput formControlName="numeroNFe">
        </mat-form-field>

        <mat-form-field appearance="outline" style="width: 300px;">
          <mat-label>Data/Hora Emissao</mat-label>
          <input matInput formControlName="dtHrEmissao" readonly>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Data/Hora Saida - opcional</mat-label>
          <input matInput formControlName="dtHrSaida">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Tipo</mat-label>
          <mat-select formControlName="tipo">
            <mat-option value="0">Entrada</mat-option>
            <mat-option value="1">Saida</mat-option>
        </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Destino da Operaçao</mat-label>
          <mat-select formControlName="destinoOpe">
            <mat-option value="1">Interna</mat-option>
            <mat-option value="2">Interestadual</mat-option>
            <mat-option value="3">Exterior</mat-option>
        </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Cod Municipio FG - IBGE</mat-label>
          <input matInput formControlName="ibge">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Formato do DANFE</mat-label>
          <mat-select formControlName="formDanfe">
            <mat-option value="1">1 - Normal</mat-option>
            <mat-option value="4">4 - NFC-e</mat-option>
           </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Tipo de Emissao</mat-label>
          <mat-select formControlName="tipoEmissao">
            <mat-option value="normal">Normal</mat-option>
            <mat-option value="contingencia">Contingencia</mat-option>
        </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Digito Verificador da Chave</mat-label>
          <input matInput formControlName="digitoChave">
        </mat-form-field>

         <mat-form-field appearance="outline">
          <mat-label>Ambiente</mat-label>
          <mat-select formControlName="ambiente">
            <mat-option value="1">1 - Produção</mat-option>
            <mat-option value="2">2 - Homologação</mat-option>
        </mat-select>
        </mat-form-field>

         <mat-form-field appearance="outline">
          <mat-label>Finalidade</mat-label>
          <mat-select formControlName="finalidade">
            <mat-option value="1">1 - Normal</mat-option>
            <mat-option value="2">2 - Complementar</mat-option>
            <mat-option value="3">Ajuste</mat-option>
            <mat-option value="4">Devolução</mat-option>
        </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Destinatario Final</mat-label>
          <mat-select formControlName="consumidorFinal">
            <mat-option value="0">0 - Intermediario</mat-option>
            <mat-option value="1">1 - Consumidor Final</mat-option>
          </mat-select>
        </mat-form-field>

         <mat-form-field appearance="outline">
          <mat-label>Venda Presencial ?</mat-label>
          <mat-select formControlName="vendaPresencial">
            <mat-option value="1">Sim</mat-option>
            <mat-option value="2">Não</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Houve Intermediador/Marketplane ?</mat-label>
          <mat-select formControlName="indIntermed">
            <mat-option value="1">Sim</mat-option>
            <mat-option value="2">Não</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Processo e Versão Emissor</mat-label>
          <input matInput formControlName="processoVersaoEmissor">
        </mat-form-field>
        

      </form>
    </mat-card>
  `
})
export class GeraisNfeComponent {
  @Input() formGeral!: FormGroup; // aqui é onde liga ao form nfe
 

  constructor(private dialog: MatDialog) {}


abrirBuscaFornecedor() {
  const dialogRef = this.dialog.open(BuscaFornecedorDialogComponent, {
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.formGeral.patchValue({ razaoSocial: result.razaoSocial, cnpj: result.cnpj });
    }
  });
 }

 
}