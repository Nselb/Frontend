import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentroCostos } from 'src/app/Interfaces/centro-costos';
import { Info } from 'src/app/Interfaces/info';
import { Trabajador } from 'src/app/Interfaces/trabajador';
import { CentroCostosService } from 'src/app/Services/centro-costos.service';
import { TrabajadorService } from 'src/app/Services/trabajador.service';
import { VariosService } from 'src/app/Services/varios.service';

@Component({
  selector: 'app-trabajador-modal',
  templateUrl: './trabajador-modal.component.html',
  styleUrls: ['./trabajador-modal.component.css']
})
export class TrabajadorModalComponent implements OnInit {

  form: FormGroup;
  tipoTrabajador: Info[] = [];
  genero: Info[] = [];
  centroCostos: CentroCostos[] = [];
  estadoTrabajador: Info[] = [];
  tipoContrato: Info[] = [];
  tipoCese: Info[] = [];
  estadoCivil: Info[] = [];
  esReingreso: Info[] = [];
  tipoCuenta: Info[] = [];
  constructor(
    private fb: FormBuilder,
    private _variosService: VariosService,
    private _trabajadorService: TrabajadorService,
    private _ccService: CentroCostosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      codigoCompania: ['', Validators.required],
      nombres: ['', Validators.required],
      tipoDeTrabajdor: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      identificacion: ['', Validators.required],
      entidadBancaria: ['', Validators.required],
      carnetIess: ['', Validators.required],
      direccion: ['', Validators.required],
      telefonoFijo: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      telefonoMovil: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      genero: ['', Validators.required],
      numeroCuentaBancaria: ['', Validators.required],
      ocupacion: ['', Validators.required],
      centroCostos: ['', Validators.required],
      nivelSalarial: ['', [Validators.pattern('^[123]$'), Validators.required]],
      estadoTrabajador: ['', Validators.required],
      tipoDeContrato: ['', Validators.required],
      tipoCese: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      tipoDeComision: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required],
      FechaDeIngreso: ['', Validators.required],
      FechaDeCese: [''],
      periodoDeVacaciones: ['', Validators.required],
      FechaDeReingreso: [''],
      esReingreso: ['', Validators.required],
      tipoDeCuenta: ['', Validators.required],
      fromaCalculo13ro: ['', Validators.required],
      fromaCalculo14to: ['', Validators.required],
      bonificacionComplemantaria: ['', Validators.required],
      bonificacionEspecial: ['', Validators.required],
      remuneracionMinima: ['', Validators.required],
      fondoReserva: ['', Validators.required],
      codigoCategoriaOcupacion: ['', Validators.required]
    })
    this._variosService.getEsReingreso().subscribe({
      next: data => {
        this.esReingreso = data;
      }
    })
    this._variosService.getEstadoCivil().subscribe({
      next: data => {
        this.estadoCivil = data;
      }
    })
    this._variosService.getEstadoTrabajador().subscribe({
      next: data => {
        this.estadoTrabajador = data;
      }
    })
    this._variosService.getGenero().subscribe({
      next: data => {
        this.genero = data;
      }
    })
    this._ccService.getAll().subscribe({
      next: data => {
        this.centroCostos = data;
      }
    })
    this._variosService.getTipoCese().subscribe({
      next: data => {
        this.tipoCese = data;
      }
    })
    this._variosService.getTipoContrato().subscribe({
      next: data => {
        this.tipoContrato = data;
      }
    })
    this._variosService.getTipoCuenta().subscribe({
      next: data => {
        this.tipoCuenta = data;
      }
    })
    this._variosService.getTipoTrabajador().subscribe({
      next: data => {
        this.tipoTrabajador = data;
      }
    })
  }

  ngOnInit(): void {
    this.form.get('tipoCese')?.patchValue('N');
    console.log(this.data.data);

    if (this.data.data) {
      this.form.patchValue({
        apellidoMaterno: this.data.data.apellido_Materno,
        apellidoPaterno: this.data.data.apellido_Paterno,
        numeroCuentaBancaria: this.data.data.nro_Cuenta_Bancaria,
        bonificacionComplemantaria: this.data.data.boniComplementaria,
        bonificacionEspecial: this.data.data.boniEspecial,
        carnetIess: this.data.data.carnetIESS,
        centroCostos: this.data.data.centro_Costos,
        codigoCategoriaOcupacion: this.data.data.codigo_Categoria_Ocupacion,
        codigoCompania: this.data.data.comP_Codigo,
        direccion: this.data.data.direccion,
        entidadBancaria: this.data.data.entidad_Bancaria,
        esReingreso: this.data.data.esReingreso,
        estadoCivil: this.data.data.estadoCivil,
        estadoTrabajador: this.data.data.estadoTrabajador,
        FechaDeCese: this.data.data.fechaCese,
        FechaDeIngreso: this.data.data.fechaIngreso,
        fechaDeNacimiento: this.data.data.fechaNacimiento,
        FechaDeReingreso: this.data.data.fechaReingreso,
        fondoReserva: this.data.data.fondo_Reserva,
        fromaCalculo13ro: this.data.data.formaCalculo13ro,
        fromaCalculo14to: this.data.data.formaCalculo14ro,
        genero: this.data.data.genero,
        identificacion: this.data.data.identificacion,
        mensaje: this.data.data.mensaje,
        nivelSalarial: this.data.data.nivel_Salarial,
        nombres: this.data.data.nombres,
        ocupacion: this.data.data.ocupacion,
        periodoDeVacaciones: this.data.data.periododeVacaciones,
        remuneracionMinima: this.data.data.remuneracion_Minima,
        telefonoFijo: this.data.data.telefono_Fijo,
        telefonoMovil: this.data.data.telefono_Movil,
        tipoCese: this.data.data.tipo_Cese,
        tipoDeContrato: this.data.data.tipo_Contrato,
        tipoDeCuenta: this.data.data.tipo_Cuenta,
        tipoDeTrabajdor: this.data.data.tipo_trabajador,
        tipoDeComision: this.data.data.tipodeComision
      }
      )
    }
  }
  createTrabajador() {
    const trabajador: Trabajador = {
      apellido_Materno: this.form.value.apellidoMaterno,
      apellido_Paterno: this.form.value.apellidoPaterno,
      boniComplementaria: this.form.value.bonificacionComplemantaria,
      boniEspecial: this.form.value.bonificacionEspecial,
      carnetIESS: this.form.value.carnetIess,
      centro_Costos: '' + this.form.value.centroCostos,
      codigo_Categoria_Ocupacion: this.form.value.codigoCategoriaOcupacion,
      comP_Codigo: this.form.value.codigoCompania,
      direccion: this.form.value.direccion,
      entidad_Bancaria: this.form.value.entidadBancaria,
      esReingreso: this.form.value.esReingreso,
      estadoCivil: this.form.value.estadoCivil,
      estadoTrabajador: this.form.value.estadoTrabajador,
      fecha_Ult_Actualizacion: '',
      fechaCese: this.form.value.FechaDeCese,
      fechaIngreso: this.form.value.FechaDeIngreso,
      fechaNacimiento: this.form.value.fechaDeNacimiento,
      fechaReingreso: this.form.value.FechaDeReingreso,
      fondo_Reserva: this.form.value.fondoReserva,
      formaCalculo13ro: this.form.value.fromaCalculo13ro,
      formaCalculo14ro: this.form.value.fromaCalculo14to,
      genero: this.form.value.genero,
      id_Trabajador: 0,
      identificacion: this.form.value.identificacion,
      mensaje: '',
      nivel_Salarial: this.form.value.nivelSalarial,
      nombres: this.form.value.nombres,
      nro_Cuenta_Bancaria: this.form.value.numeroCuentaBancaria,
      ocupacion: this.form.value.ocupacion,
      periododeVacaciones: this.form.value.periodoDeVacaciones,
      remuneracion_Minima: this.form.value.remuneracionMinima,
      telefono_Fijo: this.form.value.telefonoFijo,
      telefono_Movil: this.form.value.telefonoMovil,
      tipo_Cese: this.form.value.tipoCese,
      tipo_Contrato: this.form.value.tipoDeContrato,
      tipo_Cuenta: this.form.value.tipoDeCuenta,
      tipo_trabajador: this.form.value.tipoDeTrabajdor,
      tipodeComision: this.form.value.tipoDeComision
    }
    this._trabajadorService.insert(trabajador).subscribe({
      next: () => { },
      error: () => { }
    })
  }
  editTrabajador() {
    const trabajador: Trabajador = {
      apellido_Materno: this.form.value.apellidoMaterno,
      apellido_Paterno: this.form.value.apellidoPaterno,
      boniComplementaria: this.form.value.bonificacionComplemantaria,
      boniEspecial: this.form.value.bonificacionEspecial,
      carnetIESS: this.form.value.carnetIess,
      centro_Costos: '' + this.form.value.centroCostos,
      codigo_Categoria_Ocupacion: this.form.value.codigoCategoriaOcupacion,
      comP_Codigo: this.form.value.codigoCompania,
      direccion: this.form.value.direccion,
      entidad_Bancaria: this.form.value.entidadBancaria,
      esReingreso: this.form.value.esReingreso,
      estadoCivil: this.form.value.estadoCivil,
      estadoTrabajador: this.form.value.estadoTrabajador,
      fecha_Ult_Actualizacion: '',
      fechaCese: this.form.value.FechaDeCese,
      fechaIngreso: this.form.value.FechaDeIngreso,
      fechaNacimiento: this.form.value.fechaDeNacimiento,
      fechaReingreso: this.form.value.FechaDeReingreso,
      fondo_Reserva: this.form.value.fondoReserva,
      formaCalculo13ro: this.form.value.fromaCalculo13ro,
      formaCalculo14ro: this.form.value.fromaCalculo14to,
      genero: this.form.value.genero,
      id_Trabajador: this.data.data.id_Trabajador,
      identificacion: this.form.value.identificacion,
      mensaje: '',
      nivel_Salarial: this.form.value.nivelSalarial,
      nombres: this.form.value.nombres,
      nro_Cuenta_Bancaria: this.form.value.numeroCuentaBancaria,
      ocupacion: this.form.value.ocupacion,
      periododeVacaciones: this.form.value.periodoDeVacaciones,
      remuneracion_Minima: this.form.value.remuneracionMinima,
      telefono_Fijo: this.form.value.telefonoFijo,
      telefono_Movil: this.form.value.telefonoMovil,
      tipo_Cese: this.form.value.tipoCese,
      tipo_Contrato: this.form.value.tipoDeContrato,
      tipo_Cuenta: this.form.value.tipoDeCuenta,
      tipo_trabajador: this.form.value.tipoDeTrabajdor,
      tipodeComision: this.form.value.tipoDeComision
    }
    console.log(trabajador)
    this._trabajadorService.update(trabajador).subscribe({
      next: (a) => { console.log(a) },
      error: (e) => { }
    })
  }
}
