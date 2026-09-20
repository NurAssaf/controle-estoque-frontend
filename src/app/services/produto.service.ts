import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, ProdutoInput } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  criar(produto: ProdutoInput): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizar(id: number, produto: ProdutoInput): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}