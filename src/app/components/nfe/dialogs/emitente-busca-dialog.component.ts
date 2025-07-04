import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { EmitenteService } from '../../../services/emitente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-emitente-busca-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <mat-card class="p-4" style="min-width: 400px;">
      <h2 class="mb-4">🔍 Buscar Emitente</h2>

      <mat-form-field appearance="outline" class="w-full mb-4">
        <mat-label>Nome ou CNPJ</mat-label>
        <input matInput [(ngModel)]="filtro" placeholder="Digite o nome ou CNPJ do emitente">
      </mat-form-field>

      <div class="flex justify-end mb-4">
        <button mat-raised-button color="primary" (click)="buscar()">
          <mat-icon>search</mat-icon>
          Buscar
        </button>
      </div>

      <mat-list>
        <mat-list-item *ngFor="let emitente of emitentes" (click)="selecionar(emitente)" style="cursor: pointer;">
          <mat-icon matListIcon>business</mat-icon>
          <div matLine>{{ emitente.razaoSocial }}</div>
          <div matLine class="text-sm text-gray-500">{{ emitente.cnpj }}</div>
        </mat-list-item>
      </mat-list>
    </mat-card>
  `,
  styles: [`
    mat-list-item:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class EmitenteBuscaDialogComponent {
  filtro = '';
  emitentes: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<EmitenteBuscaDialogComponent>,
    private emitenteService: EmitenteService
  ) {}

  buscar() {
    this.emitenteService.buscarEmitentes(this.filtro).subscribe(data => {
      this.emitentes = data;
    });
  }

  selecionar(emitente: any) {
    this.dialogRef.close(emitente);
  }
}
