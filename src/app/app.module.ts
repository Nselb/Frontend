import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './Pages/login/login.component';
import { DialogComponent } from './Modals/dialog/dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CentrosCostoComponent } from './Pages/centros-costo/centros-costo.component';
import { CentrosModalComponent } from './Modals/centros-modal/centros-modal.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginModalComponent } from './Modals/login-modal/login-modal.component';
import { MovimientoPlanillaComponent } from './Pages/movimiento-planilla/movimiento-planilla.component';
import { PlanillaModalComponent } from './Modals/planilla-modal/planilla-modal.component';
import { TrabajadoresComponent } from './Pages/trabajadores/trabajadores.component';
import { TrabajadorModalComponent } from './Modals/trabajador-modal/trabajador-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogComponent,
    CentrosCostoComponent,
    CentrosModalComponent,
    NavbarComponent,
    LoginModalComponent,
    MovimientoPlanillaComponent,
    PlanillaModalComponent,
    TrabajadoresComponent,
    TrabajadorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
