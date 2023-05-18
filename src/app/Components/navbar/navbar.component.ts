import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Interfaces/usuario';
import { NavbarService } from 'src/app/Services/navbar.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userData: Usuario;
  isLogged: number;

  constructor(private _router: Router, private navbarService: NavbarService, private _appComponent: AppComponent) {
    this.isLogged = localStorage.getItem('isLogged') === 'true' ? 1 : 0;
    this.userData = JSON.parse(localStorage.getItem('user') || '{}')
  }

  ngOnInit(): void {
    this.navbarService.reloadNavbar$.subscribe(() => {
      this.isLogged = localStorage.getItem('user') ? 1 : 0;
      this.userData = JSON.parse(localStorage.getItem('user') || '{}')
    })
  }

  navigate(uri: string) {
    this._router.navigateByUrl(uri);
  }

  logout() {
    localStorage.clear()
    this.navbarService.reloadNavbar();
    this._appComponent.isLogged = false;
    this._router.navigateByUrl('/login')
  }

}
