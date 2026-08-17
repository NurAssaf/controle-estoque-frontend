import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', imports: [ReactiveFormsModule], templateUrl: './login.html', styleUrl: './login.css' })
export class Login {
  form;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], senha: ['', Validators.required] });
  }
  entrar(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.auth.entrar(); this.router.navigate(['/sistema/produtos']); }
}
