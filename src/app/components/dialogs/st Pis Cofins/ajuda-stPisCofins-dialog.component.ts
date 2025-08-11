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
    { codigo: '03', descricao: 'Operação Tributável com Alíquota por Unidade' },
    { codigo: '04', descricao: 'Operação Tributável Monofásica - Substituição Tributária' },
    { codigo: '05', descricao: 'Operação Tributável Monofásica - Alíquota por Unidade' },
    { codigo: '06', descricao: 'Operação Tributável Monofásica - Alíquota Diferenciada' },
    { codigo: '07', descricao: 'Operação Isenta' },
    { codigo: '08', descricao: 'Operação Sem Incidência' },
    { codigo: '09', descricao: 'Operação com Suspensão' },
    { codigo: '49', descricao: 'Outras Operações' },
    { codigo: '50', descricao: 'Operação com Suspensão (ex: processamento)' },
    { codigo: '51', descricao: 'Operação com Alíquota Zero' },
    { codigo: '52', descricao: 'Operação com Alíquota Zero (ex: exportação)' },
    { codigo: '53', descricao: 'Operação Isenta de Contribuições' },
    { codigo: '54', descricao: 'Operação Não Tributável' },
    { codigo: '55', descricao: 'Operação com Suspensão para Segmentos Específicos' },
    { codigo: '56', descricao: 'Operação Tributável com Alíquota Reduzida' },
    { codigo: '60', descricao: 'Crédito Presumido' },
    { codigo: '61', descricao: 'Crédito da Atividade Rural' },
    { codigo: '62', descricao: 'Crédito de Aquisições para Comercialização' },
    { codigo: '63', descricao: 'Crédito de Aquisições para Industrialização' },
    { codigo: '64', descricao: 'Crédito de Serviços' },
    { codigo: '65', descricao: 'Crédito de Energia Elétrica' },
    { codigo: '66', descricao: 'Crédito de Arrendamento Mercantil' },
    { codigo: '67', descricao: 'Crédito de Subvenção para Custeio ou Investimento' },
    { codigo: '70', descricao: 'Crédito de Ativo Imobilizado' },
    { codigo: '71', descricao: 'Crédito de Bens de Ativo Imobilizado' },
    { codigo: '72', descricao: 'Crédito de Bens para Revenda' },
    { codigo: '73', descricao: 'Crédito de Bens para Industrialização' },
    { codigo: '74', descricao: 'Crédito de Serviços para Uso Próprio ou Consumo' },
    { codigo: '75', descricao: 'Crédito de Energia Elétrica para Uso Próprio ou Consumo' },
    { codigo: '98', descricao: 'Outras Situações' },
    { codigo: '99', descricao: 'Outras Situações Não Especificadas' }
  ];
}