import { Component, inject, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



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
    MatDialogModule, 
    MatPaginatorModule
  ]
})
export class BuscaIbgeDialogComponent {

  displayedColumns: string[] = ['ufIbge', 'nomeMun', 'codIbge', 'acoes'];
  dataSource = new MatTableDataSource<Ibge>();
  totalRegistros = 0;
  
  estadosFiltrados: Ibge[] = [];
  estados: Ibge[] = [];  
  estadoSelecionado!: Ibge;
  carregando = false;
  filtro = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

     // ✅ Injetar o MatDialogRef
  constructor(
    private ibgeService: IbgeService,
    private dialogRef: MatDialogRef<BuscaIbgeDialogComponent>
  ) {}
    
  ngOnInit() {
    this.carregarMunicipios(0, 10);
  }

  carregarMunicipios(page: number, size: number) {
    this.ibgeService.listar(this.filtro, page, size).subscribe(res => {
      this.dataSource.data = res.content;
      this.totalRegistros = res.totalElements;
    });
  }
    aplicarFiltro() {
    this.paginator.pageIndex = 0;
    this.carregarMunicipios(0, this.paginator.pageSize || 10);
  }

   onPaginateChange(event: any) {
    this.carregarMunicipios(event.pageIndex, event.pageSize);
  }

    selecionar(f: ibge) {
    console.log('Cidade selecionada no dialog:', f);
    this.dialogRef.close(f);
  }

    fechar() {
    this.dialogRef.close();
  }
}
  
