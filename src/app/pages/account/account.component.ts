import { Component } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(private userService: UserApiService){}

  EmailResult!:any [];
  FirstnameResult!:any [];
  LastnameResult!:any [];
  AgeResult!:any [];
  PasswordResult!:any [];

  UserResult!: any [];


  ngOnInit(){
    this.user()
    this.getUser()

  }

    user(){
      this.userService.getUser().subscribe((result) => {
        console.log(result);
        this.EmailResult = result.emailUser;
        this.FirstnameResult = result.prenomUser;
        this.LastnameResult = result.nomUser;
        this.AgeResult = result.ageUser;
        console.log(result.session.utilisateur)
        this.PasswordResult = result.idUser;
      })
    }
      getUser(){
        this.userService.getUser().subscribe((result) => {
          console.log(result);
          this.UserResult = [result];

        })
    }
  
}
