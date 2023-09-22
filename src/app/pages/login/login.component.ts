import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = new User();
  constructor(){}

  ngOnInit(){

    
  }


  onLoggedin(){
    console.log(this.user);
  }



}
