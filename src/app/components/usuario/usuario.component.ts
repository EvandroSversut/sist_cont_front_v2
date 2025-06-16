import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PessoaFisica } from '../../model/pessoa-fisica';
import { PessoaFisicaService } from '../../services/pessoa-fisica.service';
import { Usuario } from '../../model/usuario.model';
import { PessoaUsuarioDTO } from '../../dto/pessoa.usuario.dto';
import { Pessoa } from '../../model/pessoa.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  cadastro: PessoaUsuarioDTO = this.novoCadastro();

   mensagemErro = '';

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  // 🔹 Salvar Cadastro
  salvarCadastro() {
      this.usuarioService.cadastrar(this.cadastro).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!!');
        this.cadastro = this.novoCadastro();
      },
      error: (err) => {
        console.error('🚨 Erro recebido:', err);
        if (err.status === 409) {
          this.mensagemErro = 'Usuário já existe!';
        } else if (err.error) {
          this.mensagemErro = err.error; // mensagem vinda do back-end
         } else {
          this.mensagemErro = 'Erro ao cadastrar. Tente novamente.';
          console.error(`❌ Status: ${err.status} | Mensagem:`, err.error);
       }
      }
    });
  }
      

   // 🧠 Cria um novo Usuario
  novoCadastro(): PessoaUsuarioDTO {
    return {
      idPessoaFisica: undefined,
      idUsuario: undefined,
      nome: '',
      cpf: '',
      rg: '',
      //estadoCivil: '',
      telefone: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: '',
      email: '',
      senha: ''
     
    };
  }
}