import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirmacao-modal',
  standalone: true,
  templateUrl: './confirmacao-modal.html'
})
export class ConfirmacaoModal {
  titulo = 'Confirmar exclusão';
  mensagem = 'Deseja realmente excluir este registro?';

  constructor(
    public modalRef: MdbModalRef<ConfirmacaoModal>
  ) {}

  cancelar(): void {
    this.modalRef.close(false);
  }

  confirmar(): void {
    this.modalRef.close(true);
  }
}