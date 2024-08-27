import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webFinancas';

  isAuthenticated: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  ngOnInit() {
    let auth = localStorage.getItem('auth');
    if (auth != null) {
      this.isAuthenticated = true;
      this.nomeUsuario = JSON.parse(auth).nome;
      this.emailUsuario = JSON.parse(auth).email;
    }
  }

  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      localStorage.removeItem('auth');
      window.location.href = '/';
    }
  }
}
