import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  isLogged: number;

  constructor(private _router: Router) {
    this.isLogged = 0;
    if (localStorage.getItem('user')) {
      this.isLogged = 1;
    }
  }

  navigate(uri: string) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => this._router.navigate([uri]));
  }

  logout() {
    localStorage.clear()
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => this._router.navigate(['/login']));
  }

}
