export interface Produto { id: number; nome: string; marca: string; categoria: string; preco: number; quantidade: number; }
export type ProdutoInput = Omit<Produto, 'id'>;
