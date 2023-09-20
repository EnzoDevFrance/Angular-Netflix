import {Component, Injectable, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit,HostListener} from '@angular/core';
import { MovieApiService } from "../../services/movie-api.service";
import {Router} from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit,AfterViewInit{

  constructor(private service: MovieApiService,private router:Router,private renderer: Renderer2, private elementRef: ElementRef){}

 @ViewChild('carou', { static: false }) carouselElement!: ElementRef;

 ngAfterViewInit() {

 }

//############################################################################################################################################################
    scrollLeft() {
      const firstSlide = this.carouselElement.nativeElement.children[0];
      const lastSlide = this.carouselElement.nativeElement.children[this.carouselElement.nativeElement.children.length - 1];
  
      this.carouselElement.nativeElement.appendChild(firstSlide.cloneNode(true));
      this.carouselElement.nativeElement.style.transition = 'transform 0.5s ease';
      this.carouselElement.nativeElement.style.transform = `translateX(-${firstSlide.offsetWidth}px)`;
      
      // Attendre que l'animation se termine, puis réinitialiser la position du carrousel et supprimer la première diapositive clonée
      setTimeout(() => {
        this.carouselElement.nativeElement.style.transition = '';
        this.carouselElement.nativeElement.style.transform = 'translateX(0)';
        this.carouselElement.nativeElement.scrollLeft += firstSlide.offsetWidth;
        this.carouselElement.nativeElement.removeChild(firstSlide);
      }, 500); // Attendre la même durée que la transition (0.5s) avant de réinitialiser
    }
  
    scrollRight() {
      const firstSlide = this.carouselElement.nativeElement.children[0];
      const lastSlide = this.carouselElement.nativeElement.children[this.carouselElement.nativeElement.children.length - 1];
  
      this.carouselElement.nativeElement.insertBefore(lastSlide.cloneNode(true), firstSlide);
      this.carouselElement.nativeElement.style.transition = '';
      this.carouselElement.nativeElement.style.transform = `translateX(-${firstSlide.offsetWidth}px)`;
  
      // Attendre un délai très court pour permettre la transition, puis réappliquer la transition avec la position réinitialisée et supprimer la dernière diapositive
      setTimeout(() => {
       // this.carouselElement.nativeElement.style.transition = 'transform 0.5s ease';
        this.carouselElement.nativeElement.style.transform = 'translateX(0)';
        this.carouselElement.nativeElement.scrollLeft -= firstSlide.offsetWidth;
        this.carouselElement.nativeElement.removeChild(lastSlide);
      }, 10); // Délai très court pour s'assurer que la transition a le temps de prendre effet
    }

    


  bannerResult!:any [];
  trendingMovieResult!:any[];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  ngOnInit(){
    this.banner()
    this.trendingMovie()
    this.actionMovie()
    this.adventureMovie()
    this.animationMovie()
    this.comedyMovie()
    this.documentaryMovie()
    this.randomBanner();
   
   
  }


  banner() {
    this.service.bannerApiData().pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des bannières:', error);
        return of({ results: [] });  // retourne un objet avec un tableau vide "results" en cas d'erreur
      })
    ).subscribe((result) => {
      this.bannerResult = result.results;
    });
  }
  
  randomNumber:any;
randomBanner(){
  if (this.bannerResult) {
    this.randomNumber = Math.floor(Math.random() * this.bannerResult.length);
    console.log(this.randomNumber);
  }
}

shortOverview(sentence: string): string {
  const index = sentence.indexOf('.');
  return index !== -1 ? sentence.slice(0, index + 1) : sentence;
}

  trendingMovie() {
    this.service.trendingMovieApiData().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching trending movies:', error.message);
        return of({ results: [] }); 
      })
    ).subscribe((result) => {
      this.trendingMovieResult = result.results;
    });
  }

  // trendingMovie(){
  //   this.service.trendingMovieApiData().subscribe((result) => {
  //     console.log(result);
  //     this.trendingMovieResult = result.results;
  //   })
  // }

 // Action Movie
actionMovie() {
  this.service.fetchActionMovies().pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération des films d\'action:', error);
      return of([]);  // retourne un tableau vide en cas d'erreur
    })
  ).subscribe((result) => {
    this.actionMovieResult = result.results;
  });
}

// Adventure Movie
adventureMovie() {
  this.service.fetchAdventureMovies().pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération des films d\'aventure:', error);
      return of([]);  // retourne un tableau vide en cas d'erreur
    })
  ).subscribe((result) => {
    this.adventureMovieResult = result.results;
  });
}

// Animation Movie
animationMovie() {
  this.service.fetchAnimationMovies().pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération des films d\'animation:', error);
      return of([]);  // retourne un tableau vide en cas d'erreur
    })
  ).subscribe((result) => {
    this.animationMovieResult = result.results;
  });
}

 // Comedy Movie
comedyMovie() {
  this.service.fetchComedyMovies().pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération des films comiques:', error);
      return of([]);  // retourne un tableau vide en cas d'erreur
    })
  ).subscribe((result) => {
    this.comedyMovieResult = result.results;
  });
}

// Documentary Movie
documentaryMovie() {
  this.service.fetchDocumentaryMovies().pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération des documentaires:', error);
      return of([]);  // retourne un tableau vide en cas d'erreur
    })
  ).subscribe((result) => {
    this.documentaryMovieResult = result.results;
  });
}


}
