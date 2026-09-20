export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  cep: string;
  rua: string | null;
  numero: string;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
}