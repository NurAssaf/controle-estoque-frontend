import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoInput } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({ selector: 'app-produto-form', imports: [ReactiveFormsModule, RouterLink], templateUrl: './produto-form.html', styleUrl: './produto-form.css' })
export class ProdutoForm implements OnInit {
  editando = false;
  produtoId?: number;
  naoEncontrado = false;
  form;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private produtoService: ProdutoService) {
    this.form = this.fb.nonNullable.group({ nome: ['', Validators.required], marca: ['', Validators.required], categoria: ['', Validators.required], preco: [0, [Validators.required, Validators.min(0)]], quantidade: [0, [Validators.required, Validators.min(0)]] });
  }
  ngOnInit(): void { const id = this.route.snapshot.paramMap.get('id'); if (!id) return; this.editando = true; this.produtoId = Number(id); const produto = this.produtoService.buscarPorId(this.produtoId); if (!produto) { this.naoEncontrado = true; return; } const { nome, marca, categoria, preco, quantidade } = produto; this.form.setValue({ nome, marca, categoria, preco, quantidade }); }
  salvar(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const produto: ProdutoInput = this.form.getRawValue(); if (this.editando && this.produtoId !== undefined) this.produtoService.atualizar(this.produtoId, produto); else this.produtoService.criar(produto); this.router.navigate(['/sistema/produtos']); }
  invalido(campo: keyof typeof this.form.controls): boolean { const control = this.form.controls[campo]; return control.touched && control.invalid; }
}
