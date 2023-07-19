import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Emisor } from 'src/app/Interfaces/emisor';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { EmisorService } from 'src/app/Services/emisor.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NavbarService } from 'src/app/Services/navbar.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { DialogComponent } from 'src/app/Modals/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  listaEmisores: Emisor[] = [];

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _emisorService: EmisorService,
    private _router: Router,
    private _dialogService: DialogService,
    private _appComponent: AppComponent,
    private _navbarService: NavbarService
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      contrasena: ['', Validators.required],
      codigoEmisor: ['', Validators.required]
    })

    this._emisorService.getAll().subscribe(
      {
        next: (data) => {
          this.listaEmisores = data;
        }, error: (e) => { }
      }
    )
    let logged = localStorage.getItem('isLogged');
    (logged === 'true' && logged) ? this._router.navigateByUrl('/centros') : () => { };

  }

  login() {
    this._usuarioService.get(this.form.value.codigo, this.form.value.contrasena).subscribe(val => {
      if (val.emisor === this.form.value.codigoEmisor && val.observacion === 'INGRESO EXITOSO') {
        localStorage.setItem('user', JSON.stringify(val));
        localStorage.setItem('isLogged', 'true');
        this._navbarService.reloadNavbar();
        this._appComponent.isLogged = true;
        this._router.navigateByUrl('/centros')
      } else if(val.emisor !== this.form.value.codigoEmisor){
        this._router.navigateByUrl('/login')
        this._dialogService.openDialog(DialogComponent, { title: 'Error', msg: 'Emisor incorrecto!' }, [{ text: 'Cerrar', action: () => { } }])
      }
      if (val.observacion !== 'INGRESO EXITOSO') {
        this._router.navigateByUrl('/login')
        this._dialogService.openDialog(DialogComponent, { title: 'Error', msg: 'Contraseña incorrecta!' }, [{ text: 'Cerrar', action: () => { } }])
      }
    })
  }

  ngOnInit(): void {

  }
}
