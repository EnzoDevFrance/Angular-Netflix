import {Component, Injectable, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit,HostListener} from '@angular/core';
import { MovieApiService } from "../../services/movie-api.service";
import {Router} from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import Swiper from 'swiper';
import { ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit{


  constructor(private service: MovieApiService,private router:Router,private renderer: Renderer2, private elementRef: ElementRef,public dialog: MatDialog){

  }

  bannerResult!:any [];
  trendingMovieResult!:any[];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];

  ngOnInit(){
    this.banner();
    this.trendingMovie();
    this.actionMovie();
    this.adventureMovie();
    this.animationMovie();
    this.comedyMovie();
    this.documentaryMovie();
    this.randomBanner();
  }

  trendingMovie() {
    this.service.trendingMovieApiData().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching trending movies:', error.message);
        return of({ results: [] }); 
      })
    ).subscribe((result) => {
      this.trendingMovieResult = result.results;
      console.log(this.trendingMovieResult);
    });
  }


  detailsMovieResult!:any [];
  private dialogRef: MatDialogRef<MovieDetailComponent> | null = null;
  openMovieDetail(movieId: number) {
    // Si une boîte de dialogue est déjà ouverte, la fermer
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.service.getMovieDetails(movieId).subscribe((result) => {
      this.detailsMovieResult = result;
      console.log('Le dialogue a été ouvert');

      // Ouvrez la nouvelle boîte de dialogue et conservez la référence
      this.dialogRef = this.dialog.open(MovieDetailComponent, {
        data: { movie: this.detailsMovieResult }
      });

      // Réinitialisez la référence lorsque la boîte de dialogue est fermée
      this.dialogRef.afterClosed().subscribe(() => {
        console.log('Le dialogue a été fermé');
        this.dialogRef = null;
      });
    });
  }

  changeCurrentMovie(id: number) {
    this.service.changeMovieId(id);
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



