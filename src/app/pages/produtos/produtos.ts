import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({ selector: 'app-produtos', imports: [CurrencyPipe, RouterLink], templateUrl: './produtos.html', styleUrl: './produtos.css' })
export class Produtos implements OnInit {
  produtos: Produto[] = [];
  mensagem = '';
  constructor(private produtoService: ProdutoService) {}
  ngOnInit(): void { this.carregar(); }
  excluir(produto: Produto): void { if (!confirm(`Deseja realmente excluir o produto “${produto.nome}”?`)) return; this.produtoService.excluir(produto.id); this.carregar(); this.mensagem = 'Produto excluído com sucesso.'; }
  private carregar(): void { this.produtos = this.produtoService.listar(); }
}
