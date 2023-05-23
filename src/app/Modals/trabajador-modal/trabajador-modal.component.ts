import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Info } from 'src/app/Interfaces/info';
import { Trabajador } from 'src/app/Interfaces/trabajador';
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
      telefonoFijo: ['', Validators.required],
      telefonoMovil: ['', Validators.required],
      genero: ['', Validators.required],
      numeroCuentaBancaria: ['', Validators.required],
      ocupacion: ['', Validators.required],
      centroCostos: ['', Validators.required],
      nivelSalarial: ['', Validators.required],
      estadoTrabajador: ['', Validators.required],
      tipoDeContrato: ['', Validators.required],
      tipoCese: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      tipoDeComision: ['', Validators.required],
      fechaDeNacimiento: ['', Validators.required],
      FechaDeIngreso: ['', Validators.required],
      FechaDeCese: ['', Validators.required],
      periodoDeVacaciones: ['', Validators.required],
      FechaDeReingreso: ['', Validators.required],
      esReingreso: ['', Validators.required],
      bancoCuentaCorriente: ['', Validators.required],
      tipoDeCuenta: ['', Validators.required],
      fromaCalculo13ro: ['', Validators.required],
      fromaCalculo14to: ['', Validators.required],
      bonificacionComplemantaria: ['', Validators.required],
      bonificacionEspecial: ['', Validators.required],
      remuneracionMinima: ['', Validators.required],
      cuotaCuentaCorriente: ['', Validators.required],
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
    if (this.data.data) {
      console.log(this.data.data);
      this.form.patchValue({
        apellidoMaterno: this.data.data.apellidoMaterno,
        apellidoPaterno: this.data.data.apellidoPaterno,
        bancoCuentaCorriente: this.data.data.bancoCuentaCorriente,
        bonificacionComplementaria: this.data.data.bonificacionComplementaria,
        bonificacionEspecial: this.data.data.bonificacionEspecial,
        carnetIess: this.data.data.carnetIess,
        centroCostos: this.data.data.centroCostos,
        codigoCategoriaOcupacion: this.data.data.codigoCategoriaOcupacion,
        codigoCompania: this.data.data.codigoCompania,
        cuotaCuentaCorriente: this.data.data.cuotaCuentaCOrriente,
        direccion: this.data.data.direccion,
        entidadBancaria: this.data.data.entidadBancaria,
        esReingreso: this.data.data.esReingreso,
        estadoCivil: this.data.data.estadoCivil,
        estadoTrabajador: this.data.data.estadoTrabajador,
        FechaDeCese: this.data.data.FechaDeCese,
        FechaDeIngreso: this.data.data.fechaIngreso,
        FechaDeNacimiento: this.data.data.fechaDeNacimiento,
        FechaDeReingreso: this.data.data.FechaDeReingreso,
        fondoReserva: this.data.data.fondoReserva,
        formaCalculo13ro: this.data.data.formaCalculo13ro,
        formaCalculo14to: this.data.data.fromaCalculo14to,
        genero: this.data.data.genero,
        identificacion: this.data.data.identificacion,
        mensaje: this.data.data.mensaje,
        nivelSalarial: this.data.data.nivelSalarial,
        nombres: this.data.data.nombres,
        numeroCuentaBancaria: this.data.data.numeroCuentaBancaria,
        ocupacion: this.data.data.ocupacion,
        periododeVacaciones: this.data.data.periodoDeVacaciones,
        remuneracionMinima: this.data.data.remuneracionMinima,
        telefonoFijo: this.data.data.telefonoFijo,
        telefonoMovil: this.data.data.telefonoMovil,
        tipoCese: this.data.data.tipoCese,
        tipoContrato: this.data.data.tipoContrato,
        tipoCuenta: this.data.data.tipoCuenta,
        tipotrabajador: this.data.data.tipoTrabajador,
        tipodeComision: this.data.data.tipodeComision
      }
      )
    }
  }
  createTrabajador() {
    const trabajador: Trabajador = {
      apellido_Materno: this.form.value.apellidoMaterno,
      apellido_Paterno: this.form.value.apellidoPaterno,
      año_Ult_Rsva_Indemni: 0,
      bancoCTA_CTE: this.form.value.bancoCuentaCorriente,
      boniComplementaria: this.form.value.bonificacionComplementaria,
      boniEspecial: this.form.value.bonificacionEspecial,
      carnetIESS: this.form.value.carnetIess,
      centro_Costos: this.form.value.centroCostos,
      codigo_Categoria_Ocupacion: this.form.value.codigoCategoriaOcupacion,
      comP_Codigo: this.form.value.codigoCompania,
      cuotaCuentaCorriente: this.form.value.cuotaCuentaCOrriente,
      direccion: this.form.value.direccion,
      entidad_Bancaria: this.form.value.entidadBancaria,
      esReingreso: this.form.value.esReingreso,
      estadoCivil: this.form.value.estadoCivil,
      estadoTrabajador: this.form.value.estadoTrabajador,
      fecha_Ult_Actualizacion: new Date(),
      fechaCese: this.form.value.FechaDeCese,
      fechaIngreso: new Date(),
      fechaNacimiento: this.form.value.fechaDeNacimiento,
      fechaReingreso: this.form.value.FechaDeReingreso,
      fondo_Reserva: this.form.value.fondoReserva,
      formaCalculo13ro: this.form.value.formaCalculo13ro,
      formaCalculo14ro: this.form.value.fromaCalculo14to,
      genero: this.form.value.genero,
      id_Trabajador: 0,
      identificacion: this.form.value.identificacion,
      mensaje: '',
      mes_Ult_Rsva_Indemni: 0,
      nivel_Salarial: this.form.value.nivelSalarial,
      nombres: this.form.value.nombres,
      nro_Cuenta_Bancaria: this.form.value.numeroCuentaBancaria,
      ocupacion: this.form.value.ocupacion,
      periododeVacaciones: this.form.value.periodoDeVacaciones,
      remuneracion_Minima: this.form.value.remuneracionMinima,
      rsV_Indem_Acumul: 0,
      telefono_Fijo: this.form.value.telefonoFijo,
      telefono_Movil: this.form.value.telefonoMovil,
      tipo_Cese: this.form.value.tipoCese,
      tipo_Contrato: this.form.value.tipoContrato,
      tipo_Cuenta: this.form.value.tipoCuenta,
      tipo_trabajador: this.form.value.tipoTrabajador,
      tipodeComision: this.form.value.tipodeComision
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
      año_Ult_Rsva_Indemni: 0,
      bancoCTA_CTE: this.form.value.bancoCuentaCorriente,
      boniComplementaria: this.form.value.bonificacionComplementaria,
      boniEspecial: this.form.value.bonificacionEspecial,
      carnetIESS: this.form.value.carnetIess,
      centro_Costos: this.form.value.centroCostos,
      codigo_Categoria_Ocupacion: this.form.value.codigoCategoriaOcupacion,
      comP_Codigo: this.form.value.codigoCompania,
      cuotaCuentaCorriente: this.form.value.cuotaCuentaCOrriente,
      direccion: this.form.value.direccion,
      entidad_Bancaria: this.form.value.entidadBancaria,
      esReingreso: this.form.value.esReingreso,
      estadoCivil: this.form.value.estadoCivil,
      estadoTrabajador: this.form.value.estadoTrabajador,
      fecha_Ult_Actualizacion: new Date(),
      fechaCese: this.form.value.FechaDeCese,
      fechaIngreso: new Date(),
      fechaNacimiento: this.form.value.fechaDeNacimiento,
      fechaReingreso: this.form.value.FechaDeReingreso,
      fondo_Reserva: this.form.value.fondoReserva,
      formaCalculo13ro: this.form.value.formaCalculo13ro,
      formaCalculo14ro: this.form.value.fromaCalculo14to,
      genero: this.form.value.genero,
      id_Trabajador: 0,
      identificacion: this.form.value.identificacion,
      mensaje: '',
      mes_Ult_Rsva_Indemni: 0,
      nivel_Salarial: this.form.value.nivelSalarial,
      nombres: this.form.value.nombres,
      nro_Cuenta_Bancaria: this.form.value.numeroCuentaBancaria,
      ocupacion: this.form.value.ocupacion,
      periododeVacaciones: this.form.value.periodoDeVacaciones,
      remuneracion_Minima: this.form.value.remuneracionMinima,
      rsV_Indem_Acumul: 0,
      telefono_Fijo: this.form.value.telefonoFijo,
      telefono_Movil: this.form.value.telefonoMovil,
      tipo_Cese: this.form.value.tipoCese,
      tipo_Contrato: this.form.value.tipoContrato,
      tipo_Cuenta: this.form.value.tipoCuenta,
      tipo_trabajador: this.form.value.tipoTrabajador,
      tipodeComision: this.form.value.tipodeComision
    }
    this._trabajadorService.update(trabajador).subscribe({
      next: () => { },
      error: () => { }
    })
  }
}
