import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CentroCostos } from 'src/app/Interfaces/centro-costos';
import { CentroCostosService } from 'src/app/Services/centro-costos.service';
import { MatDialog } from '@angular/material/dialog';
import { CentrosModalComponent } from 'src/app/Modals/centros-modal/centros-modal.component';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/Services/dialog.service';
import { DialogComponent } from 'src/app/Modals/dialog/dialog.component';


@Component({
  selector: 'app-centros-costo',
  templateUrl: './centros-costo.component.html',
  styleUrls: ['./centros-costo.component.css']
})
export class CentrosCostoComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Codigo', 'Nombre Centro De Costos', 'Acciones'];
  dataSource = new MatTableDataSource<CentroCostos>();

  constructor(private _ccService: CentroCostosService, public dialog: MatDialog, private appComponent: AppComponent, private _router: Router, private _dialogService: DialogService) {
    localStorage.getItem('isLogged') !== 'true' ? this._router.navigateByUrl('/login') : () => { };
    appComponent.autorizador = localStorage.getItem('isLoggedAutorizador') === 'true';
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getCentrosCosto();
    this.appComponent.isLogged = localStorage.getItem('isLogged') === 'true'
  }

  createCentro() {
    this._dialogService.openDialog(CentrosModalComponent).afterClosed().subscribe({
      next: () => {
        this.getCentrosCosto();
      }
    });
  }

  editCentro(centro: CentroCostos) {
    this._dialogService.openDialog(CentrosModalComponent, undefined, undefined, centro).afterClosed().subscribe({
      next: () => {
        this.getCentrosCosto();
      }
    });
  }

  deleteCentro(centro: CentroCostos) {
    this._dialogService.openDialog(DialogComponent, { title: 'Confirmar', msg: 'Está seguro que desea borrar la entrada?' }, [
      {
        text: 'Si', action: () => {
          this._ccService.delete(centro.codigo, centro.nombreCentroCostos).subscribe({
            next: () => {
              this.getCentrosCosto();
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

  getCentrosCosto() {
    this._ccService.getAll().subscribe({
      next: data => { this.dataSource.data = data },
      error: err => { }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
