import { Injectable } from '@angular/core';
import { Produto, ProdutoInput } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly storageKey = 'perfumaria_produtos';
  private readonly iniciais: Produto[] = [
    { id: 1, nome: 'La Vie Est Belle', marca: 'Lancôme', categoria: 'Feminino', preco: 589.9, quantidade: 12 },
    { id: 2, nome: 'Yara', marca: 'Lattafa', categoria: 'Feminino', preco: 249.9, quantidade: 20 },
    { id: 3, nome: 'Angel', marca: 'Mugler', categoria: 'Feminino', preco: 649.9, quantidade: 8 },
  ];
  constructor() { this.inicializar(); }
  listar(): Produto[] { return this.ler().map((produto) => ({ ...produto })); }
  buscarPorId(id: number): Produto | undefined { const produto = this.ler().find((item) => item.id === id); return produto ? { ...produto } : undefined; }
  criar(produto: ProdutoInput): Produto { const produtos = this.ler(); const novo = { ...produto, id: produtos.length ? Math.max(...produtos.map((item) => item.id)) + 1 : 1 }; this.salvar([...produtos, novo]); return novo; }
  atualizar(id: number, produto: ProdutoInput): boolean { const produtos = this.ler(); const indice = produtos.findIndex((item) => item.id === id); if (indice < 0) return false; produtos[indice] = { ...produto, id }; this.salvar(produtos); return true; }
  excluir(id: number): void { this.salvar(this.ler().filter((produto) => produto.id !== id)); }
  private inicializar(): void { if (!localStorage.getItem(this.storageKey)) this.salvar(this.iniciais); }
  private ler(): Produto[] { try { return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]') as Produto[]; } catch { this.salvar(this.iniciais); return [...this.iniciais]; } }
  private salvar(produtos: Produto[]): void { localStorage.setItem(this.storageKey, JSON.stringify(produtos)); }
}
