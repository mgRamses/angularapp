import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent, ConfirmDialog, EditDialog, AddUserDialog } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuariosService } from './services/usuarios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './components/add-user/add-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material'  

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialog,
    HomeComponent,
    EditDialog,
    AddUserDialog,
    MatConfirmDialogComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    UsuariosService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }

  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialog, HomeComponent, EditDialog, AddUserDialog, MatConfirmDialogComponent, AddUserComponent]
})
export class AppModule { }
