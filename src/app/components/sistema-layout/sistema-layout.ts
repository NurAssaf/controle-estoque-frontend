import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-sistema-layout', imports: [RouterOutlet, RouterLink, RouterLinkActive], templateUrl: './sistema-layout.html', styleUrl: './sistema-layout.css' })
export class SistemaLayout {
  constructor(private auth: AuthService, private router: Router) {}
  sair(): void { this.auth.sair(); this.router.navigate(['/login']); }
}
