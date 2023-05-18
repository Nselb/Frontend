import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { CentrosCostoComponent } from './Pages/centros-costo/centros-costo.component';
import { MovimientoPlanillaComponent } from './Pages/movimiento-planilla/movimiento-planilla.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'centros', component: CentrosCostoComponent },
  { path: 'movimientos', component: MovimientoPlanillaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
