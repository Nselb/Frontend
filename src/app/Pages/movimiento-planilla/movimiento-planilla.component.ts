import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MovimientoPlanilla } from 'src/app/Interfaces/movimiento-planilla';
import { DialogComponent } from 'src/app/Modals/dialog/dialog.component';
import { PlanillaModalComponent } from 'src/app/Modals/planilla-modal/planilla-modal.component';
import { DialogService } from 'src/app/Services/dialog.service';
import { MovimientoPlanillaService } from 'src/app/Services/movimiento-planilla.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-movimiento-planilla',
  templateUrl: './movimiento-planilla.component.html',
  styleUrls: ['./movimiento-planilla.component.css']
})
export class MovimientoPlanillaComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Concepto', 'Tipo Operación', 'Movimiento Excepción 1', 'Movimiento Excepción 2', 'Movimiento Excepción 3', 'Aplica Impuesto Renta','Acciones'];
  dataSource = new MatTableDataSource<MovimientoPlanilla>();


  constructor(private _router: Router, private appComponent: AppComponent, private _mpService: MovimientoPlanillaService, private _dialogService: DialogService) {
    localStorage.getItem('isLogged') !== 'true' || localStorage.getItem('isLoggedAutorizador') !== 'true' ? this._router.navigateByUrl('/login') : () => { };
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
    localStorage.getItem('isLoggedAutorizador') ? this.appComponent.autorizador = true : this.appComponent.autorizador = false;
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    this.getMovimientos();
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
  }

  getMovimientos() {
    this._mpService.getAll().subscribe({
      next: data => {
        this.dataSource.data = data
      },
      error: () => { }
    })
  }

  createMovimiento() {
    this._dialogService.openDialog(PlanillaModalComponent).afterClosed().subscribe({
      next: () => {
        this.getMovimientos();
      }
    });
  }

  editPlanilla(planilla: MovimientoPlanilla) {
    this._dialogService.openDialog(PlanillaModalComponent, undefined, undefined, planilla).afterClosed().subscribe({
      next: () => {
        this.getMovimientos();
      }
    });
  }


  deleteMovimiento(movimiento: MovimientoPlanilla) {
    this._dialogService.openDialog(DialogComponent, { title: 'Confirmar', msg: 'Está seguro que desea borrar la entrada?' }, [
      {
        text: 'Si', action: () => {
          this._mpService.delete(movimiento.codigoConcepto, movimiento.concepto).subscribe({
            next: () => {
              this.getMovimientos();
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
