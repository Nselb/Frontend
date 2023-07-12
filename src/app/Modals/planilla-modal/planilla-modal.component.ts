import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Afecta } from 'src/app/Interfaces/afecta';
import { MovimientoExcepcion } from 'src/app/Interfaces/movimiento-excepcion';
import { MovimientoPlanilla } from 'src/app/Interfaces/movimiento-planilla';
import { TipoOperacion } from 'src/app/Interfaces/tipo-operacion';
import { MovimientoPlanillaService } from 'src/app/Services/movimiento-planilla.service';
import { VariosService } from 'src/app/Services/varios.service';


@Component({
  selector: 'app-planilla-modal-component',
  templateUrl: './planilla-modal.component.html',
  styleUrls: ['./planilla-modal.component.css']
})
export class PlanillaModalComponent implements OnInit {

  form: FormGroup;
  tipoOperacion: TipoOperacion[] = [];
  movExcepcion1: MovimientoExcepcion[] = [];
  movExcepcion2: MovimientoExcepcion[] = [];
  movExcepcion3: MovimientoExcepcion[] = [];
  afectaIess: Afecta[] = [];
  afectaImpuestoRenta: Afecta[] = [];

  constructor(
    private fb: FormBuilder,
    private _planillaService: MovimientoPlanillaService,
    private _variosService: VariosService,
    private cdr: ChangeDetectorRef,
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
    this.populateSelect();
  }

  ngOnInit(): void {

  }

  populateSelect() {
    this._variosService.getTipoOperacion().subscribe(
      {
        next: (data) => {
          this.tipoOperacion = data;
        }
      }
    )
    this._variosService.getMov1y2().subscribe(
      {
        next: (data) => {
          this.movExcepcion1 = data;
        }
      }
    )
    this._variosService.getMov1y2().subscribe(
      {
        next: (data) => {
          this.movExcepcion2 = data;
        }
      }
    )
    this._variosService.getMov3().subscribe(
      {
        next: (data) => {
          this.movExcepcion3 = data;
        }
      }
    )
    this._variosService.getAfectaIess().subscribe(
      {
        next: (data) => {
          this.afectaIess = data;
        }
      }
    )
    this._variosService.getAfectaImpuestoRenta().subscribe(
      {
        next: (data) => {
          this.afectaImpuestoRenta = data;
        }
      }
    )
    this.populateForm();
  }

  createPlanilla() {
    const planilla: MovimientoPlanilla = {
      codigoConcepto: 0,
      aplica_iess: this.form.value.aplicaIess,
      aplica_imp_renta: this.form.value.aplicaIR,
      concepto: this.form.value.concepto,
      cuenta1: this.form.value.cuenta1,
      cuenta2: this.form.value.cuenta2,
      cuenta3: this.form.value.cuenta3,
      cuenta4: this.form.value.cuenta4,
      empresa_Afecta_Iess: this.form.value.empAfectaIess,
      mensaje: '',
      movimientoExcepcion1: this.form.value.movExcepcion1,
      movimientoExcepcion2: this.form.value.movExcepcion2,
      movimientoExcepcion3: this.form.value.movExcepcion3,
      prioridad: this.form.value.prioridad,
      tipoOperacion: this.form.value.tipoOperacion
    }
    this._planillaService.insert(planilla).subscribe({
      next: () => { },
      error: () => { }
    })
  }

  editPlanilla() {
    let codigo = 0;
    this._planillaService.get(this.form.value.concepto).subscribe({
      next: (data) => {
        codigo = data[0].codigoConcepto;
        const planilla: MovimientoPlanilla = {
          codigoConcepto: codigo,
          aplica_iess: this.form.value.aplicaIess,
          aplica_imp_renta: this.form.value.aplicaIR,
          concepto: this.form.value.concepto,
          cuenta1: this.form.value.cuenta1,
          cuenta2: this.form.value.cuenta2,
          cuenta3: this.form.value.cuenta3,
          cuenta4: this.form.value.cuenta4,
          empresa_Afecta_Iess: this.form.value.empAfectaIess,
          mensaje: '',
          movimientoExcepcion1: this.form.value.movExcepcion1,
          movimientoExcepcion2: this.form.value.movExcepcion2,
          movimientoExcepcion3: this.form.value.movExcepcion3,
          prioridad: this.form.value.prioridad,
          tipoOperacion: this.form.value.tipoOperacion
        }
        this._planillaService.update(planilla).subscribe({
          next: () => { },
          error: () => { }
        })
      }
    })
  }

  populateForm(): void {
    if (this.data.data) {
      console.log(this.data.data);
      this.form.patchValue({
        concepto: this.data.data.concepto,
        prioridad: this.data.data.prioridad,
        cuenta1: this.data.data.cuenta1,
        cuenta2: this.data.data.cuenta2,
        cuenta3: this.data.data.cuenta3,
        cuenta4: this.data.data.cuenta4,
        movExcepcion1: this._variosService.getMov1y2ById(this.data.data.movimientoExcepcion1),
        movExcepcion2: this._variosService.getMov1y2ById(this.data.data.movimientoExcepcion2),
        movExcepcion3: this._variosService.getMov3ById(this.data.data.movimientoExcepcion3),
        aplicaIess: this._variosService.getAfectaById(this.data.data.aplica_iess),
        aplicaIR: this._variosService.getAfectaById(this.data.data.aplica_imp_renta),
        tipoOperacion: this._variosService.getOperacionById(this.data.data.tipoOperacion),
        empAfectaIess: this._variosService.getAfectaById(this.data.data.empresa_Afecta_Iess),
      }
      )
      this.cdr.detectChanges();
    }
  }
}
