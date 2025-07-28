import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ajuda-stPisCofin-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './ajuda-stPisCofins-dialog.component.html',
  styleUrls: ['./ajuda-stPisCofins-dialog.component.css']
})
export class AjudastPisCofinsDialogComponent {

  cstList = [
    { codigo: '01', descricao: 'Operação Tributável com Alíquota Básica' },
    { codigo: '02', descricao: 'Operação Tributável com Alíquota Diferenciada' },
    { codigo: '03', descricao: 'Tributação por Unidade de Medida' },
    { codigo: '04', descricao: 'Monofásico - Alíquota Zero' },
    { codigo: '05', descricao: 'Substituição Tributária' },
    { codigo: '06', descricao: 'Alíquota Zero' },
    { codigo: '07', descricao: 'Isenta da Contribuição' },
    { codigo: '08', descricao: 'Sem Incidência' },
    { codigo: '09', descricao: 'Com Suspensão' },
    { codigo: '49', descricao: 'Outras Operações de Saída' },
    { codigo: '50', descricao: 'Com Direito a Crédito - Receita Interna Tributada' },
    { codigo: '51', descricao: 'Com Direito a Crédito - Receita Interna Não Tributada' },
    { codigo: '52', descricao: 'Com Direito a Crédito - Receita de Exportação' },
    { codigo: '53', descricao: 'Com Crédito - Receita Tributada e Não Tributada' },
    { codigo: '60', descricao: 'Crédito Presumido - Receita Tributada' },
    { codigo: '70', descricao: 'Sem Direito a Crédito' },
    { codigo: '71', descricao: 'Com Isenção' },
    { codigo: '72', descricao: 'Com Suspensão' },
    { codigo: '73', descricao: 'Alíquota Zero' },
    { codigo: '74', descricao: 'Sem Incidência' },
    { codigo: '75', descricao: 'Por Substituição Tributária' },
    { codigo: '98', descricao: 'Outras Operações de Entrada' },
    { codigo: '99', descricao: 'Outras Operações' },
    // Adicione outros conforme necessário
  ];
}

