import { Component, inject, Inject } from '@angular/core';
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
import { ibge } from '../../../model/ibge.model';
import { Ibge, IbgeService } from '../../../services/ibge.service';
import { IbgeDTO } from '../../../dto/ibge.dto';



@Component({
  selector: 'app-busca-ibge-dialog',
  standalone: true,
  templateUrl: './busca-ibge-dialog.component.html',
  styleUrls: ['./busca-ibge-dialog.component.css'],
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
export class BuscaIbgeDialogComponent {

  ibgeService = inject(IbgeService);
  estadosFiltrados: Ibge[] = [];
  estados: Ibge[] = [];  
  estadoSelecionado!: Ibge;
  carregando = false;
  filtro = '';

    constructor(
    public dialogRef: MatDialogRef<BuscaIbgeDialogComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.carregarFornecedores();
  }

  carregarFornecedores() {
    this.ibgeService.getEstados().subscribe(data => {
      console.log('Estados carregados:', data);  // <-- Aqui imprime os dados recebidos da API
      this.estados = data;
      this.estadosFiltrados = data;
    });
  }
    aplicarFiltro() {
    const valor = this.filtro.trim().toLowerCase();
    this.estadosFiltrados = this.estados.filter(f => 
      f.nomeIbge.toLowerCase().includes(valor) || f.ufIbge.includes(valor)
    );
  }

    selecionar(f: ibge) {
    console.log('Estado selecionado no dialog:', f);
    this.dialogRef.close(f);
  }

    fechar() {
    this.dialogRef.close();
  }
}
  
