import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './app.component.html', // ✅ Usa o HTML externo
  styleUrls: ['./app.component.css']    // (opcional se tiver CSS)
})
export class AppComponent {

    constructor(private authService: AuthService) {}

     isLogado(): boolean {
     return this.authService.isLoggedIn();
     }

     ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.startLogoutTimer();
    }
  }

  // Captura qualquer clique ou movimentação do usuário para resetar o timer
  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  resetTimer() {
    this.authService.startLogoutTimer();
  }
}
