import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  constructor() { }

  getEmojiPath(ref: string): string {
    const refLower = ref.toLowerCase();
    return `assets/img/emoji-ref/${refLower}.png`;
  }
  getEmojiRandomBg(): string {
    const pastelColors = [
      '#FFD1DC', // rosa pastel
      '#FFECB3', // amarillo suave
      '#C8E6C9', // verde menta
      '#B3E5FC', // celeste claro
      '#E1BEE7', // lila suave
      '#F8BBD0', // rosa chicle
      '#DCEDC8', // lima suave
      '#FFF9C4', // amarillo mantequilla
      '#D1C4E9', // lavanda
      '#B2DFDB'  // aqua pálido
    ];
    const index = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[index];
  }

}
