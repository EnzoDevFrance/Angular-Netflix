import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.scss']
})
export class CarousselComponent {

  @Input() movies: any[] = [];
  
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  
  ngAfterViewInit() {
    this.initializeSlider()
    }
   
    activeIndex = 0; // the current page on the slider
   
   currentSectionIndex: number = 0;
   
    getGroupedChildren(): HTMLElement[][] {
     const slider = this.slider.nativeElement;
     const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue("--items-per-screen"));
   
     let groups: HTMLElement[][] = [];
     const children = Array.from(this.slider.nativeElement.children) as HTMLElement[];
     while (children.length) {
       groups.push(children.splice(0, itemsPerScreen));
     }
    
     return groups;
   }
   
   initializeSlider() {
     const slider = this.slider.nativeElement;
     const groupedChildren = this.getGroupedChildren();
     this.currentSectionIndex = 0;
   
     // Supprimer tous les éléments actuels du slider.
     while (slider.firstChild) {
       slider.removeChild(slider.firstChild);
     }
   
     // Ajouter les diapositives groupées au slider dans des balises <section>.
     groupedChildren.forEach(group => {
       const section = document.createElement('section');
       group.forEach(child => {
         section.appendChild(child);
       });
        slider.appendChild(section);
     });
     
   }
   

  nextSlide() {
    const sliderElement = this.slider.nativeElement;
    const firstSlide = sliderElement.children[0];
  
    // Cloner le premier élément et le mettre à la fin
    const clonedSlide = firstSlide.cloneNode(true);
    sliderElement.appendChild(clonedSlide);
  
    // Appliquer la transition
    sliderElement.style.transition = 'transform 0.5s ease';
    sliderElement.style.transform = `translateX(-${firstSlide.offsetWidth}px)`;
  
    // Une fois la transition terminée, repositionner sans transition et supprimer le slide original
    setTimeout(() => {
      sliderElement.style.transition = 'none';
      sliderElement.style.transform = 'translateX(0)';
      sliderElement.removeChild(firstSlide);
    }, 500); // La même durée que la transition
  }
  
  
  previousSlide() {
    const sliderElement = this.slider.nativeElement;
    const firstSlide = sliderElement.children[0];
    const lastSlide = sliderElement.children[sliderElement.children.length - 1];
  
    // Cloner le dernier élément et le mettre au début
    const clonedSlide = lastSlide.cloneNode(true);
    sliderElement.insertBefore(clonedSlide, firstSlide);
  
    // Déplacer le carrousel sans animation pour le préparer à la transition
    sliderElement.style.transition = 'none';
    sliderElement.style.transform = `translateX(-${firstSlide.offsetWidth}px)`;
  
    // Forcer un recalcul pour s'assurer que la transformation précédente est appliquée
    getComputedStyle(sliderElement).transform;
  
    // Appliquer la transition
    sliderElement.style.transition = 'transform 0.5s ease';
    sliderElement.style.transform = 'translateX(0)';
  
    // Supprimer le slide original (pas le cloné) après la transition
    setTimeout(() => {
      sliderElement.removeChild(lastSlide);
      sliderElement.style.transition = '';
    }, 500); // La même durée que la transition
  }


}
