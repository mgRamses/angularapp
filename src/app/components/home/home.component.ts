import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isAdmin;
  public usuarios: any = [];
  public usuarioActual: string = '';
  public data;
  displayedColumns: string[] = ['name', 'email', 'github', 'options'];
  public dsData: any;
  public dataSource: any;

  constructor(private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.usuarioActual = localStorage.getItem('usuarioActual');

    if (localStorage.getItem('user') === 'admin') {
      console.log(localStorage.getItem('user'));
      this.isAdmin = true;
      this.usuariosService.getAllUsers().subscribe(data => {
        this.usuarios = data['data'];
        this.dataSource = new MatTableDataSource(this.usuarios);
        console.log(this.dataSource.data);
      })
    } else {
      this.isAdmin = false;
    }

  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog('¿Desea eliminar este usuario?')
      .afterClosed().subscribe(res => {
        if (res === true) {
          this.usuariosService.deleteUser(id);
          this.dsData = this.dataSource.data;
          const itemIndex = this.dsData.findIndex(obj => obj['id'] === id);
          this.dataSource.data.splice(itemIndex, 1);
          this.dataSource._updateChangeSubscription();


        }
      })
  }

  deleteUser(id: number) {
    console.log('vamnos a borrar');
    this.usuariosService.deleteUser(id);
  }

  onEdit() {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  onAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '650px', height: '650px',
      panelClass: "formFieldWidth480"
    });

    /* dialogRef.afterClosed().subscribe(res => {
       if (res === true) {
         this.usuariosService.addUser();
       }
     }) */
  }

  logout() {
    localStorage.removeItem('usuarioActual');
    this.authService.logout()
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/login']);
        }
      })
  }
}

// Componentes 

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html'
})
export class ConfirmDialog { }

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-user-dialog.html'
})
export class EditDialog { }

@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html'
})
export class AddUserDialog { }
