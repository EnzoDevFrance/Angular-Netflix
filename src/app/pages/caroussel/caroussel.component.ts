import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.scss']
})
export class CarousselComponent implements AfterViewInit{

  constructor(private renderer: Renderer2, private elementRef: ElementRef){
    
  }

  @ViewChild('sliderElement') sliderElement!: ElementRef;
private sliderIndex = 0;
private totalSlides: number = 0;
private imageWidth: number = 0; // Pour stocker la largeur d'une image
private totalItems: number = 0; // Pour stocker le nombre total d'éléments
private itemsPerScreen: number = 0; // Pour stocker le nombre d'éléments par slide

ngAfterViewInit() {
   setTimeout(() => {
    // Récupérer le nombre total d'éléments dans le slider
   this.totalItems = this.sliderElement.nativeElement.children.length;
   // Récupérer la largeur d'une image (en supposant que toutes les images ont la même largeur)
   this.imageWidth = this.sliderElement.nativeElement.children[0].offsetWidth;
   // Récupérer le nombre d'éléments par slide
   this.itemsPerScreen = parseInt(getComputedStyle(this.sliderElement.nativeElement).getPropertyValue('--items-per-screen'));
   // Calculer le nombre total de slides
   this.totalSlides = Math.ceil(this.totalItems / this.itemsPerScreen);
},2000);

}

scrollR() {
  if (this.sliderIndex < this.totalSlides - 1) {
    this.sliderIndex++;
  } else {
    this.sliderIndex = 0;
  }
  this.updateSliderPosition();
}

scrollL() {
  if (this.sliderIndex > 0) {
    this.sliderIndex--;
  } else {
    this.sliderIndex = this.totalSlides - 1;
  }
  this.updateSliderPosition();
}

private updateSliderPosition() {
   let distanceToSlide = 0;

   if (this.sliderIndex === this.totalSlides - 1 && this.totalItems % this.itemsPerScreen !== 0) {
     // Si c'est la dernière diapositive et qu'il y a moins d'images que itemsPerScreen
     const remainingImages = this.totalItems % this.itemsPerScreen;
     distanceToSlide = this.sliderIndex * this.imageWidth * this.itemsPerScreen - (this.itemsPerScreen - remainingImages) * this.imageWidth;
   } else {
     distanceToSlide = this.sliderIndex * this.imageWidth * this.itemsPerScreen;
   }

   this.sliderElement.nativeElement.style.transform = `translateX(-${distanceToSlide}px)`;
}


}
