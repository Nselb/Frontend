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
    private _mpService: TrabajadorService,
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
    this.getMovimientos(JSON.parse(localStorage.getItem('user') || "").compania);
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
  }
  getMovimientos(sucursal: number) {
    this._mpService.get(sucursal).subscribe({
      next: (data) => {
        this.dataSource.data = data
      },
      error: () => { }
    })
  }

  createMovimiento() {
    this._dialogService.openDialog(TrabajadorModalComponent).afterClosed().subscribe({
      next: (a) => {
        this.getMovimientos(a.cOMP_Codigo);
      }
    });
  }

  editPlanilla(trabajador: Trabajador) {
    this._dialogService.openDialog(TrabajadorModalComponent, undefined, undefined, trabajador).afterClosed().subscribe({
      next: (a) => {
        this.getMovimientos(a.cOMP_Codigo);
      }
    });
  }


  deleteTrabajador(trabajador: Trabajador) {
    this._dialogService.openDialog(DialogComponent, { title: 'Confirmar', msg: 'Está seguro que desea borrar la entrada?' }, [
      {
        text: 'Si', action: () => {
          this._mpService.delete(trabajador.comP_Codigo, trabajador.id_Trabajador).subscribe({
            next: () => {
              this.getMovimientos(trabajador.comP_Codigo);
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
}


