import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmitenteBuscaDialogComponent } from './dialogs/emitente-busca-dialog.component';

@Component({
  selector: 'app-emitente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule
],
  template: `
    <mat-card class="p-4 mb-4">

      <!-- Botão separado para buscar emitente -->
      <div class="flex justify-end mb-4">
        <button mat-raised-button color="primary" (click)="abrirBuscaEmitente()">
          <mat-icon class="mr-2">search</mat-icon> Buscar Emitente
        </button>
      </div>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Razão Social</mat-label>
        <input matInput formControlName="razaoSocial" placeholder="Razão Social">
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>CNPJ</mat-label>
        <input matInput formControlName="cnpj">
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>UF</mat-label>
        <mat-select formControlName="uf">
          <mat-option value="SP">SP</mat-option>
          <mat-option value="RJ">RJ</mat-option>
          <mat-option value="MG">MG</mat-option>
        </mat-select>
      </mat-form-field>

      <!-- adicione os outros campos conforme sua necessidade -->
      
    </mat-card>
  `
})
export class EmitenteFormComponent {
  @Input() formEmitente!: FormGroup;

  constructor(private dialog: MatDialog) {}

 abrirBuscaEmitente() {
  const dialogRef = this.dialog.open(EmitenteBuscaDialogComponent, {
    width: '800px',      // ➡️ Aumenta a largura
    maxHeight: '85vh',   // ➡️ Limita a altura máxima para não estourar a tela
    disableClose: false  // ➡️ Opcional: permite fechar clicando fora do dialog
    
  
 
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.formEmitente.patchValue(result);
    }
  });
}
}