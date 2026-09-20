import { Categoria } from './categoria.model';
import { Fornecedor } from './fornecedor.model';

export interface Produto {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  quantidadeEstoque: number;
  categoria: Categoria | null;
  fornecedor: Fornecedor | null;
}

export interface ProdutoInput {
  nome: string;
  marca: string;
  preco: number;
  quantidadeEstoque: number;
  categoriaId: number | null;
  fornecedorId: number | null;
}