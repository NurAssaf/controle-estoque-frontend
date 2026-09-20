import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Categoria } from '../../models/categoria.model';
import { Fornecedor } from '../../models/fornecedor.model';
import { ProdutoInput } from '../../models/produto.model';
import { CategoriaService } from '../../services/categoria.service';
import { FornecedorService } from '../../services/fornecedor.service';
import { ProdutoService } from '../../services/produto.service';

function textoObrigatorio(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim()
    ? null
    : { required: true };
}

function precoPositivo(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'number' &&
    Number.isFinite(control.value) &&
    control.value > 0
    ? null
    : { positivo: true };
}

function quantidadeInteira(control: AbstractControl): ValidationErrors | null {
  return Number.isInteger(control.value)
    ? null
    : { inteiro: true };
}

@Component({
  selector: 'app-produto-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm implements OnInit {
  editando = false;
  produtoId?: number;
  naoEncontrado = false;
  carregando = true;
  salvando = false;
  erro = '';

  categorias: Categoria[] = [];
  fornecedores: Fornecedor[] = [];

  form;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private fornecedorService: FornecedorService
  ) {
    this.form = this.fb.group({
      nome: this.fb.nonNullable.control('', textoObrigatorio),
      marca: this.fb.nonNullable.control('', textoObrigatorio),
      preco: this.fb.control<number | null>(
        null,
        [Validators.required, precoPositivo]
      ),
      quantidadeEstoque: this.fb.control<number | null>(
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(2147483647),
          quantidadeInteira
        ]
      ),
      categoriaId: this.fb.control<number | null>(null),
      fornecedorId: this.fb.control<number | null>(null)
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.editando = true;
      this.produtoId = Number(id);

      if (!Number.isSafeInteger(this.produtoId) || this.produtoId <= 0) {
        this.naoEncontrado = true;
        this.carregando = false;
        return;
      }
    }

    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erro = '';
    this.form.disable();

    const consultas = {
      categorias: this.categoriaService.listar(),
      fornecedores: this.fornecedorService.listar()
    };

    if (this.editando && this.produtoId !== undefined) {
      forkJoin({
        ...consultas,
        produto: this.produtoService.buscarPorId(this.produtoId)
      }).subscribe({
        next: ({ categorias, fornecedores, produto }) => {
          this.categorias = categorias;
          this.fornecedores = fornecedores;

          this.form.setValue({
            nome: produto.nome,
            marca: produto.marca,
            preco: produto.preco,
            quantidadeEstoque: produto.quantidadeEstoque,
            categoriaId: produto.categoria?.id ?? null,
            fornecedorId: produto.fornecedor?.id ?? null
          });

          this.finalizarCarregamento();
        },
        error: (resposta: HttpErrorResponse) => {
          this.tratarErroCarregamento(resposta);
        }
      });
    } else {
      forkJoin(consultas).subscribe({
        next: ({ categorias, fornecedores }) => {
          this.categorias = categorias;
          this.fornecedores = fornecedores;
          this.finalizarCarregamento();
        },
        error: (resposta: HttpErrorResponse) => {
          this.tratarErroCarregamento(resposta);
        }
      });
    }
  }

  salvar(): void {
    if (this.carregando || this.salvando || this.form.disabled) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.getRawValue();

    if (dados.preco === null || dados.quantidadeEstoque === null) {
      return;
    }

    const produto: ProdutoInput = {
      nome: dados.nome.trim(),
      marca: dados.marca.trim(),
      preco: dados.preco,
      quantidadeEstoque: dados.quantidadeEstoque,
      categoriaId: dados.categoriaId,
      fornecedorId: dados.fornecedorId
    };

    const requisicao = this.editando && this.produtoId !== undefined
      ? this.produtoService.atualizar(this.produtoId, produto)
      : this.produtoService.criar(produto);

    this.salvando = true;
    this.erro = '';
    this.form.disable();

    requisicao.subscribe({
      next: () => {
        this.salvando = false;
        this.form.enable();
        this.router.navigate(['/sistema/produtos']);
      },
      error: (resposta: HttpErrorResponse) => {
        this.erro = this.obterMensagemErro(
          resposta,
          'Não foi possível salvar o produto.'
        );
        this.salvando = false;
        this.form.enable();
      }
    });
  }

  invalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  private finalizarCarregamento(): void {
    this.carregando = false;
    this.form.enable();
  }

  private tratarErroCarregamento(resposta: HttpErrorResponse): void {
    this.carregando = false;
    this.erro = this.obterMensagemErro(
      resposta,
      'Não foi possível carregar os dados do formulário.'
    );
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