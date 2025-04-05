import { Component } from '@angular/core';
import { NotesAppComponent } from './components/notes-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotesAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quick-notes-frontend';
}
