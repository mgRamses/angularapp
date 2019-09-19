import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { EdiitUserComponent } from '../ediit-user/ediit-user.component';

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
  public newUser: string[];

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
    this.usuariosService.deleteUser(id)
      .subscribe(res => {
        console.log('nuevo');
      })
  }

  onEdit(id: number, name: string, email: string, github: string) {
    const dialogRef = this.dialog.open(EdiitUserComponent, {
      width: '80%',
      data: {
        id: id,
        name: name,
        email: email,
        github: github
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      this.dsData = this.dataSource.data;
      const itemIndex = this.dsData.findIndex(obj => obj['id'] === id);
      this.dataSource.data[itemIndex].name = res.controls.name.value;
      this.dataSource.data[itemIndex].email = res.controls.email.value;
      this.dataSource.data[itemIndex].github = res.controls.github.value;
      this.dataSource._updateChangeSubscription();
    })
  }

  onAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '650px', height: '650px',
      panelClass: "formFieldWidth480"
    })
    dialogRef.afterClosed().subscribe(res => {
      var lastIndex;
      lastIndex = this.dataSource.data.length - 1;
      var lastId = this.dataSource.data[lastIndex].id + 1;
      console.log(lastId);
      var newUser = { 'check-in': null, 'check-out': null, created_at: "2019-09-17 20:00:26", email: res.controls.email.value, github: res.controls.github.value, id: lastId, "in-progress": { actividades: [], bugs: [] }, name: res.controls.name.value, updated_at: "2019-09-17 20:00:26" };

      console.log(res.controls.email.value);
      this.dataSource.data.push(newUser);
      this.dataSource._updateChangeSubscription();
    })
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
