import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  sucesso(mensagem: string): void {
    void Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: mensagem,
      confirmButtonText: 'OK',
      confirmButtonColor: '#a85b73'
    });
  }

  erro(mensagem: string): void {
    void Swal.fire({
      icon: 'error',
      title: 'Não foi possível concluir',
      text: mensagem,
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#a85b73'
    });
  }
}