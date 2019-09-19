import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Rol } from '../../models/rol.model';
import { Nivel } from '../../models/nivel.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-ediit-user',
  templateUrl: './ediit-user.component.html',
  styleUrls: ['./ediit-user.component.css']
})
export class EdiitUserComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private formBuilder: FormBuilder, private usuariosService: UsuariosService, private http: HttpClient) { }

  roles: Rol[];
  niveles: Nivel[];
  editUserForm: FormGroup;
  id: number;

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      github: [''],
      role_id: [''],
      developer_level_id: ['']
    });
    console.log(this.data);
    this.editUserForm.controls.github.setValue(this.data['github']);
    this.editUserForm.controls.name.setValue(this.data['name']);
    //this.editUserForm.controls.email.setValue(this.data['email']);
    this.editUserForm.controls.role_id.setValue(this.data['role_id']);
    this.editUserForm.controls.developer_level_id.setValue(this.data['developer_level_id']);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
    });

    this.http.get('https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/roles', { headers: headers })
      .subscribe(res => {
        this.roles = res['data'];
      })

    this.http.get('https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/developer-levels', { headers: headers })
      .subscribe(res => {
        this.niveles = res['data'];
      })
  }

  get f() { return this.editUserForm.controls; }

  editUser() {
    this.usuariosService.editUser({
      id: this.data['id'],
      name: this.f.name.value,
      email: this.f.email.value,
      password: this.f.password.value,
      password_confirmation: this.f.password_confirmation.value,
      github: this.f.github.value,
      role_id: this.f.role_id.value,
      developer_level_id: this.f.developer_level_id.value
    }
    )
    return { id: this.data['id'], name: this.f.name.value, email: this.f.email.value, github: this.f.github.value }
  }
}