import { createReducer, on } from "@ngrx/store";
import { Note } from "./note.model";
import { createNoteSucess, findNoteById, loadNotesSucess, resetNote, removeSelectedNote, selectNote } from "./note.actions";



export interface State {
  notes: Note[],
  noteSelectedId: number
  note: Note
}

export const initialState: State = {
  notes: [],
  noteSelectedId: 0,
  note: {
    title: 'Estado Inicial [TITLE]',
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare mollis semper. Nulla blandit imperdiet accumsan. Proin facilisis turpis posuere lacus sodales, eget tempus orci dapibus. 
    `,
    emojiRef: 'Deport'
  }
}

export const notesReducer = createReducer(
  initialState,
  on(loadNotesSucess, (state, { notes }) => {
    return { ...state, notes };
  }),
  on(selectNote, (state, { noteSelectedId }) => {
    console.log("Note selected: " + noteSelectedId);
    return {
      ...state,
      noteSelectedId
    };
  }),
  on(removeSelectedNote, (state) => {
    //console.log("Note unselected");
    return { ...state, noteSelectedId: 0 }
  }),

  on(findNoteById, (state, { id }) => {
    const note = state.notes.find(n => n.id === id) || initialState.note;
    return { ...state, note };
  }),

  on(resetNote, (state) => {
    return { ...state, note: initialState.note }
  }),

  //! CRUD BACKEND
  //Create
  on(createNoteSucess, (state, { newNote }) => {
    return { ...state, notes: [...state.notes, { ...newNote }] }
  })




);