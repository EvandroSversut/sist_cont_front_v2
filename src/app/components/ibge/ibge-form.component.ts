import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Ibge, IbgeService } from '../../services/ibge.service';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-ibge-form',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTooltipModule
                     ],
      
  template: `
<form [formGroup]="formIbge" (ngSubmit)="salvar()" class="form-container">
  <mat-card>
    <mat-card-title>Cadastro IBGE</mat-card-title>
    <mat-card-content>

  <div class="form-row">
    <mat-form-field class="field">
      <mat-label>UF</mat-label>
      <input matInput formControlName="ufIbge">
    </mat-form-field>

    <mat-form-field class="field" matTooltip="2 digitos do cod da unid federativa + 5 dig do ibge.">
      <mat-label>Cod IBGE</mat-label>
      <input matInput formControlName="codIbge" maxlength="7">
    </mat-form-field>
  </div>

  <div class="form-row">
    <mat-form-field class="field">
      <mat-label>Nome do Estado</mat-label>
      <input matInput formControlName="nomeEstado">
    </mat-form-field>

    <mat-form-field class="field">
      <mat-label>Nome do Município</mat-label>
      <input matInput formControlName="nomeMun">
    </mat-form-field>
  </div>

  <div class="form-row">
    <mat-form-field class="field">
      <mat-label>Código da UF</mat-label>
      <input matInput formControlName="codUF" maxlength="2">
    </mat-form-field>

    <mat-form-field class="field">
      <mat-label>Região</mat-label>
      <input matInput formControlName="regiao">
    </mat-form-field>
  </div>

  <button mat-raised-button color="primary" type="submit" [disabled]="formIbge.invalid">
    Salvar
  </button>

</mat-card-content>

  </mat-card>
</form>

<br>

<!-- TABELA IBGE -->
<mat-card>
  <mat-card-title>Registros Cadastrados</mat-card-title>
  <mat-card-content>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 full-width">

      <!-- UF IBGE -->
      <ng-container matColumnDef="ufIbge">
        <th mat-header-cell *matHeaderCellDef> UF </th>
        <td mat-cell *matCellDef="let row"> {{row.ufIbge}} </td>
      </ng-container>

      <!-- Cod IBGE -->
      <ng-container matColumnDef="nomeEstado">
        <th mat-header-cell *matHeaderCellDef> Nome Estado </th>
        <td mat-cell *matCellDef="let row"> {{row.nomeEstado}} </td>
      </ng-container>

      <!-- Nome IBGE -->
      <ng-container matColumnDef="codIbge">
        <th mat-header-cell *matHeaderCellDef> Cod Ibge </th>
        <td mat-cell *matCellDef="let row"> {{row.codIbge}} </td>
      </ng-container>

      <!-- UF IBGE -->
      <ng-container matColumnDef="regiao">
        <th mat-header-cell *matHeaderCellDef> Regiao </th>
        <td mat-cell *matCellDef="let row"> {{row.regiao}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

    </table>
  </mat-card-content>
</mat-card>

  `,
  styles: [`
  .form-container {
    margin-top: 40px; /* ajuste esse valor conforme a altura do seu menu */
  }

  .full-width {
    width: 100%;
    margin-bottom: 16px;
  }

  .form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .field {
    flex: 1;
    min-width: 200px;
  }
`]

})
export class IbgeFormComponent {
  formIbge: FormGroup;
  displayedColumns: string[] = ['ufIbge','nomeEstado','codIbge', 'regiao'];
  dataSource: Ibge[] = [];

  constructor(private fb: FormBuilder, private ibgeService: IbgeService) {
    this.formIbge = this.fb.group({
      ufIbge: ['', Validators.required],
      codIbge: ['', Validators.required],
      nomeEstado: ['', Validators.required],
      nomeMun: ['', Validators.required],
      codUf: ['', Validators.required],
      regiao: ['', Validators.required]
    });

     this.carregarIbges(); // carrega ao iniciar
  }
 
salvar() {
  if (this.formIbge.valid) {
    this.ibgeService.salvar(this.formIbge.value).subscribe({
      next: () => {
        this.formIbge.reset();               // limpa o formulário
        this.carregarIbges();                // ✅ recarrega a lista
        alert('Salvo com sucesso!');
      },
      error: err => alert('Erro ao salvar: ' + err.message)
    });
  }
}


  carregarIbges() {
    this.ibgeService.listar().subscribe({
      next: (data) => this.dataSource = data,
      error: (err) => console.error('Erro ao buscar dados IBGE:', err)
    });
  }
}
