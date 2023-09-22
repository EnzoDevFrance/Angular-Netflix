import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-session',
  templateUrl: './choose-session.component.html',
  styleUrls: ['./choose-session.component.scss']
})
export class ChooseSessionComponent {



  colors: string[] = [];

  constructor() {
    this.generateColors();
  }

  generateColors() {
    const numberOfColors = 100; // Vous pouvez augmenter ou diminuer cette valeur selon vos besoins
    const hueIncrement = 360 / numberOfColors;

    for (let i = 0; i < numberOfColors; i++) {
      const hue = i * hueIncrement;
      this.colors.push(`hsl(${hue}, 100%, 50%)`); 
    }
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
  
}
