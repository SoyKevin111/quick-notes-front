import { createReducer, on } from "@ngrx/store";
import { Note } from "./note.model";
import { loadNotesSucess, selectNote } from "./note.actions";


export interface State {
	notes: Note[],
	noteSelected:Note
}

export const initialState: State = {
	notes: [],
	noteSelected:{
		id: 0,
		title: '',
		emojiRef: '',
		description: ''
	}
}

export const notesReducer = createReducer(
  initialState,
  on(loadNotesSucess, (state, { notes }) => {
    return { ...state, notes };
  }),
  on(selectNote, (state, { noteSelected }) => ({
    ...state,
    noteSelected
  }))
);