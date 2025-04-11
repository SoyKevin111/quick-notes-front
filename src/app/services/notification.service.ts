import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

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
      case 'DELETE':
        title = 'DELETED';
        text = 'Note deleted successfully.';
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

}
