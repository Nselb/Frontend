import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { CentrosCostoComponent } from './Pages/centros-costo/centros-costo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'centros', component: CentrosCostoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
