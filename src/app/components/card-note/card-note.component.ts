import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-note',
  standalone: true,
  imports: [],
  templateUrl: './card-note.component.html',
  styleUrl: './card-note.component.scss'
})
export class CardNoteComponent {

  @Input() note: any;

}
