import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos implements OnInit {
  produtos: Produto[] = [];
  mensagem = '';
  erro = '';
  carregando = false;
  excluindoId: number | null = null;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  excluir(produto: Produto): void {
    if (this.excluindoId !== null) {
      return;
    }

    if (!confirm(`Deseja realmente excluir o produto “${produto.nome}”?`)) {
      return;
    }

    this.mensagem = '';
    this.erro = '';
    this.excluindoId = produto.id;

    this.produtoService.excluir(produto.id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(
          item => item.id !== produto.id
        );
        this.mensagem = 'Produto excluído com sucesso.';
        this.excluindoId = null;
      },
      error: (resposta: HttpErrorResponse) => {
        this.erro = this.obterMensagemErro(
          resposta,
          'Não foi possível excluir o produto.'
        );
        this.excluindoId = null;
      }
    });
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';

    this.produtoService.listar().subscribe({
      next: produtos => {
        this.produtos = produtos;
        this.carregando = false;
      },
      error: (resposta: HttpErrorResponse) => {
        this.erro = this.obterMensagemErro(
          resposta,
          'Não foi possível carregar os produtos.'
        );
        this.carregando = false;
      }
    });
  }

  private obterMensagemErro(
    resposta: HttpErrorResponse,
    mensagemPadrao: string
  ): string {
    if (resposta.status === 0) {
      return 'Não foi possível conectar à API. Confira se o back-end está em execução.';
    }

    const mensagem = resposta.error?.mensagem;

    return typeof mensagem === 'string'
      ? mensagem
      : mensagemPadrao;
  }
}