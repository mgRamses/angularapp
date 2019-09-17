import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: any = [];
  public alert;

  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
      .subscribe(success => {
        if (success) {
          console.log(success);
          if (this.f.username.value == 'lyairmg@gmail.com') {
            localStorage.setItem('user', 'admin');
          } else {
            localStorage.setItem('user', 'normal');
          }
          this.router.navigate(['/home']);

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
          });
          this.http.get('https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/users/me', { headers: headers })
            .subscribe(data => {
              localStorage.setItem('usuarioActual', data['name']);
            })
        } else {
          this.alert = true;
          this.f.controls.value('');
        }
      });
  }

  onFocus() {
    this.alert = false;
  }
}
