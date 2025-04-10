import { createReducer, on } from "@ngrx/store";
import { Note } from "../../models/note.model";
import { createNoteSucess, loadNoteById, loadNotesSucess, resetLoadNote, removeSelectedNote, selectNote, createNoteFailure, loadState } from "./note.actions";



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
    emojiRef: 'initial'
  }
}

export const notesReducer = createReducer(
  initialState,

  on(loadState, (state, { savedState}) => {
    return { ...savedState };
  }),

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

  on(loadNoteById, (state, { id }) => {
    const note = state.notes.find(n => n.id === id) || initialState.note;
    return { ...state, note };
  }),

  on(resetLoadNote, (state) => {
    return { ...state, note: initialState.note }
  }),

  //! CRUD BACKEND
  //Create
  on(createNoteSucess, (state, { newNote }) => {
    return { ...state, notes: [...state.notes, { ...newNote }] }
  }),

  on(createNoteFailure, (state, { status, description }) => {
    console.log(`status: ${status} description: ${description}`);
    return { ...state }
  })




);