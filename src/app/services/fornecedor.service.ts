import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private readonly apiUrl = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) {}

  listar(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }
}