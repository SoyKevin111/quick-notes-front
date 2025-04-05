import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ManagedCardsComponent } from './managed-cards/managed-cards.component';

@Component({
  selector: 'app-notes-app',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notes-app.component.html',
  styleUrl: './notes-app.component.scss'
})
export class NotesAppComponent {

}
