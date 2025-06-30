// 📁 src/app/components/nfe/produtos-tabela.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-produtos-tabela',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card *ngIf="produtos.length > 0">
      <mat-card-title>Produtos Adicionados</mat-card-title>
      <table mat-table [dataSource]="produtos" class="w-full" matSort>

        <ng-container matColumnDef="descricao">
          <th mat-header-cell *matHeaderCellDef>Produto</th>
          <td mat-cell *matCellDef="let p">{{ p.descricao }}</td>
        </ng-container>

        <ng-container matColumnDef="quantidade">
          <th mat-header-cell *matHeaderCellDef>Qtd</th>
          <td mat-cell *matCellDef="let p">{{ p.quantidade }}</td>
        </ng-container>

        <ng-container matColumnDef="valorUnitario">
          <th mat-header-cell *matHeaderCellDef>Unit.</th>
          <td mat-cell *matCellDef="let p">R$ {{ p.valorUnitario | number:'1.2-2' }}</td>
        </ng-container>

        <ng-container matColumnDef="desconto">
          <th mat-header-cell *matHeaderCellDef>Desc.</th>
          <td mat-cell *matCellDef="let p">R$ {{ p.desconto | number:'1.2-2' }}</td>
        </ng-container>

        <ng-container matColumnDef="valorTotal">
          <th mat-header-cell *matHeaderCellDef>Total</th>
          <td mat-cell *matCellDef="let p">R$ {{ calcularTotal(p) | number:'1.2-2' }}</td>
        </ng-container>

        <ng-container matColumnDef="acoes">
          <th mat-header-cell *matHeaderCellDef>Ações</th>
          <td mat-cell *matCellDef="let p; let i = index">
            <button mat-icon-button color="warn" (click)="excluirProduto.emit(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  `
})
export class ProdutosTabelaComponent {
  @Input() produtos: any[] = [];
  @Output() excluirProduto = new EventEmitter<number>();

  displayedColumns: string[] = ['descricao', 'quantidade', 'valorUnitario', 'desconto', 'valorTotal', 'acoes'];

  calcularTotal(p: any): number {
    return (p.quantidade * p.valorUnitario) - p.desconto;
  }
}
