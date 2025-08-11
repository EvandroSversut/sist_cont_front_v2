import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Ibge, IbgeService } from '../../services/ibge.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-ibge-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule
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

        <mat-form-field class="field" matTooltip="2 dígitos do código da UF + 5 dígitos do IBGE.">
          <mat-label>Cod IBGE</mat-label>
          <input matInput formControlName="codIbgeCompl" maxlength="7">
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field class="field">
          <mat-label>Nome do Estado</mat-label>
          <input matInput formControlName="nomeUf">
        </mat-form-field>
      </div>

      <div class="form-row">
        <mat-form-field class="field">
          <mat-label>Código da UF</mat-label>
          <input matInput formControlName="codUf" maxlength="2">
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

    <mat-form-field appearance="outline" style="width:100%">
      <mat-label>Filtrar</mat-label>
      <input matInput [(ngModel)]="filtro" (keyup)="aplicarFiltro()" placeholder="Digite nome, UF ou código">
    </mat-form-field>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 full-width">

      <ng-container matColumnDef="nomeMun">
        <th mat-header-cell *matHeaderCellDef> Município </th>
        <td mat-cell *matCellDef="let row"> {{row.nomeMun}} </td>
      </ng-container>

      <ng-container matColumnDef="ufIbge">
        <th mat-header-cell *matHeaderCellDef> UF </th>
        <td mat-cell *matCellDef="let row"> {{row.ufIbge}} </td>
      </ng-container>

      <ng-container matColumnDef="nomeUf">
        <th mat-header-cell *matHeaderCellDef> Nome Estado </th>
        <td mat-cell *matCellDef="let row"> {{row.nomeUf}} </td>
      </ng-container>

      <ng-container matColumnDef="codIbgeCompl">
        <th mat-header-cell *matHeaderCellDef> Cod Ibge </th>
        <td mat-cell *matCellDef="let row"> {{row.codIbgeCompl}} </td>
      </ng-container>

      <ng-container matColumnDef="regiao">
        <th mat-header-cell *matHeaderCellDef> Região </th>
        <td mat-cell *matCellDef="let row"> {{row.regiao}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

    </table>

    <mat-paginator [length]="totalRegistros"
                   [pageSize]="pageSize"
                   [pageSizeOptions]="[5, 10, 20]"
                   (page)="onPaginateChange($event)"
                   showFirstLastButtons>
    </mat-paginator>

  </mat-card-content>
</mat-card>
  `,
  styles: [`
    .form-container {
      margin-top: 40px;
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
export class IbgeFormComponent implements AfterViewInit {
  formIbge: FormGroup;
  displayedColumns: string[] = ['nomeMun','ufIbge', 'nomeUf', 'codIbgeCompl', 'regiao'];
  dataSource = new MatTableDataSource<Ibge>([]);

  filtro = '';
  totalRegistros = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private ibgeService: IbgeService) {
    this.formIbge = this.fb.group({
      ufIbge: ['', Validators.required],
      codIbgeCompl: ['', Validators.required],
      nomeUf: ['', Validators.required],
      nomeMun: ['', Validators.required],
      codUf: ['', Validators.required],
      regiao: ['', Validators.required]
    });

    this.carregarIbges(0, this.pageSize); // carrega ao iniciar
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  salvar() {
    if (this.formIbge.valid) {
      this.ibgeService.salvar(this.formIbge.value).subscribe({
        next: () => {
          this.formIbge.reset();
          this.carregarIbges(0, this.pageSize);
          alert('Salvo com sucesso!');
        },
        error: err => alert('Erro ao salvar: ' + err.message)
      });
    }
  }

  carregarIbges(page: number, size: number) {
    this.ibgeService.listar(this.filtro, page, size).subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
        this.totalRegistros = res.totalElements;
        console.log('📥 Dados recebidos do backend:', res);
      },
      error: (err) => console.error('Erro ao buscar dados IBGE:', err)
    });
  }

  aplicarFiltro() {
    this.paginator.pageIndex = 0;
    this.carregarIbges(0, this.pageSize);
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.carregarIbges(event.pageIndex, this.pageSize);
  }
}
