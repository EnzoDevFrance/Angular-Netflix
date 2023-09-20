import {Component, OnInit} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {ActivatedRoute} from "@angular/router";
import {MovieApiService} from "../../services/movie-api.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit{

  constructor(private home:HomeComponent, private route:ActivatedRoute,private serviceAPI:MovieApiService) {
  }
  getMovieDetailResult!:any;

  ngOnInit(): void {
   const movieId: number= +this.route.snapshot.params['id'];         // va chercher l'Id directement dans l'url
   //this.= this.serviceAPI.getMovieDetails(movieId);
    this.resultDetailMovie(movieId);

  }

  resultDetailMovie(id:any){
    this.serviceAPI.getMovieDetails(id).subscribe((result) => {
      console.log(result)
      this.getMovieDetailResult = (result);
    })
  }

}
