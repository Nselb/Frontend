import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CentroCostos } from 'src/app/Interfaces/centro-costos';
import { CentroCostosService } from 'src/app/Services/centro-costos.service';
import { MatDialog } from '@angular/material/dialog';
import { CentrosModalComponent } from 'src/app/Modals/centros-modal/centros-modal.component';
import { InfoComponent } from 'src/app/Modals/info/info.component';


@Component({
  selector: 'app-centros-costo',
  templateUrl: './centros-costo.component.html',
  styleUrls: ['./centros-costo.component.css']
})
export class CentrosCostoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Codigo', 'Nombre Centro De Costos', 'Acciones'];
  dataSource = new MatTableDataSource<CentroCostos>();

  constructor(private _ccService: CentroCostosService, public dialog: MatDialog) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getCentrosCosto();
  }

  createCentro() {
    this.dialog.open(CentrosModalComponent).afterClosed().subscribe({
      next: res => {
        location.reload();
      }
    });
  }

  editCentro(centro: CentroCostos) {
    this.dialog.open(CentrosModalComponent, {
      data: {
        titulo: 'Editar',
        btnText: 'Guardar',
        centro: centro
      }
    }).afterClosed().subscribe({
      next: res => {
        location.reload();
      }
    });
  }

  deleteCentro(centro: CentroCostos) {
    this._ccService.delete(centro.codigo).subscribe({
      next: res => {
        location.reload();
      }
    })
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
