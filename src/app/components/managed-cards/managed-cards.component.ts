import { Component } from '@angular/core';
import { CardNoteComponent } from '../card-note/card-note.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-managed-cards',
  standalone: true,
  imports: [CardNoteComponent, RouterModule],
  templateUrl: './managed-cards.component.html',
  styleUrl: './managed-cards.component.scss'
})
export class ManagedCardsComponent {

}
