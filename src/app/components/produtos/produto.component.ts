import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { JuridicaDTO } from '../../dto/juridica.dto';
import { PessoaJuridicaService } from '../../services/pessoa-juridica.service';
import { PessoaJuridica } from '../../model/pessoa-juridica';
import { Pessoa } from '../../model/pessoa.model';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

    // ✅ Importação dos módulos do Angular Material
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutosComponent {
  // 🔥 Toda sua lógica permanece igual
  pessoaJur: JuridicaDTO = this.novaPessoa();
  usuarios: JuridicaDTO[] = []; // <- sua lista da tabela
  filtro: string = '';
  mensagemErro = '';
  
  displayedColumns: string[] = ['nome', 'email', 'cnpj', 'acoes']; // nome das colunas
  dataSource = new MatTableDataSource<JuridicaDTO>();

  constructor(
    private service: PessoaJuridicaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarTabela();
    this.buscar();
  }

  
  buscar() { /* ... */ }
  
  excluir(id: number) { /* ... */ }
  novo() { this.limparFormulario(); }
  limparFormulario() { this.pessoaJur = this.novaPessoa(); }
  tratarErro(err: any) { /* ... */ }

   salvar() {
    this.service.salvar(this.pessoaJur).subscribe({
      next: (res) => {
        alert('Pessoa Jurídica salva com sucesso!');
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro ao salvar', err);
        alert('Erro ao salvar');
      }
    });
  }

   carregarTabela() {
    console.log('📤 Buscando lista de pessoas jurídicas...');
    this.service.listar().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
         console.log('📥 Dados recebidos do backend:', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar dados:', erro);
      }
    });
  }

  novaPessoa(): JuridicaDTO {
    return {
      id: undefined,
      razaoSocial: '',
      cnpj: '',
      inscEstadual: '',
      inscMunicipal: '',
      nomeFantasia: '',
      telefone: '',
      email: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: ''
    };
  }

   editar(juridica: JuridicaDTO) {
  this.pessoaJur = { ...juridica }; // <-- Clona o objeto para o formulário
   console.log('Editando:', this.pessoaJur);
  }
}

    //idPessoaFisica: usuario.idPessoaFisica || usuario.id,
   // idJur: juridica.id,
   // razaoSocial: juridica.nome,
   // cnpj: juridica.cnpj,
  //  nomeFantasia: juridica.nomeFantasia,
   // inscEstadual: juridica.inscEstadual,
   // inscMunicipal: juridica.inscMunicipal,
   // email: juridica.email,
   // telefone: juridica.telefone,
   // rua: juridica.rua,
   // numero: juridica.numero,
   // complemento: juridica.complemento,
   // bairro: juridica.bairro,
   // cep: juridica.cep,
   // cidade: juridica.cidade,
   // uf: juridica.uf,
  


