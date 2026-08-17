import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly key = 'perfumaria_autenticado';
  estaAutenticado(): boolean { return sessionStorage.getItem(this.key) === 'true'; }
  entrar(): void { sessionStorage.setItem(this.key, 'true'); }
  sair(): void { sessionStorage.removeItem(this.key); }
}
