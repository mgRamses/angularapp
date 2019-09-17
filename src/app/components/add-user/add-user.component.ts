import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Rol } from '../../models/rol.model';
import { Nivel } from '../../models/nivel.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private http: HttpClient) { }

  roles: Rol[];
  niveles: Nivel[];
  addUserForm: FormGroup;

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      github: [''],
      developer_level_id: [''],
      role_id: ['']
    })

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

  get f() { return this.addUserForm.controls; }

  addUser() {
    this.usuariosService.addUser({
      name: this.f.name.value,
      email: this.f.email.value,
      password: this.f.password.value,
      password_confirmation: this.f.password_confirmation.value,
      github: this.f.github.value,
      role_id: this.f.role_id.value,
      developer_level_id: this.f.developer_level_id.value
    }
    )
  }

}
