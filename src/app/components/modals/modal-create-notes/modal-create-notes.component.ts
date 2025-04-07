import { Component, inject, Inject, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal-create-notes',
  standalone: true,
  imports: [],
  templateUrl: './modal-create-notes.component.html',
  styleUrl: './modal-create-notes.component.scss'
})
export class ModalCreateNotesComponent {

  private modalService = inject(ModalService);
  @Input() modalVisible: boolean = false;
  @Input() message:string = '';

  close() {
    this.modalVisible = false;
    this.modalService.close()
  }

}
