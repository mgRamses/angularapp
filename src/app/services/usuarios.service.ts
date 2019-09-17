import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) { }

  getAllUsers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
    });

    return this.http.get('https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/users', { headers: headers });
  }

  deleteUser(id: number) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
    });
    this.http.delete(`https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/users/${id}`, { headers: headers })
      .subscribe(res => {
        console.log(res);
      })
  }

  addUser(usuario: { name: string, email: string, password: string, password_confirmation: string, github: string, role_id: number, developer_level_id: number }) {
    console.log('Empezando a guardar');
    //var body = 'name=' + usuario.name + '&email=' + usuario.email + '&password=' + usuario.password + '&password_confirm=' + usuario.password_confirmation + '&github=' + usuario.github + '&developer_level_id=1&role_id=1';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
    });
    this.http.post<any>(`https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/users`, usuario, { headers: headers })
      .subscribe(res => {
        return res;
      })
  }
}