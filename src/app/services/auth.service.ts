import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { Tokens } from '../auth/models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN = 'TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }): Observable<boolean> {
    console.log(user);
    return this.http.post<any>('https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/login', user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          return of(false);
        })
      )
  }

  logout() {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('TOKEN'));

    return this.http.post('https://cors-anywhere.herokuapp.com/https://alpha-api.yairmiranda.dev/api/v1/logout', headers, {
      headers: headers
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      }));
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);

  }

  private doLoginUser(username: string, tokens: Tokens) {
    console.log(tokens);
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }
}
