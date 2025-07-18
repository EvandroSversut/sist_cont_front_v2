import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { PessoaJuridica } from '../../../model/pessoa-juridica';
import { ComprasService } from '../../../services/compras.service';
import { JuridicaDTO } from '../../../dto/juridica.dto';



@Component({
  selector: 'app-busca-fornecedor-dialog',
  standalone: true,
  templateUrl: './busca-fornecedor-dialog.component.html',
  styleUrls: ['./busca-fornecedor-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class BuscaFornecedorDialogComponent {
  fornecedores: JuridicaDTO[] = [];
  fornecedoresFiltrados: JuridicaDTO[] = [];
  filtro = '';

  constructor(
    public dialogRef: MatDialogRef<BuscaFornecedorDialogComponent>,
    private service: ComprasService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.carregarFornecedores();
  }

  carregarFornecedores() {
    this.service.getFornecedores().subscribe(data => {
      console.log('Fornecedores carregados:', data);  // <-- Aqui imprime os dados recebidos da API
      this.fornecedores = data;
      this.fornecedoresFiltrados = data;
    });
  }

  aplicarFiltro() {
    const valor = this.filtro.trim().toLowerCase();
    this.fornecedoresFiltrados = this.fornecedores.filter(f => 
      f.razaoSocial.toLowerCase().includes(valor) || f.cnpj.includes(valor)
    );
  }

  selecionar(f: JuridicaDTO) {
    console.log('Fornecedor selecionado no dialog:', f);
    this.dialogRef.close(f); // Aqui está retornando o fornecedor completo
  }

  fechar() {
    this.dialogRef.close();
  }
}
