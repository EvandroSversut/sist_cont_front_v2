import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Ibge, IbgeService } from '../../services/ibge.service';
import { MatTableModule } from '@angular/material/table';

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
    MatTableModule
                     ],
      
  template: `
<form [formGroup]="formIbge" (ngSubmit)="salvar()">
  <mat-card>
    <mat-card-title>Tabela IBGE</mat-card-title>
    <mat-card-content>

      <mat-form-field class="full-width">
        <mat-label>Cod IBGE</mat-label>
        <input matInput formControlName="codIbge">
      </mat-form-field>

      <mat-form-field class="full-width">
        <mat-label>Nome IBGE</mat-label>
        <input matInput formControlName="nomeIbge">
      </mat-form-field>

      <mat-form-field class="full-width">
        <mat-label>UF IBGE</mat-label>
        <input matInput formControlName="ufIbge">
      </mat-form-field>

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

      <!-- Cod IBGE -->
      <ng-container matColumnDef="codIbge">
        <th mat-header-cell *matHeaderCellDef> Código </th>
        <td mat-cell *matCellDef="let row"> {{row.codIbge}} </td>
      </ng-container>

      <!-- Nome IBGE -->
      <ng-container matColumnDef="nomeIbge">
        <th mat-header-cell *matHeaderCellDef> Nome </th>
        <td mat-cell *matCellDef="let row"> {{row.nomeIbge}} </td>
      </ng-container>

      <!-- UF IBGE -->
      <ng-container matColumnDef="ufIbge">
        <th mat-header-cell *matHeaderCellDef> UF </th>
        <td mat-cell *matCellDef="let row"> {{row.ufIbge}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

    </table>
  </mat-card-content>
</mat-card>

  `,
  styles: [`.full-width { width: 100%; margin-bottom: 16px; }`]
})
export class IbgeFormComponent {
  formIbge: FormGroup;
  displayedColumns: string[] = ['codIbge', 'nomeIbge', 'ufIbge'];
  dataSource: Ibge[] = [];

  constructor(private fb: FormBuilder, private ibgeService: IbgeService) {
    this.formIbge = this.fb.group({
      codIbge: ['', Validators.required],
      nomeIbge: ['', Validators.required],
      ufIbge: ['', Validators.required]
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
