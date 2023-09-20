import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  ngOnInit(): void {
    console.log(window.pageYOffset)
    console.log(document.documentElement.scrollTop)
    console.log(document.body.scrollTop)
  }
  title = 'Netflix';

  isNavbarTransparent = true;
  NavColor:any;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.NavColor = offset > 0 ? 'rgb(20,20,20)' : 'transparent';
  }

}
