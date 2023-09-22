import {Component, Inject, Input, OnInit} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {ActivatedRoute} from "@angular/router";
import {MovieApiService} from "../../services/movie-api.service";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit{

  constructor(private home:HomeComponent, private route:ActivatedRoute,private serviceAPI:MovieApiService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<MovieDetailComponent>) {
  }
 @Input() getMovieDetailResult: any;

  ngOnInit(): void {
   const movieId: number= +this.route.snapshot.params['id'];         // va chercher l'Id directement dans l'url
   //this.= this.serviceAPI.getMovieDetails(movieId);
    this.resultDetailMovie(movieId);

  }

  resultDetailMovie(id: any) {
    console.log('Received ID:', id);
    this.serviceAPI.getMovieDetails(id).subscribe((result) => {
      if (result) {
        this.getMovieDetailResult = result;
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
