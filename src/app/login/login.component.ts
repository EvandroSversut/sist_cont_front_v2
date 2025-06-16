import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  fazerLogin() {
    console.log('Enviando para o back-end:', this.login, this.senha);
    console.log('🔵 Iniciando login no Angular...');
    console.time('⏱️ Tempo total do login (Angular)');

    this.http.post<{ token: string }>('http://localhost:8080/api/login', {
      email: this.login,
      senha: this.senha
    }).subscribe({
      next: (res) => {
        console.log('✅ Token recebido:', res.token);

        // Salva o token no localStorage
        localStorage.setItem('token', res.token);

        // Redireciona para a próxima tela
        this.router.navigate(['/home']);

        console.timeEnd('⏱️ Tempo total do login (Angular)');
      },
      error: (err) => {
        console.error('❌ Erro ao fazer login:', err);
        this.mensagemErro = 'Login ou senha inválidos!';
        console.timeEnd('⏱️ Tempo total do login (Angular)');
      }
    });
  }
}
