import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { BuscaIbgeDialogComponent } from '../dialogs/ibge/busca-ibge-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CepResponse, CepService } from '../../services/cep.service';

@Component({
  selector: 'app-pessoa-juridica',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    
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
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.css']
})
export class PessoaJuridicaComponent {
  // 🔥 Toda sua lógica permanece igual
  pessoaJur: JuridicaDTO = this.novaPessoa();
  usuarios: JuridicaDTO[] = []; // <- sua lista da tabela
  filtro: string = '';
  mensagemErro = '';
   mensagemErro2: string | null = null;
  
  displayedColumns: string[] = ['nome', 'email', 'cnpj', 'acoes']; // nome das colunas
  dataSource = new MatTableDataSource<JuridicaDTO>();

  constructor(
    private service: PessoaJuridicaService,
    private router: Router,
    private dialog: MatDialog,
    private cepService: CepService,
    private http: HttpClient 
      
  ) {}

  ngOnInit() {
    this.carregarTabela();
    this.buscar();
  }

  
  buscar() { /* ... */ }
  

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
      cnae: '',
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
      uf: '',
      ibge: ''
    };
  }

   editar(juridica: JuridicaDTO) {
  this.pessoaJur = { ...juridica }; // <-- Clona o objeto para o formulário
   console.log('Editando:', this.pessoaJur);
  }

  abrirBuscaIbge() {
    const dialogRef = this.dialog.open(BuscaIbgeDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
         this.pessoaJur.cidade = resultado.nomeMun; // 👈 Preenche o input com o selecionado
        this.pessoaJur.ibge = resultado.codIbgeCompl;
        this.pessoaJur.uf = resultado.ufIbge;
        
      }
    })
}

  excluir(id: number) {
  if (confirm('Tem certeza que deseja excluir esta Pessoa Jurídica?')) {
    this.service.excluir(id).subscribe({
      next: () => {
        alert('Pessoa Jurídica excluída com sucesso!');
        this.carregarTabela(); // Atualiza a tabela após excluir
      },
      error: (erro) => {
        console.error('Erro ao excluir:', erro);
        alert('Erro ao excluir Pessoa Jurídica');
      }
    });
  }
}

 buscarCep() {
    if (!this.pessoaJur.cep) {
      console.log('🚫 CEP vazio, nada a fazer');
      this.mensagemErro = 'Informe o CEP antes de buscar.';
      return;
    }

    console.log('🔍 Chamando serviço de CEP para:', this.pessoaJur.cep);

    this.cepService.buscarCep(this.pessoaJur.cep).subscribe({
      next: (res: CepResponse) => {
        console.log('📦 Resposta recebida do CEP service:', res);

        if (res?.cep) {
          console.log('✅ CEP encontrado, preenchendo dados...');
          this.pessoaJur.rua = res.logradouro;
          this.pessoaJur.bairro = res.bairro;
          this.pessoaJur.cidade = res.localidade;
          this.pessoaJur.uf = res.uf;
          this.pessoaJur.complemento = res.complemento;
          this.pessoaJur.ibge = res.ibge || '';
          this.mensagemErro2 = null;
        } else {
          console.warn('⚠️ CEP não encontrado na resposta');
          this.mensagemErro = 'CEP não encontrado.';
        }
      },
      error: (err) => {
        console.error('💥 Erro ao buscar CEP:', err);
        this.mensagemErro = 'Erro ao buscar o CEP.';
      }
    });
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
  


