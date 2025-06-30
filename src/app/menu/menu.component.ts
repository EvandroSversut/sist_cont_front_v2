import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    //localStorage.removeItem('token');
    //window.location.href = '/';

  }
}
