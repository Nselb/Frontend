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
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Identificacion', 'Nombres', 'Apellido Paterno', 'Apellido Materno', 'Telefono Movil','Acciones'];
  dataSource = new MatTableDataSource<Trabajador>();


  constructor(private _router: Router, private appComponent: AppComponent, private _mpService: TrabajadorService, private _dialogService: DialogService) {
    localStorage.getItem('isLogged') !== 'true' || localStorage.getItem('isLoggedAutorizador') !== 'true' ? this._router.navigateByUrl('/login') : () => { };
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
    localStorage.getItem('isLoggedAutorizador') ? this.appComponent.autorizador = true : this.appComponent.autorizador = false;
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    this.getMovimientos(1);
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
  }
  getMovimientos(sucursal:number) {
    this._mpService.get(sucursal).subscribe({
      next: (data) => {
        this.dataSource.data = data
      },
      error: () => { }
    })
  } 

  createMovimiento() {
    this._dialogService.openDialog(TrabajadorModalComponent).afterClosed().subscribe({
      next: () => {
        this.getMovimientos(1);
      }
    });
  }

  editPlanilla(planilla: Trabajador) {
    this._dialogService.openDialog(TrabajadorModalComponent, undefined, undefined, planilla).afterClosed().subscribe({
      next: () => {
        this.getMovimientos(1);
      }
    });
  }


  deleteMovimiento(movimiento: Trabajador) {
    this._dialogService.openDialog(DialogComponent, { title: 'Confirmar', msg: 'Está seguro que desea borrar la entrada?' }, [
      {
        text: 'Si', action: () => {
          this._mpService.delete(movimiento.comP_Codigo, movimiento.id_Trabajador).subscribe({
            next: () => {
              console.log(movimiento);
              this.getMovimientos(movimiento.comP_Codigo);
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

  exportToExcel(): void {
    const element = document.getElementById('trabajadores'); 
    const worksheet = XLSX.utils.table_to_sheet(element);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'trabajadores.xlsx');
  }
}


