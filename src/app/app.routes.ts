import { Routes } from '@angular/router';
import { NotesAppComponent } from './components/notes-app.component';
import { FormNotesComponent } from './components/form-notes/form-notes.component';
import { ManagedCardsComponent } from './components/managed-cards/managed-cards.component';

export const routes: Routes = [


	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/notes'
	},
	{
		path: 'notes', //todas las notas
		component: ManagedCardsComponent
	},
	{
		path: 'notes/:id ',//consulta por id
		component: FormNotesComponent
	},
	{
		path: 'notes/update/:id',
		component:FormNotesComponent
	}

];
