import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { texts: any, buttonConfig: { text: string, action: (...params: any[]) => void }[] }) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      contrasena: ['', Validators.required]
    })
  }

  login() {
    this.data.buttonConfig.pop()?.action(this.form.value.codigo, this.form.value.contrasena);
  }

}
