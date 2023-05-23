import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Info } from 'src/app/Interfaces/info';

@Component({
  selector: 'app-trabajador-modal',
  templateUrl: './trabajador-modal.component.html',
  styleUrls: ['./trabajador-modal.component.css']
})
export class TrabajadorModalComponent implements OnInit {

  form: FormGroup;
  tipoTrabajador: Info[] = [];
  genero: Info[] = [];
  estadoTrabajador: Info[] = [];
  tipoContrato: Info[] = [];
  tipoCese: Info[] = [];
  estadoCivil: Info[] = [];
  esReingreso: Info[] = [];
  tipoCuenta: Info[] = [];
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      concepto: ['', Validators.required],
      prioridad: ['', Validators.required],
      cuenta1: ['', Validators.required],
      cuenta2: ['', Validators.required],
      cuenta3: ['', Validators.required],
      cuenta4: ['', Validators.required],
      movExcepcion1: ['', Validators.required],
      movExcepcion2: ['', Validators.required],
      movExcepcion3: ['', Validators.required],
      aplicaIess: ['', Validators.required],
      aplicaIR: ['', Validators.required],
      tipoOperacion: ['', Validators.required],
      empAfectaIess: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    if (this.data.data) {
      console.log(this.data.data);
      this.form.patchValue({
        concepto: this.data.data.concepto,
        prioridad: this.data.data.prioridad,
        cuenta1: this.data.data.cuenta1,
        cuenta2: this.data.data.cuenta2,
        cuenta3: this.data.data.cuenta3,
        cuenta4: this.data.data.cuenta4,
        movExcepcion1: this.data.data.movimientoExcepcion1,
        movExcepcion2: this.data.data.movimientoExcepcion2,
        movExcepcion3: this.data.data.movimientoExcepcion3,
        aplicaIess: this.data.data.aplica_iess,
        aplicaIR: this.data.data.aplica_imp_renta,
        tipoOperacion: this.data.data.tipoOperacion,
        empAfectaIess: this.data.data.empresa_Afecta_Iess,
      }
      )
    }
  }
}
