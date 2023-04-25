import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroCostos } from 'src/app/Interfaces/centro-costos';
import { CentroCostosService } from 'src/app/Services/centro-costos.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-centros-modal',
  templateUrl: './centros-modal.component.html',
  styleUrls: ['./centros-modal.component.css']
})
export class CentrosModalComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _centrosService: CentroCostosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  createCentro() {
    const centro: CentroCostos = {
      codigo: this.form.value.codigo,
      nombreCentroCostos: this.form.value.descripcion
    }
    this._centrosService.insert(centro).subscribe({
      next: (data) => {
        location.reload()
      },
      error: (e) => { }
    })
  }
  editCentro() {
    const centro: CentroCostos = {
      codigo: this.form.value.codigo,
      nombreCentroCostos: this.form.value.descripcion
    }
    this._centrosService.update(centro).subscribe({
      next: data => { },
      error: err => { }
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        codigo: this.data.centro.codigo,
        descripcion: this.data.centro.nombreCentroCostos
      }
      )
    }
  }
}
