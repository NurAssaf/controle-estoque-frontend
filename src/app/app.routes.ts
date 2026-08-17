import { Routes } from '@angular/router';
import { SistemaLayout } from './components/sistema-layout/sistema-layout';
import { authGuard } from './guards/auth.guard';
import { Login } from './pages/login/login';
import { ProdutoForm } from './pages/produto-form/produto-form';
import { Produtos } from './pages/produtos/produtos';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'sistema', component: SistemaLayout, canActivate: [authGuard],
    children: [
      { path: 'produtos', component: Produtos },
      { path: 'produtos/novo', component: ProdutoForm },
      { path: 'produtos/editar/:id', component: ProdutoForm },
      { path: '', pathMatch: 'full', redirectTo: 'produtos' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
