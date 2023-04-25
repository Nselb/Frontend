import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Emisor } from 'src/app/Interfaces/emisor';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { EmisorService } from 'src/app/Services/emisor.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from 'src/app/Modals/info/info.component';

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
    public dialog: MatDialog
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
  }

  login() {
    this._usuarioService.get(this.form.value.codigo, this.form.value.contrasena).subscribe(val => {
      if (val.emisor === this.form.value.codigoEmisor) {
        localStorage.setItem('user', JSON.stringify(val));
        this._router.navigateByUrl('/')
      } else {
        this._router.navigateByUrl('/login')
        this.openDialog('Error', 'Emisor incorrecto!')
      }
      if (val.observacion !== 'INGRESO EXITOSO') {
        this._router.navigateByUrl('/login')
        this.openDialog('Error', 'Contraseña incorrecta!')
      }
    })
  }

  openDialog(title: string, msg: string) {
    this.dialog.open(InfoComponent, {
      data: {
        title: title,
        msg: msg
      }
    });
  }

  ngOnInit(): void {

  }
}
