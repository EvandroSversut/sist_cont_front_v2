import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PessoaFisica } from '../../model/pessoa-fisica';
import { PessoaFisicaService } from '../../services/pessoa-fisica.service';
import { PessoaUsuarioDTO } from '../../dto/pessoa.usuario.dto';

@Component({
  selector: 'app-pessoa-fisica',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.css']
})
export class PessoaFisicaComponent {

 pessoa: PessoaUsuarioDTO = this.novaPessoa();

  usuarios: any[] = [];
  filtro: string = '';
  mensagemErro = '';

  constructor(
    private service: PessoaFisicaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buscar();
  }

  // 🔹 Salvar ou Atualizar
  salvarPessoaFisica() {
    console.log('📤 DTO que será enviado:', this.pessoa);
   
    if (this.pessoa.idPessoaFisica) {
          
      if (!this.pessoa.senha?.trim()) {
      delete this.pessoa.senha;
      
}     // ✅ Aqui deve ser PUT
      this.service.atualizar(this.pessoa).subscribe({
        
        next: () => {
          this.mensagemErro = 'Pessoa Física atualizada com sucesso!';
          this.buscar();
          this.limparFormulario();
        },
        error: (err) => this.tratarErro(err)
      });
    } else {
      // Aqui é POST
      this.service.salvar(this.pessoa).subscribe({
        next: (res) => {
          if (res?.id) {
            this.mensagemErro = 'Pessoa Física cadastrada com sucesso!';
            this.buscar();
            this.limparFormulario();
          } else {
            this.mensagemErro = 'Erro: ID da pessoa não retornado!';
          }
        },
        error: (err) => this.tratarErro(err)
      });
    }
  }

  // 🔍 Buscar pessoas
  buscar() {
    this.service.buscar(this.filtro).subscribe({
      next: res => {
        console.log('🔍 Dados recebidos do backend:', res);
        this.usuarios = [...res]; // cria novo array para forçar a atualização
        this.usuarios = res;
        this.mensagemErro = '';
      },
      error: err => {
        this.mensagemErro = 'Erro ao buscar usuários.';
        console.error(err);
      }
    });
  }

  editar(usuario: any) {
  this.pessoa = {
    idPessoaFisica: usuario.idPessoaFisica || usuario.id,
    idUsuario: usuario.idUsuario,
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone,
    senha: '', // vazio para não alterar a senha
    rua: usuario.rua,
    numero: usuario.numero,
    complemento: usuario.complemento,
    bairro: usuario.bairro,
    cep: usuario.cep,
    cidade: usuario.cidade,
    uf: usuario.uf,
    cpf: usuario.cpf,
    rg: usuario.rg
  };

  console.log('✏️ Editando pessoa:', this.pessoa);
   console.log('✏️ Editando pessoa:', this.pessoa.idPessoaFisica);
    console.log('✏️ Editando pessoa:', this.pessoa.idUsuario);
}


  // 🗑️ Excluir
  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.buscar();
        },
        error: err => {
          console.error(err);
          alert('Erro ao excluir usuário.');
        }
      });
    }
  }

  // ➕ Novo
  novo() {
    this.limparFormulario();
  }

  // 🚫 Limpar formulário
  limparFormulario() {
    this.pessoa = this.novaPessoa();
  }

  // 🔧 Tratamento de erros
  tratarErro(err: any) {
  console.error('Erro detalhado:', err);
  if (err.status === 409) {
    this.mensagemErro = err.error;
  } else if (err.error) {
    this.mensagemErro = `Erro ao salvar Pessoa Física: ${err.error.message || JSON.stringify(err.error)}`;
  } else {
    this.mensagemErro = 'Erro ao salvar Pessoa Física';
  }
  alert(this.mensagemErro);
}


  // 🧠 Cria um novo objeto PessoaFisica vazio
  novaPessoa(): PessoaFisica {
    return {
      id: undefined,
      nome: '',
      cpf: '',
      rg: '',
      //estadoCivil: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: '',
      email: '',
      telefone: ''
    };
  }
}
