import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MdbModalModule,
  MdbModalService
} from 'mdb-angular-ui-kit/modal';
import { take } from 'rxjs';

import { ConfirmacaoModal } from '../../components/confirmacao-modal/confirmacao-modal';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { NotificacaoService } from '../../services/notificacao.service';

@Component({
  selector: 'app-produtos',
  imports: [CurrencyPipe, RouterLink, MdbModalModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos implements OnInit {
  produtos: Produto[] = [];
  mensagem = '';
  erro = '';
  carregando = false;
  excluindoId: number | null = null;

  private modalAberto = false;

  constructor(
    private produtoService: ProdutoService,
    private modalService: MdbModalService,
    private notificacao: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  excluir(produto: Produto): void {
    if (this.excluindoId !== null || this.modalAberto) {
      return;
    }

    const modalRef = this.modalService.open(ConfirmacaoModal, {
      modalClass: 'modal-dialog-centered',
      data: {
        titulo: 'Excluir produto',
        mensagem: `Deseja realmente excluir o produto “${produto.nome}”?`
      }
    });

    this.modalAberto = true;

    modalRef.onClose.pipe(take(1)).subscribe({
      next: (confirmado: unknown) => {
        this.modalAberto = false;

        if (confirmado === true) {
          this.confirmarExclusao(produto);
        }
      },
      complete: () => {
        this.modalAberto = false;
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

  private confirmarExclusao(produto: Produto): void {
    this.mensagem = '';
    this.erro = '';
    this.excluindoId = produto.id;

    this.produtoService.excluir(produto.id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(
          item => item.id !== produto.id
        );
        this.excluindoId = null;

        this.notificacao.sucesso('Produto excluído com sucesso.');
      },
      error: (resposta: HttpErrorResponse) => {
        this.erro = this.obterMensagemErro(
          resposta,
          'Não foi possível excluir o produto.'
        );
        this.excluindoId = null;

        this.notificacao.erro(this.erro);
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