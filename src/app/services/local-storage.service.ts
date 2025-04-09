import { Injectable } from '@angular/core';
import { State } from '../store/notes';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'notesState';

  getState(): State | null {
    const state = localStorage.getItem(this.storageKey);
    return state ? JSON.parse(state) : null;
  }

  saveState(state: State): void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  clearState(): void {
    localStorage.removeItem(this.storageKey);
  }
}
