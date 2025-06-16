// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private logoutTimer: any;
  private readonly TIMEOUT_MINUTES = 15; // tempo de expiração, ex: 15 minutos
  
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  
    startLogoutTimer() {
    // Cancela timer anterior se houver
    this.clearLogoutTimer();

    // Define novo timer
    this.logoutTimer = setTimeout(() => {
      this.logout();
      alert('Sessão expirada por inatividade.');
    }, this.TIMEOUT_MINUTES * 60 * 1000); // converte minutos para ms
  }

   clearLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  logout() {
    console.log('Fazendo logout e removendo token...');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

}
