import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentroCostosService } from 'src/app/Services/centro-costos.service';

@Component({
  selector: 'app-planilla-modal-component',
  templateUrl: './planilla-modal.component.html',
  styleUrls: ['./planilla-modal.component.css']
})
export class PlanillaModalComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _centrosService: CentroCostosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required]
    })
  }

  createCentro() {

  }

  editCentro() {

  }

  ngOnInit(): void {
    if (this.data.data) {
      this.form.patchValue({
        codigo: this.data.data.codigo,
        descripcion: this.data.data.nombreCentroCostos
      }
      )
    }
  }
}
