import { Component } from '@angular/core';
import { DialogService } from './Services/dialog.service';
import { LoginModalComponent } from './Modals/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { AutorizadorService } from './Services/autorizador.service';
import { DialogComponent } from './Modals/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = false;
  autorizador = false;

  constructor(private _dialog: DialogService, private _router: Router, private _autorizadorService: AutorizadorService) {
    this.autorizador = localStorage.getItem('isLoggedAutorizador') ? true : false;
  }

  autorizadorLoginDialog() {
    this._dialog.openDialog(LoginModalComponent, { title: 'Iniciar Sesión Como Autorizador' }, [{ text: '', action: (user: number, password: string) => { this.autorizadorLogin(user, password) } }])
  }

  autorizadorLogin(user: number, password: string) {
    this._autorizadorService.get(user, password).subscribe(val => {
      if (val.observacion === 'INGRESO EXITOSO') {
        this.autorizador = true;
        localStorage.setItem('isLoggedAutorizador', 'true');
      } else {
        this._dialog.openDialog(DialogComponent, { title: 'Error!', msg: val.observacion }, [{ text: 'Cerrar', action: () => { } }])
      }
    })
  }

  autorizadorLogout() {
    this.autorizador = false;
    localStorage.removeItem('isLoggedAutorizador');
    this.navigate('/centros')
  }

  navigate(uri: string) {
    this._router.navigateByUrl(uri);
  }

}
