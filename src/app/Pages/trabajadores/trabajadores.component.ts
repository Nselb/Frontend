import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/Interfaces/trabajador';
import { DialogComponent } from 'src/app/Modals/dialog/dialog.component';
import { TrabajadorModalComponent } from 'src/app/Modals/trabajador-modal/trabajador-modal.component';
import { DialogService } from 'src/app/Services/dialog.service';
import { TrabajadorService } from 'src/app/Services/trabajador.service';
import { AppComponent } from 'src/app/app.component';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Identificacion', 'Nombres', 'Apellido Paterno', 'Apellido Materno', 'Telefono Movil', 'Acciones'];
  dataSource = new MatTableDataSource<Trabajador>();

  constructor(private _router: Router,
    private appComponent: AppComponent,
    private _tService: TrabajadorService,
    private _dialogService: DialogService) {
    localStorage.getItem('isLogged') !== 'true' || localStorage.getItem('isLoggedAutorizador') !== 'true' ? this._router.navigateByUrl('/login') : () => { };
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
    localStorage.getItem('isLoggedAutorizador') ? this.appComponent.autorizador = true : this.appComponent.autorizador = false;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTrabajadores(JSON.parse(localStorage.getItem('user') || "").compania);
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
  }
  getTrabajadores(sucursal: number) {
    this._tService.get(sucursal).subscribe({
      next: (data) => {
        this.dataSource.data = data
      },
      error: () => { }
    })
  }

  createTrabajador() {
    this._dialogService.openDialog(TrabajadorModalComponent).afterClosed().subscribe({
      next: (a) => {
        this.getTrabajadores(a);
      }
    });
  }

  editTrabajador(trabajador: Trabajador) {
    this._dialogService.openDialog(TrabajadorModalComponent, undefined, undefined, trabajador).afterClosed().subscribe({
      next: (a) => {
        this.getTrabajadores(a);
      }
    });
  }


  deleteTrabajador(trabajador: Trabajador) {
    this._dialogService.openDialog(DialogComponent, { title: 'Confirmar', msg: 'Está seguro que desea borrar la entrada?' }, [
      {
        text: 'Si', action: () => {
          this._tService.delete(trabajador.comP_Codigo, trabajador.id_Trabajador).subscribe({
            next: () => {
              this.getTrabajadores(trabajador.comP_Codigo);
            }
          })
        }
      },
      {
        text: 'No',
        action: () => { }
      }
    ])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToExcel() {
    const data: any[][] = [];

    const headersRow = ['Identificacion', 'Apellidos', 'Nombres', 'Genero', 'Direccion', 'Telefono Movil', 'Telefono Fijo', 'Acumula 13ro', 'Acumula 14to', 'Acumula Fondos Reserva', 'Entidad Bancaria', 'Tipos Cuenta', 'Numero De Cuenta', 'Fecha De Ingreso'];
    data.push(headersRow);

    this.dataSource.data.forEach((item) => {
      const rowData = [];
      rowData.push(item.identificacion);
      rowData.push(item.apellido_Paterno + ' ' + item.apellido_Materno);
      rowData.push(item.nombres);
      rowData.push(item.genero);
      rowData.push(item.direccion);
      rowData.push(item.telefono_Movil);
      rowData.push(item.telefono_Fijo);
      rowData.push(item.formaCalculo13ro);
      rowData.push(item.formaCalculo14ro);
      rowData.push(item.fondo_Reserva);
      rowData.push(item.entidad_Bancaria);
      rowData.push(item.tipo_Cuenta);
      rowData.push(item.nro_Cuenta_Bancaria);
      rowData.push(item.fechaIngreso);
      data.push(rowData);
    });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Tabla');
    XLSX.writeFile(wb, 'Trabajadores.xlsx');
  }

  exportPdf(data: any) {
    const doc = new jspdf.jsPDF();
    const jsonData = JSON.stringify(data);
    const formattedJsonData = jsonData.replace(/,/g, ',\n');
    doc.text(formattedJsonData, 10, 10);
    doc.save(`Trabajador ${data.identificacion}.pdf`);
  }

  estadisticasPdf() {
    const doc = new jspdf.jsPDF();
    const data = {
      edadPromedio: this.edadPromedio(),
      salarioPromedio: this.salarioPromedio(),
      generoPromedio: this.generoPromedio()
    }
    const jsonData = JSON.stringify(data);
    const formattedJsonData = jsonData.replace(/,/g, ',\n');
    doc.text(formattedJsonData, 10, 10);
    doc.save(`Estadisticas ${JSON.parse(localStorage.getItem('user') || '').nombreCompania}.pdf`);
  }

  edadPromedio(): string {
    const currentDate = new Date();
    let totalAge = 0;
    for (const t of this.dataSource.data) {
      const fechaNacimiento = new Date(t.fechaNacimiento)
      const ageDifference = currentDate.getTime() - fechaNacimiento.getTime();
      const ageDate = new Date(ageDifference);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      totalAge += age;
    }
    const averageAge = totalAge / this.dataSource.data.length;
    console.log(averageAge);

    return averageAge.toFixed(2);
  }
  salarioPromedio(): string {
    let total = 0;
    for (const t of this.dataSource.data) {
      total += t.remuneracion_Minima
    }
    return (total / this.dataSource.data.length).toFixed(2)
  }
  generoPromedio(): any {
    const generos = {
      porcentajeMasculino: '0',
      porcentajeFemenino: '0'
    }
    let totalH = 0
    let totalM = 0
    for (const t of this.dataSource.data) {
      if (t.genero === 'M') {
        totalH++;
      } else {
        totalM++;
      }
    }
    const total = totalH + totalM;
    generos.porcentajeFemenino = ((totalM / total) * 100).toFixed(2) + '%';
    generos.porcentajeMasculino = ((totalH / total) * 100).toFixed(2) + '%';
    return generos
  }
}


