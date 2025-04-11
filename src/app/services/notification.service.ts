import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { deleteNote, removeSelectedNote } from '../store/notes';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private store = inject(Store);

  constructor() { }

  showSuccess(type: string) {
    let title = '';
    let text = '';

    switch (type) {
      case 'CREATE':
        title = 'SAVED';
        text = 'Note created successfully.';
        break;
      case 'UPDATE':
        title = 'UPDATED';
        text = 'Note updated successfully.';
        break;
      default:
        title = 'SUCCESS';
        text = 'Operation completed successfully.';
        break;
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'success'
    });
  }

  showError(description: string, status: string) {
    Swal.fire({
      title: 'UNKNOWN_ERROR',
      text: status,
      footer: description,
      icon: 'error'
    });
  }

  showConfirmationDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: 'btn btn-danger me-2',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deleteNote({ id }));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.store.dispatch(removeSelectedNote())
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

}
